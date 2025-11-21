# API リファレンス / API Reference

## 概要 / Overview

DOGMA System v2.0 REST API ドキュメント

---

## ベースURL / Base URL

```
http://localhost:8080
```

本番環境では適切なホスト名に置き換えてください。

---

## エンドポイント一覧 / Endpoints

### 1. POST /api/consensus

**メインAPI**: 3つのAIユニットによる合議制分析

**Main API**: Consensus analysis by three AI units

#### リクエスト / Request

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "prompt": "string (required)",
  "meta": {
    "mode": "string (optional)",
    "temperature": "number (optional)"
  }
}
```

**パラメータ詳細 / Parameter Details:**

| フィールド | 型 | 必須 | デフォルト | 説明 |
|-----------|-----|------|-----------|------|
| `prompt` | string | ✅ | - | 分析したい質問や内容 |
| `meta.mode` | string | ❌ | "integration" | 動作モード (consensus/integration/synthesis) |
| `meta.temperature` | number | ❌ | 0.2 | 温度パラメータ (0.0-1.0) |

**mode の値:**
- `"consensus"` - 合議モード（最初の有効な回答を選択）
- `"integration"` - 統合モード（GPT-4o-miniで統合）**推奨**
- `"synthesis"` - 創発モード（創造的な統合）

#### レスポンス / Response

**Status Code:** `200 OK`

**Body:**
```json
{
  "version": "2.0.0",
  "final": "string",
  "mode": "string",
  "judge": {
    "model": "string",
    "method": "string",
    "name": "string",
    "reason": "string",
    "winner": "string"
  },
  "candidates": [
    {
      "provider": "string",
      "magi_unit": "string",
      "role": "string",
      "ok": boolean,
      "text": "string"
    }
  ],
  "metrics": {
    "response_time_ms": number,
    "valid_responses": number,
    "agreement_ratio": number,
    "timestamp": "string"
  }
}
```

**レスポンスフィールド詳細 / Response Field Details:**

| フィールド | 型 | 説明 |
|-----------|-----|------|
| `version` | string | システムバージョン |
| `final` | string | 統合された最終回答 |
| `mode` | string | 使用された動作モード |
| `judge.model` | string | 判断に使用されたモデル |
| `judge.method` | string | 判断方法 |
| `judge.name` | string | 判断者名（通常"Isabelle"） |
| `judge.reason` | string | 判断理由 |
| `judge.winner` | string | 選択されたプロバイダー（consensusモード時） |
| `candidates[].provider` | string | プロバイダー名 (grok/gemini/claude) |
| `candidates[].magi_unit` | string | MAGIユニット名 |
| `candidates[].role` | string | ユニットの役割 |
| `candidates[].ok` | boolean | 応答成功フラグ |
| `candidates[].text` | string | ユニットの回答テキスト |
| `metrics.response_time_ms` | number | レスポンス時間（ミリ秒） |
| `metrics.valid_responses` | number | 有効な応答数 (0-3) |
| `metrics.agreement_ratio` | number | 合意率 (0.0-1.0) |
| `metrics.timestamp` | string | タイムスタンプ (ISO 8601) |

#### サンプルリクエスト / Sample Requests

**cURL:**
```bash
curl -X POST http://localhost:8080/api/consensus \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "人工知能の未来について教えて",
    "meta": {
      "mode": "integration",
      "temperature": 0.3
    }
  }'
```

**JavaScript (Fetch):**
```javascript
const response = await fetch('http://localhost:8080/api/consensus', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    prompt: '人工知能の未来について教えて',
    meta: {
      mode: 'integration',
      temperature: 0.3
    }
  })
});

const data = await response.json();
console.log(data);
```

**Python:**
```python
import requests
import json

url = 'http://localhost:8080/api/consensus'
payload = {
    'prompt': '人工知能の未来について教えて',
    'meta': {
        'mode': 'integration',
        'temperature': 0.3
    }
}

