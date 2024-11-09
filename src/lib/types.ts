import { WebhookEvent } from '@octokit/webhooks-types';

/**
 * Type definition for GitHub webhook event names
 * @see https://docs.github.com/en/webhooks/webhook-events-and-payloads
 */
export type WebhookEventName =
  | 'check_run'
  | 'check_suite'
  | 'commit_comment'
  | 'create'
  | 'delete'
  | 'deploy_key'
  | 'deployment'
  | 'deployment_status'
  | 'fork'
  | 'gollum'
  | 'installation'
  | 'issue_comment'
  | 'issues'
  | 'label'
  | 'milestone'
  | 'member'
  | 'membership'
  | 'org_block'
  | 'organization'
  | 'page_build'
  | 'project'
  | 'project_card'
  | 'project_column'
  | 'public'
  | 'pull_request'
  | 'pull_request_review'
  | 'pull_request_review_comment'
  | 'push'
  | 'release'
  | 'repository'
  | 'repository_import'
  | 'repository_vulnerability_alert'
  | 'security_advisory'
  | 'star'
  | 'status'
  | 'team'
  | 'team_add'
  | 'watch'
  | 'workflow_dispatch'
  | 'workflow_run';

/**
 * Configuration options for the webhook server
 */
export interface WebhookConfig {
  /** Server port number (default: 42022) */
  port?: number;
  /** Webhook endpoint path (default: '/webhook') */
  path?: string;
}

/**
 * Type for webhook event listeners
 */
export type WebhookListener<T extends WebhookEvent> = (payload: T) => Promise<void>; 