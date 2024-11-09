import { WebhookEvent, PullRequestEvent, PushEvent, IssuesEvent, IssueCommentEvent, ReleaseEvent, PullRequestReviewEvent, PullRequestReviewCommentEvent, ForkEvent, StarEvent, StatusEvent } from '@octokit/webhooks-types';

/**
 * Type for commit author and committer
 */
interface GitUser {
  /** The git author's name */
  name: string;
  /** The git author's email */
  email: string;
  /** The git author's username */
  username?: string;
}

/**
 * Type for commit information
 */
interface Commit {
  /** The SHA of the commit */
  id: string;
  /** The commit message */
  message: string;
  /** The ISO 8601 timestamp of the commit */
  timestamp: string;
  /** The git tree ID */
  tree_id: string;
  /** Whether this commit is distinct from any that have been pushed before */
  distinct: boolean;
  /** URLs associated with the commit */
  url: string;
  /** Author information */
  author: GitUser;
  /** Committer information */
  committer: GitUser;
  /** Array of added file paths */
  added: string[];
  /** Array of removed file paths */
  removed: string[];
  /** Array of modified file paths */
  modified: string[];
}

/**
 * Payload for push events
 * @see https://docs.github.com/en/webhooks/webhook-events-and-payloads#push
 */
export type PushEventPayload = PushEvent;

/**
 * Payload for pull request events
 * @see https://docs.github.com/en/webhooks/webhook-events-and-payloads#pull_request
 */
export type PullRequestPayload = PullRequestEvent;

/**
 * Payload for issues events
 * @see https://docs.github.com/en/webhooks/webhook-events-and-payloads#issues
 */
export type IssuesEventPayload = IssuesEvent;

/**
 * Payload for issue comment events
 * @see https://docs.github.com/en/webhooks/webhook-events-and-payloads#issue_comment
 */
export type IssueCommentPayload = IssueCommentEvent;

/**
 * Payload for release events
 * @see https://docs.github.com/en/webhooks/webhook-events-and-payloads#release
 */
export type ReleaseEventPayload = ReleaseEvent;

/**
 * Payload for pull request review events
 * @see https://docs.github.com/en/webhooks/webhook-events-and-payloads#pull_request_review
 */
export type PullRequestReviewPayload = PullRequestReviewEvent;

/**
 * Payload for pull request review comment events
 * @see https://docs.github.com/en/webhooks/webhook-events-and-payloads#pull_request_review_comment
 */
export type PullRequestReviewCommentPayload = PullRequestReviewCommentEvent;

/**
 * Payload for fork events
 * @see https://docs.github.com/en/webhooks/webhook-events-and-payloads#fork
 */
export type ForkEventPayload = ForkEvent;

/**
 * Payload for star events
 * @see https://docs.github.com/en/webhooks/webhook-events-and-payloads#star
 */
export type StarEventPayload = StarEvent;

/**
 * Payload for status events
 * @see https://docs.github.com/en/webhooks/webhook-events-and-payloads#status
 */
export type StatusEventPayload = StatusEvent;
