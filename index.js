const { GitHubWebhook } = require('./dist/index')

const webhook = new GitHubWebhook();

// プッシュイベントの監視
webhook.trigger('push', async (payload) => {
  const { commits, ref } = payload;
  console.log(`${commits.length}件のコミットが${ref}にプッシュされました`);
});w

webhook.trigger('')

// プルリクエストの監視
webhook.trigger('pull_request', async (payload) => {
  const { action, pull_request } = payload;
  console.log(`PR #${pull_request.number}が${action}されました`);
});

webhook.start();