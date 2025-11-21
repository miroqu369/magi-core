# DOGMA System - システム説明書 / System Explanation

## 概要 / Overview

**DOGMA System v2.0**は、エヴァンゲリオンのMAGIシステムにインスパイアされた、3つの独立したAIユニットが協調して分析を行う**合議制AIシステム**です。

The **DOGMA System v2.0** is a **consensus AI system** inspired by the MAGI system from Evangelion, where three independent AI units collaborate to perform analysis.

---

## システムアーキテクチャ / System Architecture

### 3つのAIユニット / Three AI Units

本システムは3つの異なる特性を持つAIユニットで構成されています：

The system consists of three AI units with different characteristics:

#### 1. BALTHASAR-2 (Unit-B2) - 創造的・革新的分析
- **プロバイダー**: Grok (xAI)
- **役割**: 創造的で革新的な視点からの分析
- **特徴**: 新しいアイデアや独創的な解決策を提案

**Provider**: Grok (xAI)  
**Role**: Creative and innovative analysis  
**Characteristics**: Proposes new ideas and original solutions

#### 2. MELCHIOR-1 (Unit-M1) - 論理的・科学的分析
- **プロバイダー**: Gemini (Google)
- **役割**: 論理的で科学的な視点からの分析
- **特徴**: データに基づいた客観的な評価

**Provider**: Gemini (Google)  
**Role**: Logical and scientific analysis  
**Characteristics**: Data-driven objective evaluation

#### 3. CASPER-3 (Unit-C3) - 人間的・感情的分析
- **プロバイダー**: Claude (Anthropic)
- **役割**: 人間的で感情的な視点からの分析
- **特徴**: 倫理や感情を考慮した判断

**Provider**: Claude (Anthropic)  
**Role**: Human and emotional analysis  
**Characteristics**: Judgment considering ethics and emotions

### 統合判断システム / Integration System

**Isabelle (GPT-4o-mini)** が3つのユニットの回答を統合・判断します。

**Isabelle (GPT-4o-mini)** integrates and judges the responses from the three units.

---

## 動作モード / Operation Modes

### 1. CONSENSUS（合議）モード
3つのAIユニットの回答から最適なものを選択する多数決方式。

**Consensus mode**: Majority voting system that selects the optimal response from the three AI units.

- 最もシンプルな動作モード
- 各ユニットが独立して回答
- 最初の有効な回答を採用（簡易実装）

### 2. INTEGRATION（統合）モード
3つのAIユニットの回答をIsabelleが統合して最適な回答を生成。

**Integration mode**: Isabelle integrates responses from all three AI units to generate an optimal answer.

- 最も推奨される動作モード
- 各視点の強みを組み合わせる
- GPT-4o-miniによる統合処理（temperature: 0.3）

### 3. SYNTHESIS（創発）モード
3つのAIユニットの回答から創造的に新しい洞察を生成。

**Synthesis mode**: Creatively generates new insights from the three AI units' responses.

- 最も創造的な動作モード
- 新しい視点や洞察を生み出す
- GPT-4o-miniによる創造的統合（temperature: 0.7）

---

## システムコンポーネント / System Components

### バックエンド / Backend

#### 1. bootstrap.js
- エントリーポイント
- Express サーバーの初期化
- ポート設定とヘルスチェック

**Entry point**: Initializes Express server, port configuration, and health checks

#### 2. server.js
- メインAPIロジック
- プロバイダーの初期化
- `/api/consensus` エンドポイントの実装

**Main API logic**: Provider initialization and `/api/consensus` endpoint implementation

#### 3. Providers（プロバイダー）
各AIサービスとの通信を担当：

Handles communication with each AI service:

- **grok.js**: xAI Grok API
- **gemini.js**: Google Gemini API
- **anthropic.js**: Anthropic Claude API
- **openai.js**: OpenAI GPT API

### フロントエンド / Frontend

#### UIインターフェース / UI Interfaces

1. **index.html** - メインUI
   - シンプルな入力インターフェース
   - モード選択機能
   - NERVスタイルのデザイン

2. **dogma-full.html** - フルレスポンスUI ⭐
   - 3つのAIユニットの個別回答表示
   - 色分けされたレイアウト
   - 最終統合結果とメトリクス表示

3. **magi-dash.html** - ダッシュボード
   - システム状態の可視化
   - リアルタイムモニタリング

4. **magi-debate.html** - ディベートモード
   - AI間の議論を可視化

5. **compare.html** - 比較UI
6. **history.html** - 履歴表示
7. **admin.html** - 管理画面
8. **debug.html** - デバッグツール

---

## API仕様 / API Specification

### POST /api/consensus

メインの合議制API。プロンプトを受け取り、3つのAIユニットから回答を取得して統合します。

Main consensus API that receives a prompt and integrates responses from three AI units.

#### リクエスト / Request

```json
{
  "prompt": "質問や分析したい内容",
  "meta": {
    "mode": "integration",
    "temperature": 0.3
  }
}
```

#### パラメータ / Parameters

- **prompt** (required): 質問や分析内容
- **meta.mode** (optional): 動作モード
  - `"consensus"`: 合議モード
  - `"integration"`: 統合モード（デフォルト）
  - `"synthesis"`: 創発モード
- **meta.temperature** (optional): 温度パラメータ（0.0-1.0）

#### レスポンス / Response