response = requests.post(url, json=payload)
data = response.json()
print(json.dumps(data, indent=2, ensure_ascii=False))
```

**Node.js (Axios):**
```javascript
const axios = require('axios');

const response = await axios.post('http://localhost:8080/api/consensus', {
  prompt: '人工知能の未来について教えて',
  meta: {
    mode: 'integration',
    temperature: 0.3
  }
});

console.log(response.data);
```

#### エラーレスポンス / Error Responses

**400 Bad Request** - プロンプトが未指定
```json
{
  "error": "Prompt is required"
}
```

**500 Internal Server Error** - サーバーエラー
```json
{
  "error": "Internal server error",
  "message": "エラーメッセージ",
  "version": "2.0.0"
}
```

---

### 2. POST /api/grok/ping

**テストAPI**: Grok接続テスト

**Test API**: Grok connection test

#### リクエスト / Request

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{}
```

#### レスポンス / Response

**Success (200 OK):**
```json
{
  "ok": true,
  "text": "pong"
}
```

**Error (500):**
```json
{
  "ok": false,
  "error": "エラーメッセージ"
}
```

#### サンプル / Sample

```bash
curl -X POST http://localhost:8080/api/grok/ping \
  -H "Content-Type: application/json"
```

---

### 3. GET /health

**ヘルスチェック**: システムの健全性確認

**Health Check**: System health verification

#### レスポンス / Response

**200 OK:**
```json
{
  "status": "healthy",
  "port": 8080
}
```

#### サンプル / Sample

```bash
curl http://localhost:8080/health
```

---

### 4. GET /healthz

**Kubernetes互換ヘルスチェック**

**Kubernetes-compatible health check**

#### レスポンス / Response

**200 OK:**
```
ok
```

#### サンプル / Sample

```bash
curl http://localhost:8080/healthz
```

---

### 5. GET /status

**システムステータス**: 詳細なシステム情報

**System Status**: Detailed system information

#### レスポンス / Response

**200 OK:**
```json
{
  "service": "DOGMA System",
  "version": "2.0.0",
  "port": 8080,
  "time": "2024-01-01T00:00:00.000Z",
  "env_port": "8080",
  "actual_port": 8080,
  "secrets": {
    "OPENAI_API_KEY": true,
    "GEMINI_API_KEY": true,
    "ANTHROPIC_API_KEY": true,
    "XAI_API_KEY": true
  }
}
```

**フィールド説明:**
- `secrets`: APIキーの設定状態（実際のキー値は表示されません）
  - `true` = 設定済み
  - `false` = 未設定

#### サンプル / Sample

```bash
curl http://localhost:8080/status
```

---

## レート制限 / Rate Limiting

本システム自体にレート制限はありませんが、各AIプロバイダーのレート制限が適用されます。

The system itself has no rate limits, but rate limits from each AI provider apply.

**推奨される制限 / Recommended Limits:**
- 同時リクエスト: 5-10
- リクエスト/分: 20-30

本番環境では適切なレート制限の実装を推奨します。

---

## 認証 / Authentication

現在のバージョン（v2.0.0）では、API認証は実装されていません。

The current version (v2.0.0) does not implement API authentication.

**本番環境での推奨事項:**
- API KeyまたはJWT認証の実装
- HTTPSの使用
- CORS設定の適切な構成

---

## CORS設定 / CORS Configuration

デフォルトでは、すべてのオリジンからのリクエストを許可しています。

By default, requests from all origins are allowed.

本番環境では、特定のオリジンのみを許可するように設定してください。

---

## Webhook / ストリーミング

現在のバージョンでは、WebhookとServer-Sent Events (SSE) は実装されていません。

The current version does not implement Webhooks or Server-Sent Events (SSE).

すべてのレスポンスは同期的に返されます。

---

## SDKとクライアントライブラリ / SDKs and Client Libraries

### JavaScript/TypeScript クライアント例

