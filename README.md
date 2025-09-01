# マチ★アソビ Vol.29 ティザーサイト

## Firebase認証の設定手順

このプロジェクトは、Netlifyのベーシック認証からFirebase Authenticationに移行しています。

### 1. Firebaseプロジェクトの作成

1. [Firebase Console](https://console.firebase.google.com/) にアクセス
2. 「プロジェクトを追加」をクリック
3. プロジェクト名を入力（例：`machiasobi-vol29`）
4. Google Analyticsの有効化は任意
5. 「プロジェクトを作成」をクリック

### 2. Webアプリの追加

1. プロジェクトのダッシュボードで「Web」アイコンをクリック
2. アプリのニックネームを入力（例：`machiasobi-web`）
3. 「Firebase Hosting も設定する」のチェックは外す
4. 「アプリを登録」をクリック

### 3. 設定情報の取得

1. 登録されたアプリの設定情報をコピー
2. `firebase-config.js` ファイルの `firebaseConfig` オブジェクトを更新：

```javascript
const firebaseConfig = {
  apiKey: "実際のAPIキー",
  authDomain: "実際のプロジェクトID.firebaseapp.com",
  projectId: "実際のプロジェクトID",
  storageBucket: "実際のプロジェクトID.appspot.com",
  messagingSenderId: "実際のメッセージング送信者ID",
  appId: "実際のアプリID"
};
```

### 4. 認証の有効化

1. Firebase Consoleの左メニューから「Authentication」を選択
2. 「始める」をクリック
3. 「サインイン方法」タブで「メール/パスワード」を有効化
4. 「有効にする」をクリック

### 5. ユーザーの作成

1. 「Authentication」→「ユーザー」タブ
2. 「ユーザーを追加」をクリック
3. メールアドレスとパスワードを入力
4. 「ユーザーを追加」をクリック

### 6. セキュリティルールの設定

Firebase Hostingを使用する場合は、`firebase.json` ファイルを作成：

```json
{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### 7. デプロイ

#### Firebase Hostingを使用する場合：

```bash
# Firebase CLIのインストール
npm install -g firebase-tools

# ログイン
firebase login

# プロジェクトの初期化
firebase init hosting

# デプロイ
firebase deploy
```

#### その他のホスティングサービスを使用する場合：

- `firebase-config.js` の設定を正しく更新
- すべてのファイルをアップロード
- HTTPSが有効になっていることを確認

### 8. 動作確認

1. サイトにアクセス
2. ログインページにリダイレクトされることを確認
3. 作成したユーザーでログイン
4. メインページが表示されることを確認
5. ログアウトボタンでログアウトできることを確認

### セキュリティ機能

- **ブルートフォース攻撃対策**: 5回のログイン失敗で15分間アカウントロック
- **パスワード強度チェック**: 最低8文字、大文字・小文字・数字を含む
- **セッション管理**: 1時間で自動ログアウト
- **セキュリティヘッダー**: XSS、クリックジャッキング、MIME型スニッフィング対策
- **Content Security Policy**: リソースの読み込み制限

### 注意事項

- Firebaseの無料プランでも認証機能は利用可能
- メール/パスワード認証は基本的なセキュリティ機能
- 本格的な運用では、より高度なセキュリティ設定を検討
- APIキーは公開されますが、適切なセキュリティルールで保護される
- セキュリティヘッダーにより、ブラウザのセキュリティ機能が強化される

### トラブルシューティング

- ログインできない場合：Firebase Consoleでユーザーが正しく作成されているか確認
- 認証エラーが発生する場合：ブラウザのコンソールでエラーメッセージを確認
- リダイレクトが動作しない場合：Firebase SDKが正しく読み込まれているか確認