```json
{
  "version": "2.0.0",
  "final": "統合された最終回答",
  "mode": "integration",
  "judge": {
    "model": "gpt-4o-mini",
    "method": "integration",
    "name": "Isabelle",
    "reason": "統合理由"
  },
  "candidates": [
    {
      "provider": "grok",
      "magi_unit": "BALTHASAR-2",
      "role": "創造的・革新的分析",
      "ok": true,
      "text": "Grokの回答"
    },
    {
      "provider": "gemini",
      "magi_unit": "MELCHIOR-1",
      "role": "論理的・科学的分析",
      "ok": true,
      "text": "Geminiの回答"
    },
    {
      "provider": "claude",
      "magi_unit": "CASPER-3",
      "role": "人間的・感情的分析",
      "ok": true,
      "text": "Claudeの回答"
    }
  ],
  "metrics": {
    "response_time_ms": 1234,
    "valid_responses": 3,
    "agreement_ratio": 1.0,
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

### その他のエンドポイント / Other Endpoints

- **GET /health** - ヘルスチェック
- **GET /status** - システム状態とシークレット確認
- **POST /api/grok/ping** - Grok接続テスト

---

## デプロイ / Deployment

### 必要な環境変数 / Required Environment Variables

```bash
# OpenAI (Isabelle統合用)
OPENAI_API_KEY=sk-...

# Google Gemini (MELCHIOR-1)
GEMINI_API_KEY=...

# Anthropic Claude (CASPER-3)
ANTHROPIC_API_KEY=sk-ant-...

# xAI Grok (BALTHASAR-2)
XAI_API_KEY=xai-...

# ポート設定
PORT=8080
```

### Dockerでの起動 / Docker Deployment

```bash
# イメージのビルド
docker build -t dogma-system .

# コンテナの起動
docker run -p 8080:8080 \
  -e OPENAI_API_KEY=sk-... \
  -e GEMINI_API_KEY=... \
  -e ANTHROPIC_API_KEY=sk-ant-... \
  -e XAI_API_KEY=xai-... \
  dogma-system
```

### ローカル開発 / Local Development

```bash
# 依存関係のインストール
npm install

# サーバーの起動
npm start
# または
node bootstrap.js

# ブラウザでアクセス
# http://localhost:8080
```

---

## 技術スタック / Technology Stack

### バックエンド
- **Node.js** (>=18.0.0)
- **Express.js** - Webフレームワーク
- **Fetch API** - HTTP クライアント

### フロントエンド
- **Pure HTML/CSS/JavaScript** - フレームワークレス
- **Fetch API** - API通信

### AIプロバイダー
- **OpenAI GPT-4o-mini** - 統合判断
- **xAI Grok-2** - 創造的分析
- **Google Gemini 2.0 Flash** - 論理的分析
- **Anthropic Claude Sonnet 4** - 人間的分析

---

## セキュリティ / Security

### APIキーの管理
- すべてのAPIキーは環境変数で管理
- Google Cloud Secret Managerとの統合サポート
- ソースコードには含めない

### 推奨事項
- 本番環境では適切なレート制限を設定
- HTTPS通信の使用
- CORS設定の適切な構成

---

## メトリクス / Metrics

システムは各リクエストで以下のメトリクスを記録：

The system records the following metrics for each request:

- **response_time_ms**: 応答時間（ミリ秒）
- **valid_responses**: 有効な応答数（0-3）
- **agreement_ratio**: 合意率（0.0-1.0）
- **timestamp**: タイムスタンプ

---

## 設計思想 / Design Philosophy

### エヴァンゲリオンMAGIシステムからの着想

オリジナルのMAGIシステムは、赤木ナオコ博士の人格の3つの側面（科学者、母親、女性）をコンピューターに移植したものでした。

The original MAGI system transplanted three aspects of Dr. Naoko Akagi's personality (scientist, mother, woman) into computers.

本システムはこのコンセプトを現代のAI技術で実現：
- **科学者** → MELCHIOR-1（論理的分析）
- **母親** → CASPER-3（人間的分析）
- **女性** → BALTHASAR-2（創造的分析）

This system realizes this concept with modern AI technology:
- **Scientist** → MELCHIOR-1 (Logical analysis)
- **Mother** → CASPER-3 (Human analysis)
- **Woman** → BALTHASAR-2 (Creative analysis)

### 多様性による知能の向上

異なる特性を持つAIモデルを組み合わせることで：
- 単一のAIでは得られない多角的な視点
- バイアスの軽減
- より堅牢な意思決定

By combining AI models with different characteristics:
- Multi-faceted perspectives not available from a single AI
- Bias reduction
- More robust decision-making

---

## トラブルシューティング / Troubleshooting

### APIキーエラー
```
Error: OPENAI_API_KEY not configured
```
→ 環境変数が正しく設定されているか確認

### ポート競合
```
Error: listen EADDRINUSE: address already in use :::8080
```
→ `PORT` 環境変数を変更するか、既存のプロセスを停止

### プロバイダー接続エラー
→ `/status` エンドポイントで各APIキーの状態を確認

---

## ライセンス / License

MIT License - 詳細は [LICENSE](LICENSE) ファイルを参照

---

## 開発者 / Developer

**miroqu369**  
GitHub: https://github.com/miroqu369/magi-sys

---

## 参考資料 / References

- [新世紀エヴァンゲリオン - MAGIシステム](https://evangelion.fandom.com/wiki/Magi)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Google Gemini API](https://ai.google.dev/)
- [Anthropic Claude API](https://docs.anthropic.com/)
- [xAI Grok API](https://docs.x.ai/)

---

**DOGMA PROJECT 2024**
