[日本語の説明はこちら](#日本語-japanese)
# GitHub Trigger
You can create a webhook for your GitHub repository.

# Usage
## Code Example
```typescript
import { GitHubWebhook } from './lib/GitHubWebhook';

// These are the default values, and you can omit the config as well.
const github = new GitHubWebhook({
  port: 42022,
  path: "/webhook"
});

github.trigger('push', async (payload) => {
  console.log(`Push to ${payload.ref}`);
});

// Start session
github.start();
```

## Public Example
It is recommended to use a reverse proxy like Apache for public access.
You can also use [ngrok](https://ngrok.com/) for public access.

### Apache
1. Install the required modules
```bash
sudo a2enmod proxy
sudo a2enmod proxy_http
```

2. Create the config
```apache
<VirtualHost *:80> # Change the port as needed
  ServerName yourdomain.com  # Change this to the appropriate domain name

  ProxyRequests Off
  ProxyPreserveHost On

  # Reverse proxy settings
  ProxyPass / http://localhost:42022/
  ProxyPassReverse / http://localhost:42022/

  # Error log and access log settings
  ErrorLog ${APACHE_LOG_DIR}/myapp_error.log
  CustomLog ${APACHE_LOG_DIR}/myapp_access.log combined
</VirtualHost>
```

3. Enable the configuration
```bash
sudo a2ensite mywebhook.conf

sudo systemctl restart apache2
```

### Nginx
1. Create the config
```nginx
server {
  listen 80;  # Change the port as needed
  server_name yourdomain.com;  # Change this to the appropriate domain name

  location / {
    proxy_pass http://localhost:42022;  # Reverse proxy settings
    proxy_set_header Host $host;  # Set the host header
    proxy_set_header X-Real-IP $remote_addr;  # Set the client's IP address
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  # Set the X-Forwarded-For header
    proxy_set_header X-Forwarded-Proto $scheme;  # Set the protocol
    }

    # Error log and access log settings
    error_log /var/log/nginx/myapp_error.log;
    access_log /var/log/nginx/myapp_access.log;
}
```
2. Enable the configuration
```bash
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/

sudo systemctl restart nginx
```

# 日本語 (Japanese)

# GitHub Trigger
GitHubのリポジトリのWebhookを作成することができます。

# 使い方
## コード例
```typescript
import { GitHubWebhook } from './lib/GitHubWebhook';

// These are the default values, and you can omit the config as well.
const github = new GitHubWebhook({
  port: 42022,
  path: "/webhook"
});

github.trigger('push', async (payload) => {
  console.log(`Push to ${payload.ref}`);
});

// Start session
github.start();
```

## 公開例
Apache等のリバースプロキシを使用して公開することを推奨します。
[ngrok](https://ngrok.com/)を使用して公開することもできます。

### Apache
1. 必要なモジュールをインストール
```bash
sudo a2enmod proxy
sudo a2enmod proxy_http
```

2. configの作成
```apache
<VirtualHost *:80> # 必要に応じてポートを変更
  ServerName yourdomain.com  # ここを適切なドメイン名に変更

  ProxyRequests Off
  ProxyPreserveHost On

  # リバースプロキシの設定
  ProxyPass / http://localhost:42022/
  ProxyPassReverse / http://localhost:42022/

  # エラーログとアクセスログの設定
  ErrorLog ${APACHE_LOG_DIR}/myapp_error.log
  CustomLog ${APACHE_LOG_DIR}/myapp_access.log combined
</VirtualHost>
```

3. 設定を有効化
```bash
sudo a2ensite mywebhook.conf

sudo systemctl restart apache2
```

### Nginx
1. configを作成
```nginx
server {
  listen 80;  # 必要に応じてポートを変更
  server_name yourdomain.com;  # ここを適切なドメイン名に変更

  location / {
    proxy_pass http://localhost:42022;  # リバースプロキシの設定
    proxy_set_header Host $host;  # ホストヘッダーを設定
    proxy_set_header X-Real-IP $remote_addr;  # クライアントのIPアドレスを設定
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  # X-Forwarded-Forヘッダーを設定
    proxy_set_header X-Forwarded-Proto $scheme;  # プロトコルを設定
    }

    # エラーログとアクセスログの設定
    error_log /var/log/nginx/myapp_error.log;
    access_log /var/log/nginx/myapp_access.log;
}
```
2. 設定を有効化
```bash
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/

sudo systemctl restart nginx
```
