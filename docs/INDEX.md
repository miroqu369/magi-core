# DOGMA System ドキュメント索引 / Documentation Index

## はじめに / Getting Started

DOGMA Systemへようこそ！このシステムは、エヴァンゲリオンのMAGIシステムにインスパイアされた合議制AIシステムです。

Welcome to DOGMA System! This is a consensus AI system inspired by the MAGI system from Evangelion.

---

## 📖 ドキュメント一覧 / Documentation List

### 1. 🚀 [クイックスタートガイド](../QUICKSTART.md)
**対象**: 初めてのユーザー  
**内容**: 5分でDOGMA Systemを始める方法
- インストール手順
- 基本的な使い方
- 最初の質問の送信
- トラブルシューティング

**読了時間**: 5-10分

---

### 2. 📘 [システム説明書](../SYSTEM_EXPLANATION.md)
**対象**: システムを理解したいすべてのユーザー  
**内容**: DOGMA Systemの完全な説明（日英併記）
- システム概要とアーキテクチャ
- 3つのAIユニットの詳細
- 動作モード（CONSENSUS/INTEGRATION/SYNTHESIS）
- デプロイメント方法
- 設計思想

**読了時間**: 15-20分

---

### 3. 🏗️ [アーキテクチャ](../ARCHITECTURE.md)
**対象**: 開発者・技術者  
**内容**: システムの技術的詳細
- システム構成図（ASCII art）
- データフロー図
- コンポーネント詳細
- エラーハンドリング
- スケーラビリティ
- パフォーマンス特性

**読了時間**: 20-30分

---

### 4. 🔌 [API リファレンス](../API_REFERENCE.md)
**対象**: API統合を行う開発者  
**内容**: REST APIの完全なドキュメント
- エンドポイント一覧
- リクエスト/レスポンス仕様
- サンプルコード（curl, JavaScript, Python, Node.js）
- エラーコード
- ベストプラクティス
- クライアントライブラリ例

**読了時間**: 15-25分

---

### 5. 📄 [README](../README.md)
**対象**: すべてのユーザー  
**内容**: プロジェクトの概要
- システムの概要
- UIインターフェース一覧
- ドキュメントへのリンク

**読了時間**: 3-5分

---

## 📚 学習パス / Learning Paths

### 初心者向け / For Beginners

```
1. README.md (3分)
   ↓
2. QUICKSTART.md (10分)
   ↓
3. システムを起動して試す (15分)
   ↓
4. SYSTEM_EXPLANATION.md (20分)
```

**合計時間**: 約50分

### 開発者向け / For Developers

```
1. README.md (3分)
   ↓
2. SYSTEM_EXPLANATION.md (20分)
   ↓
3. ARCHITECTURE.md (30分)
   ↓
4. API_REFERENCE.md (25分)
   ↓
5. 実装とテスト (60分+)
```

**合計時間**: 約2時間20分

### システム管理者向け / For System Administrators

```
1. README.md (3分)
   ↓
2. QUICKSTART.md - デプロイセクション (15分)
   ↓
3. SYSTEM_EXPLANATION.md - セキュリティ・デプロイ (15分)
   ↓
4. ARCHITECTURE.md - スケーラビリティ (20分)
```

**合計時間**: 約55分

---

## 🔍 トピック別索引 / Topic Index

