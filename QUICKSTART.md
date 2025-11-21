# クイックスタートガイド / Quick Start Guide

## 5分で始めるDOGMA System

### 1. リポジトリのクローン

```bash
git clone https://github.com/miroqu369/magi-sys.git
cd magi-sys
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 環境変数の設定

`.env` ファイルを作成し、APIキーを設定：

```bash
# 必須: 統合判断用
OPENAI_API_KEY=sk-...

# 必須: 3つのAIユニット用
GEMINI_API_KEY=...
ANTHROPIC_API_KEY=sk-ant-...
XAI_API_KEY=xai-...

# オプション: ポート設定
PORT=8080
```

**APIキーの取得方法:**
- OpenAI: https://platform.openai.com/api-keys
- Google Gemini: https://makersuite.google.com/app/apikey
- Anthropic: https://console.anthropic.com/
- xAI Grok: https://console.x.ai/

### 4. サーバーの起動

```bash
npm start
```

または

```bash
node bootstrap.js
```

### 5. ブラウザでアクセス

```
http://localhost:8080
```

---

## はじめての質問

### Web UIから

1. ブラウザで `http://localhost:8080` を開く
2. モードを選択（推奨: INTEGRATION）
3. 質問を入力（例: "人工知能の未来について教えて"）
4. 「送信」ボタンをクリック
5. 3つのAIの回答と統合結果が表示されます

### cURLから

```bash
curl -X POST http://localhost:8080/api/consensus \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "人工知能の未来について教えて",
    "meta": {
      "mode": "integration"
    }
  }'
```

### JavaScriptから

```javascript
const response = await fetch('http://localhost:8080/api/consensus', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    prompt: '人工知能の未来について教えて',
    meta: { mode: 'integration' }
  })
});

const result = await response.json();
console.log(result.final); // 統合された回答
console.log(result.candidates); // 各AIの個別回答
```

---

## 各モードの使い分け

### CONSENSUS（合議）
- **使用場面**: シンプルに最良の回答が欲しい時
- **例**: "今日の天気は？"

### INTEGRATION（統合）⭐ **推奨**
- **使用場面**: 複雑な問題を多角的に分析したい時
- **例**: "AIの倫理問題について総合的に分析して"

### SYNTHESIS（創発）
- **使用場面**: 新しい洞察やアイデアが欲しい時
- **例**: "未来の教育システムを創造的に提案して"

---

## UIの種類と使い分け

### 1. 基本UI (`/index.html`) ⭐ **初心者向け**
シンプルで使いやすいメインインターフェース

### 2. フルレスポンスUI (`/dogma-full.html`) ⭐ **推奨**
3つのAIの個別回答を確認できる詳細ビュー

### 3. ダッシュボード (`/magi-dash.html`)
システム状態の可視化とモニタリング

### 4. ディベートモード (`/magi-debate.html`)
AIたちの議論を可視化

---

## トラブルシューティング

### ❌ サーバーが起動しない

**症状:**
```
Error: listen EADDRINUSE
```

**解決策:**
```bash
# 別のポートを使用
PORT=3000 npm start
```

### ❌ APIエラーが出る

**症状:**
```
Error: OPENAI_API_KEY not configured
```

**解決策:**
1. `.env` ファイルが存在するか確認
2. APIキーが正しく設定されているか確認
3. サーバーを再起動

### ❌ 回答が返ってこない

**チェック項目:**
1. `/status` エンドポイントでAPIキーの状態を確認
   ```bash
   curl http://localhost:8080/status
   ```
2. 各APIキーの有効性とクォータを確認
3. ネットワーク接続を確認

---

## 次のステップ

1. **詳細なドキュメントを読む**
   - [SYSTEM_EXPLANATION.md](SYSTEM_EXPLANATION.md) - システム全体の説明
   - [README.md](README.md) - プロジェクト概要

2. **UIを試す**
   - `/dogma-full.html` で各AIの回答を比較
   - `/magi-debate.html` でAI間の議論を観察

3. **APIを統合**
   - 自分のアプリケーションにAPIを組み込む
   - カスタムUIを作成

4. **カスタマイズ**
   - モデルの変更（環境変数で指定可能）
   - Temperatureの調整
   - プロンプトエンジニアリング

---

## よくある質問

### Q: 無料で使えますか？
A: システム自体は無料ですが、各AI APIの利用料が発生します。

### Q: どのモードが一番良いですか？
A: 一般的には **INTEGRATION** モードが推奨です。複数のAIの強みを組み合わせられます。

### Q: APIキーはいくつ必要ですか？
A: 完全に動作させるには4つ（OpenAI、Gemini、Anthropic、xAI）必要ですが、最低1つあれば動作します。

### Q: レート制限は？
A: 各AIプロバイダーのレート制限に従います。本システム自体にはレート制限はありません。

### Q: 本番環境で使えますか？
A: はい。Dockerイメージをビルドして、適切な環境変数を設定すればデプロイ可能です。

---

## サポート

問題が発生した場合:
1. [Issues](https://github.com/miroqu369/magi-sys/issues) で既存の問題を検索
2. 新しいIssueを作成
3. [SYSTEM_EXPLANATION.md](SYSTEM_EXPLANATION.md) のトラブルシューティングセクションを確認

---

**DOGMA PROJECT 2024**
