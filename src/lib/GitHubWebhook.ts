import express from 'express';
import { WebhookEvent } from '@octokit/webhooks-types';
import { WebhookEventName, WebhookConfig, WebhookListener, WebhookEventPayloadMap } from '../types';
import {
  PushEventPayload,
  PullRequestPayload,
  IssuesEventPayload,
  IssueCommentPayload,
  ReleaseEventPayload,
  PullRequestReviewPayload,
  PullRequestReviewCommentPayload,
  ForkEventPayload,
  StarEventPayload,
  StatusEventPayload
} from './eventTypes';

/**
 * Class for handling GitHub webhook events
 */
export class GitHubWebhook {
  private app = express();
  private port: number;
  private path: string;
  private listeners: Map<WebhookEventName, Array<WebhookListener<WebhookEvent>>> = new Map();

  /**
   * Initialize the GitHub webhook handler
   * @param config - Webhook configuration options
   */
  constructor(config?: WebhookConfig) {
    this.port = config?.port ?? 42022;
    this.path = config?.path ?? '/webhook';
    this.app.use(express.json());
    this.setupWebhookEndpoint();
  }

  /**
   * Register a listener for events
   * @param event - The event name
   * @param listener - Event handler function
   */
  public trigger<T extends WebhookEventName>(
    event: T,
    listener: WebhookListener<T extends keyof WebhookEventPayloadMap ? WebhookEventPayloadMap[T] : never>
  ): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.push(listener as WebhookListener<WebhookEvent>);
    }
  }

  /**
   * Start the webhook server
   */
  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`GitHub webhook server started on port: ${this.port}`);
    });
  }

  /**
   * Setup the webhook endpoint
   */
  private setupWebhookEndpoint(): void {
    this.app.post(this.path, async (req, res) => {
      const event = req.headers['x-github-event'] as WebhookEventName;
      const payload = req.body as WebhookEvent;

      try {
        await this.executeListeners(event, payload);
        res.status(200).send('OK');
      } catch (error) {
        console.error('Webhook processing error:', error);
        res.status(500).send('Internal Server Error');
      }
    });
  }

  /**
   * Execute all registered listeners for an event
   */
  private async executeListeners<T extends WebhookEventName>(
    event: T,
    payload: T extends keyof WebhookEventPayloadMap ? WebhookEventPayloadMap[T] : WebhookEvent
  ): Promise<void> {
    const eventListeners = this.listeners.get(event) || [];
    await Promise.all(
      eventListeners.map(listener => 
        (listener as WebhookListener<typeof payload>)(payload)
      )
    );
  }
} 