### インストール・セットアップ
- [クイックスタート - インストール](../QUICKSTART.md#1-リポジトリのクローン)
- [クイックスタート - 環境変数](../QUICKSTART.md#3-環境変数の設定)
- [システム説明書 - デプロイ](../SYSTEM_EXPLANATION.md#デプロイ--deployment)

### API使用方法
- [API リファレンス - consensus エンドポイント](../API_REFERENCE.md#1-post-apiconsensus)
- [API リファレンス - サンプルコード](../API_REFERENCE.md#サンプルリクエスト--sample-requests)
- [クイックスタート - はじめての質問](../QUICKSTART.md#はじめての質問)

### システムアーキテクチャ
- [システム説明書 - アーキテクチャ](../SYSTEM_EXPLANATION.md#システムアーキテクチャ--system-architecture)
- [アーキテクチャ - システム構成図](../ARCHITECTURE.md#システム構成図--system-architecture-diagram)
- [アーキテクチャ - データフロー](../ARCHITECTURE.md#データフロー--data-flow)

### AIユニット
- [システム説明書 - 3つのAIユニット](../SYSTEM_EXPLANATION.md#3つのaiユニット--three-ai-units)
- [システム説明書 - 動作モード](../SYSTEM_EXPLANATION.md#動作モード--operation-modes)
- [アーキテクチャ - Provider Layer](../ARCHITECTURE.md#provider-layer)

### デプロイメント
- [システム説明書 - デプロイ](../SYSTEM_EXPLANATION.md#デプロイ--deployment)
- [クイックスタート - Docker](../QUICKSTART.md#トラブルシューティング)
- [アーキテクチャ - Deployment](../ARCHITECTURE.md#デプロイメント--deployment)

### トラブルシューティング
- [クイックスタート - トラブルシューティング](../QUICKSTART.md#トラブルシューティング)
- [システム説明書 - トラブルシューティング](../SYSTEM_EXPLANATION.md#トラブルシューティング--troubleshooting)
- [API リファレンス - エラーコード](../API_REFERENCE.md#エラーコード--error-codes)

### セキュリティ
- [システム説明書 - セキュリティ](../SYSTEM_EXPLANATION.md#セキュリティ--security)
- [アーキテクチャ - セキュリティアーキテクチャ](../ARCHITECTURE.md#セキュリティアーキテクチャ--security-architecture)

---

## 💡 よくある質問へのリンク / FAQ Links

### Q: どのモードを使えばいいですか？
→ [システム説明書 - 動作モード](../SYSTEM_EXPLANATION.md#動作モード--operation-modes)  
→ [クイックスタート - 各モードの使い分け](../QUICKSTART.md#各モードの使い分け)

### Q: APIキーはどこで取得できますか？
→ [クイックスタート - APIキーの取得方法](../QUICKSTART.md#3-環境変数の設定)

### Q: エラーが出ます
→ [クイックスタート - トラブルシューティング](../QUICKSTART.md#トラブルシューティング)  
→ [API リファレンス - エラーコード](../API_REFERENCE.md#エラーコード--error-codes)

### Q: 本番環境にデプロイしたい
→ [システム説明書 - デプロイ](../SYSTEM_EXPLANATION.md#デプロイ--deployment)  
→ [アーキテクチャ - Deployment](../ARCHITECTURE.md#デプロイメント--deployment)

### Q: APIの使い方を知りたい
→ [API リファレンス](../API_REFERENCE.md)  
→ [クイックスタート - はじめての質問](../QUICKSTART.md#はじめての質問)

### Q: システムの設計思想を知りたい
→ [システム説明書 - 設計思想](../SYSTEM_EXPLANATION.md#設計思想--design-philosophy)

---

## 🔗 外部リソース / External Resources

### AIプロバイダー公式ドキュメント
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Google Gemini API](https://ai.google.dev/)
- [Anthropic Claude API](https://docs.anthropic.com/)
- [xAI Grok API](https://docs.x.ai/)

### 関連技術
- [Express.js Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Docker Documentation](https://docs.docker.com/)

### 参考情報
- [新世紀エヴァンゲリオン - MAGIシステム](https://evangelion.fandom.com/wiki/Magi)

---

## 📝 ドキュメント貢献 / Contributing to Documentation

ドキュメントの改善提案は [GitHub Issues](https://github.com/miroqu369/magi-sys/issues) へ

Documentation improvement suggestions are welcome at [GitHub Issues](https://github.com/miroqu369/magi-sys/issues)

---

## 📊 ドキュメント統計 / Documentation Statistics

- **総ドキュメント数**: 5ファイル
- **総ワード数**: 約15,000語
- **対応言語**: 日本語・英語（併記）
- **最終更新**: 2024年10月

---

## 🎯 次に読むべきドキュメント / What to Read Next

**初めての方**: [クイックスタートガイド](../QUICKSTART.md)を読んでシステムを起動してみましょう！

**開発者の方**: [API リファレンス](../API_REFERENCE.md)でAPIの詳細を確認してください。

**システム管理者の方**: [アーキテクチャ](../ARCHITECTURE.md)で技術的な詳細を理解してください。

---

**DOGMA PROJECT 2024**
