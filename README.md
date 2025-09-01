# マチ★アソビ Vol.29 ティザーサイト

徳島をアソビ尽くすイベント「マチ★アソビ Vol.29」のティザーサイトです。

## 🚀 開発フロー

このプロジェクトでは、以下の開発フローを採用しています：

### 1. ローカル開発
```bash
# ローカル開発サーバーを起動
./scripts/dev-workflow.sh dev
```
- ブラウザで `http://localhost:8000` にアクセス
- ファイルの変更は自動的に反映されます

### 2. GitHubにプッシュ
```bash
# 変更をコミットしてGitHubにプッシュ
./scripts/dev-workflow.sh commit
```
- 変更されたファイルを確認
- コミットメッセージを入力
- 自動的にGitHubにプッシュ

### 3. Firebaseにデプロイ
```bash
# Firebaseにデプロイ
./scripts/dev-workflow.sh deploy
```
- 本番環境に反映

### 4. 一括実行
```bash
# コミットからデプロイまで一括実行
./scripts/dev-workflow.sh full-deploy
```

## 🛠️ 開発環境のセットアップ

### 必要なツール
- Git
- Python 3.x（ローカルサーバー用）
- Firebase CLI（デプロイ用）

### Firebase CLIのインストール
```bash
npm install -g firebase-tools
firebase login
```

### プロジェクトのクローン
```bash
git clone https://github.com/ps-imura/test.git
cd test
```

## 📁 プロジェクト構造

```
action0830_4/
├── index.html          # メインページ
├── news.html          # ニュースページ
├── login.html         # ログインページ
├── style.css          # スタイルシート
├── gate.js            # アクセス制御
├── firebase-config.js # Firebase設定
├── firebase.json      # Firebase設定ファイル
├── scripts/           # 開発用スクリプト
│   └── dev-workflow.sh
└── public/            # 静的ファイル
```

## 🎨 主な機能

- **アナウンスメントバッジ**: 開催情報の表示
- **ニュースセクション**: 最新情報の一覧
- **アクセス制御**: `gate.js`による制御
- **レスポンシブデザイン**: モバイル・PC対応

## 🔧 開発用コマンド

```bash
# 現在の状況を確認
./scripts/dev-workflow.sh status

# ヘルプを表示
./scripts/dev-workflow.sh help
```

## 📝 開発時の注意点

1. **ローカル開発**: 必ずローカルで動作確認してからコミット
2. **コミットメッセージ**: 変更内容が分かりやすいメッセージを記述
3. **デプロイ前確認**: GitHubにプッシュ後、問題なければFirebaseにデプロイ

## 🌐 本番環境

- **URL**: https://imuradev-5fc55.web.app/
- **プロジェクト**: imuradev-5fc55

## 📞 サポート

開発に関する質問や問題がございましたら、お気軽にお声かけください。
