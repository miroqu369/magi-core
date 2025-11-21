# DOGMA System v2.0

合議制AIシステム - 3つのAIユニットによる協調分析

## 概要

DOGMA Systemは3つの独立したAIユニットが協調して分析を行う合議制システムです。

## 📚 ドキュメント

**👉 [ドキュメント索引はこちら](docs/INDEX.md)** - 学習パスとトピック別索引

- **[システム説明書](SYSTEM_EXPLANATION.md)** - システム全体の詳細な説明（日英併記）
- **[アーキテクチャ図](ARCHITECTURE.md)** - システム構成とデータフローの詳細
- **[API リファレンス](API_REFERENCE.md)** - REST API の完全なドキュメント
- **[クイックスタートガイド](QUICKSTART.md)** - 5分で始める使い方ガイド
- **[ライセンス](LICENSE)** - MIT License

### システムユニット
- **Unit-B2**: 創造的分析
- **Unit-M1**: 論理的分析
- **Unit-C3**: 人間的分析

## 動作モード
- **CONSENSUS**: 合議制による多数決
- **INTEGRATION**: 統合的分析
- **SYNTHESIS**: 創発的洞察

## クイックスタート
git clone https://github.com/miroqu369/dogma-sys.git
cd dogma-sys
npm install
node bootstrap.js

## ライセンス
MIT License - 詳細は [LICENSE](LICENSE) ファイルを参照

---
DOGMA PROJECT 2024

## 🎨 UI Interfaces

- **Main UI**: `/index.html` - シンプルな入力インターフェース
- **Dashboard**: `/magi-dash.html` - ダッシュボード表示
- **Debate Mode**: `/magi-debate.html` - AI議論モード
- **EVA Interface**: `/eva.html` - EVAスタイルUI
- **Full Response** ⭐: `/dogma-full.html` - 各AI個別回答表示（新機能）

### Full Response UIの特徴
- 3つのAIユニットの回答を個別表示
- 色分けされた見やすいレイアウト
- 最終統合結果とメトリクス表示
- レスポンシブデザイン対応
