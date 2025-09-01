#!/bin/bash

# 開発フローワークフロー
# 使用方法: ./scripts/dev-workflow.sh [コマンド]

set -e

# 色付きの出力
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ログ関数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# ヘルプ表示
show_help() {
    echo "開発フローワークフロー"
    echo ""
    echo "使用方法: $0 [コマンド]"
    echo ""
    echo "コマンド:"
    echo "  dev          - ローカル開発サーバーを起動"
    echo "  commit       - 変更をコミットしてGitHubにプッシュ"
    echo "  deploy       - Firebaseにデプロイ"
    echo "  full-deploy  - コミットからデプロイまで一括実行"
    echo "  status       - 現在の状況を表示"
    echo "  help         - このヘルプを表示"
    echo ""
}

# ローカル開発サーバー起動
start_dev_server() {
    log_info "ローカル開発サーバーを起動中..."
    
    # Python3が利用可能かチェック
    if command -v python3 &> /dev/null; then
        log_info "Python3を使用してサーバーを起動します"
        python3 -m http.server 8000
    elif command -v python &> /dev/null; then
        log_info "Pythonを使用してサーバーを起動します"
        python -m http.server 8000
    else
        log_error "Pythonがインストールされていません"
        log_info "以下のコマンドでインストールしてください:"
        log_info "  brew install python"
        exit 1
    fi
}

# 変更をコミットしてGitHubにプッシュ
commit_and_push() {
    log_info "変更をコミットしてGitHubにプッシュ中..."
    
    # 変更されたファイルを確認
    if [[ -z $(git status --porcelain) ]]; then
        log_warning "コミットする変更がありません"
        return 0
    fi
    
    # 変更されたファイルを表示
    log_info "変更されたファイル:"
    git status --short
    
    # コミットメッセージを入力
    echo ""
    read -p "コミットメッセージを入力してください: " commit_message
    
    if [[ -z "$commit_message" ]]; then
        log_error "コミットメッセージが入力されていません"
        exit 1
    fi
    
    # コミットとプッシュ
    git add .
    git commit -m "$commit_message"
    git push origin main
    
    log_success "GitHubにプッシュ完了"
}

# Firebaseにデプロイ
deploy_to_firebase() {
    log_info "Firebaseにデプロイ中..."
    
    # Firebase CLIがインストールされているかチェック
    if ! command -v firebase &> /dev/null; then
        log_error "Firebase CLIがインストールされていません"
        log_info "以下のコマンドでインストールしてください:"
        log_info "  npm install -g firebase-tools"
        exit 1
    fi
    
    # Firebaseにログイン
    if ! firebase projects:list &> /dev/null; then
        log_info "Firebaseにログインしてください"
        firebase login
    fi
    
    # デプロイ
    firebase deploy --only hosting
    
    log_success "Firebaseデプロイ完了"
}

# フルデプロイ（コミットからデプロイまで）
full_deploy() {
    log_info "フルデプロイを開始..."
    
    commit_and_push
    deploy_to_firebase
    
    log_success "フルデプロイ完了！"
}

# 現在の状況を表示
show_status() {
    log_info "現在の状況:"
    echo ""
    
    # Gitの状況
    echo "=== Git Status ==="
    git status --short
    echo ""
    
    # リモートブランチの状況
    echo "=== Remote Branches ==="
    git branch -r
    echo ""
    
    # Firebaseの状況
    echo "=== Firebase Status ==="
    if command -v firebase &> /dev/null; then
        firebase projects:list 2>/dev/null || echo "Firebase CLIが利用できません"
    else
        echo "Firebase CLIがインストールされていません"
    fi
}

# メイン処理
case "${1:-help}" in
    "dev")
        start_dev_server
        ;;
    "commit")
        commit_and_push
        ;;
    "deploy")
        deploy_to_firebase
        ;;
    "full-deploy")
        full_deploy
        ;;
    "status")
        show_status
        ;;
    "help"|*)
        show_help
        ;;
esac