```typescript
class DOGMAClient {
  constructor(private baseUrl: string) {}

  async consensus(
    prompt: string,
    options: {
      mode?: 'consensus' | 'integration' | 'synthesis';
      temperature?: number;
    } = {}
  ): Promise<DOGMAResponse> {
    const response = await fetch(`${this.baseUrl}/api/consensus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt,
        meta: {
          mode: options.mode || 'integration',
          temperature: options.temperature || 0.3
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  async health(): Promise<{ status: string; port: number }> {
    const response = await fetch(`${this.baseUrl}/health`);
    return response.json();
  }

  async status(): Promise<SystemStatus> {
    const response = await fetch(`${this.baseUrl}/status`);
    return response.json();
  }
}

// 使用例
const client = new DOGMAClient('http://localhost:8080');
const result = await client.consensus('AIの未来は？', {
  mode: 'integration'
});
console.log(result.final);
```

### Python クライアント例

```python
import requests
from typing import Optional, Dict, Any

class DOGMAClient:
    def __init__(self, base_url: str = 'http://localhost:8080'):
        self.base_url = base_url

    def consensus(
        self,
        prompt: str,
        mode: str = 'integration',
        temperature: float = 0.3
    ) -> Dict[str, Any]:
        """Send a consensus request"""
        response = requests.post(
            f'{self.base_url}/api/consensus',
            json={
                'prompt': prompt,
                'meta': {
                    'mode': mode,
                    'temperature': temperature
                }
            }
        )
        response.raise_for_status()
        return response.json()

    def health(self) -> Dict[str, Any]:
        """Check system health"""
        response = requests.get(f'{self.base_url}/health')
        return response.json()

    def status(self) -> Dict[str, Any]:
        """Get system status"""
        response = requests.get(f'{self.base_url}/status')
        return response.json()

# 使用例
client = DOGMAClient()
result = client.consensus('AIの未来は？', mode='integration')
print(result['final'])
```

---

## エラーコード / Error Codes

| コード | 説明 | 対処方法 |
|--------|------|----------|
| 400 | Bad Request | リクエストパラメータを確認 |
| 500 | Internal Server Error | サーバーログを確認 |
| ECONNREFUSED | Connection Refused | サーバーが起動しているか確認 |

---

## ベストプラクティス / Best Practices

### 1. エラーハンドリング

```javascript
try {
  const response = await fetch('http://localhost:8080/api/consensus', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: 'test' })
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  
  // 有効な回答が0の場合をチェック
  if (data.metrics.valid_responses === 0) {
    console.warn('No valid responses from AI units');
  }
  
  return data;
} catch (error) {
  console.error('API Error:', error);
  // フォールバック処理
}
```

### 2. タイムアウト設定

```javascript
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 30000); // 30秒

try {
  const response = await fetch('http://localhost:8080/api/consensus', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: 'test' }),
    signal: controller.signal
  });
  
  clearTimeout(timeoutId);
  return await response.json();
} catch (error) {
  if (error.name === 'AbortError') {
    console.error('Request timeout');
  }
  throw error;
}
```

### 3. リトライロジック

```javascript
async function consensusWithRetry(prompt, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch('http://localhost:8080/api/consensus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      if (response.ok) {
        return await response.json();
      }
      
      // 5xxエラーの場合はリトライ
      if (response.status >= 500 && i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        continue;
      }
      
      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
    }
  }
}
```

---

## 変更履歴 / Changelog

### v2.0.0 (Current)
- 3つのAIユニット（BALTHASAR-2, MELCHIOR-1, CASPER-3）
- 3つの動作モード（CONSENSUS, INTEGRATION, SYNTHESIS）
- メトリクス収集機能
- 詳細なレスポンス構造

---

## サポート / Support

質問やバグ報告は [GitHub Issues](https://github.com/miroqu369/magi-sys/issues) へ

**関連ドキュメント:**
- [システム説明書](SYSTEM_EXPLANATION.md)
- [アーキテクチャ](ARCHITECTURE.md)
- [クイックスタート](QUICKSTART.md)

---

**DOGMA PROJECT 2024**
