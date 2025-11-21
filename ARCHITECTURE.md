# システムアーキテクチャ / System Architecture

## システム構成図 / System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         DOGMA SYSTEM v2.0                       │
│                    (Consensus AI System)                        │
└─────────────────────────────────────────────────────────────────┘

                              ┌──────────┐
                              │  Client  │
                              │  Browser │
                              └────┬─────┘
                                   │
                                   │ HTTP Request
                                   │ POST /api/consensus
                                   ▼
                      ┌────────────────────────┐
                      │   Express Server       │
                      │   (bootstrap.js)       │
                      │   Port: 8080           │
                      └────────────┬───────────┘
                                   │
                                   │ Routes
                                   ▼
                      ┌────────────────────────┐
                      │    server.js           │
                      │    (Main Logic)        │
                      └────────────┬───────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
        ┌───────────▼───┐  ┌──────▼──────┐  ┌───▼──────────┐
        │  BALTHASAR-2  │  │ MELCHIOR-1  │  │   CASPER-3   │
        │   (Unit-B2)   │  │  (Unit-M1)  │  │   (Unit-C3)  │
        ├───────────────┤  ├─────────────┤  ├──────────────┤
        │  Grok (xAI)   │  │   Gemini    │  │    Claude    │
        │  創造的分析    │  │  論理的分析  │  │   人間的分析  │
        └───────┬───────┘  └──────┬──────┘  └───────┬──────┘
                │                 │                 │
                │    Parallel     │    Execution    │
                │   (Promise.     │   allSettled)   │
                └────────┬────────┴─────────────────┘
                         │
                         │ All Responses
                         ▼
                ┌─────────────────────┐
                │   Integration       │
                │   by Isabelle       │
                │   (GPT-4o-mini)     │
                └──────────┬──────────┘
                           │
                           │ Final Answer
                           ▼
                ┌─────────────────────┐
                │   Response JSON     │
                │   - final           │
                │   - candidates      │
                │   - metrics         │
                │   - judge           │
                └─────────────────────┘
```

## データフロー / Data Flow

### 1. リクエスト受信 / Request Reception

```
User Input → Express Server → server.js
```

クライアントから以下のJSONを受信：
```json
{
  "prompt": "ユーザーの質問",
  "meta": {
    "mode": "integration",
    "temperature": 0.3
  }
}
```

### 2. 並列実行 / Parallel Execution

```javascript
const results = await Promise.allSettled([
  grok.chat(prompt, meta),      // BALTHASAR-2
  gemini.chat(prompt, meta),    // MELCHIOR-1
  anthropic.chat(prompt, meta)  // CASPER-3
]);
```

3つのAIプロバイダーに同時にリクエスト送信

### 3. レスポンス収集 / Response Collection

```
BALTHASAR-2 → Creative Response
MELCHIOR-1  → Logical Response
CASPER-3    → Human Response
```

各ユニットから独立した回答を取得

### 4. 統合処理 / Integration Process

#### CONSENSUS Mode
```
validResponses → First Valid → Final Answer
```

#### INTEGRATION Mode (推奨)
```
validResponses → GPT-4o-mini (T=0.3) → Integrated Answer
```

#### SYNTHESIS Mode
```
validResponses → GPT-4o-mini (T=0.7) → Creative Synthesis
```

### 5. レスポンス返却 / Response Return

```json
{
  "version": "2.0.0",
  "final": "統合された最終回答",
  "mode": "integration",
  "judge": { ... },
  "candidates": [ ... ],
  "metrics": { ... }
}
```

## コンポーネント詳細 / Component Details

### Bootstrap Layer

```
bootstrap.js
├── Environment Setup (PORT, etc.)
├── Express Initialization
├── Health Check Endpoints
│   ├── GET /healthz
│   ├── GET /health
│   └── GET /status
└── Server Module Loading
    └── require('./server.js')
```

### Server Layer

```
server.js
├── Provider Initialization
│   ├── GrokProvider
│   ├── GeminiProvider
│   ├── AnthropicProvider
│   └── OpenAIProvider
├── Static File Serving
│   └── public/
├── API Endpoints
│   ├── POST /api/consensus
│   └── POST /api/grok/ping
└── Error Handling
```

### Provider Layer

```
providers/
├── grok.js
│   ├── XAI_API_KEY
│   ├── Base URL: api.x.ai/v1
│   └── Model: grok-2
├── gemini.js
│   ├── GEMINI_API_KEY
│   ├── Base URL: generativelanguage.googleapis.com
│   └── Model: gemini-2.0-flash-exp
├── anthropic.js
│   ├── ANTHROPIC_API_KEY
│   ├── Base URL: api.anthropic.com/v1
│   └── Model: claude-sonnet-4-20250514
└── openai.js
    ├── OPENAI_API_KEY
    ├── Base URL: api.openai.com/v1
    └── Model: gpt-4o-mini
```

### Frontend Layer

```
public/
├── index.html              (Main UI)
├── dogma-full.html         (Full Response View) ⭐
├── magi-dash.html          (Dashboard)
├── magi-debate.html        (Debate Mode)
├── compare.html            (Comparison)
├── history.html            (History)
├── admin.html              (Admin Panel)
└── debug.html              (Debug Tools)
```

## 処理フロー詳細 / Detailed Process Flow

### Mode: INTEGRATION (推奨)

```
Step 1: Receive Request
   ↓
Step 2: Parallel API Calls
   ├─→ Grok API    (BALTHASAR-2)
   ├─→ Gemini API  (MELCHIOR-1)
   └─→ Claude API  (CASPER-3)
   ↓
Step 3: Collect Responses
   ├─→ Response 1: Creative
   ├─→ Response 2: Logical
   └─→ Response 3: Human
   ↓
Step 4: Integration Prompt
   "統合して最適な回答を提供してください：
    [BALTHASAR-2]: ...
    [MELCHIOR-1]: ...
    [CASPER-3]: ..."
   ↓
Step 5: OpenAI Integration
   GPT-4o-mini (temperature=0.3)
   ↓
Step 6: Final Response
   {
     final: "統合された回答",
     candidates: [...],
     metrics: {...}
   }
```

## エラーハンドリング / Error Handling

```
┌─────────────────────┐
│  API Call Failed?   │
└──────────┬──────────┘
           │
      ┌────▼────┐
      │  YES    │
      │         │
      ▼         ▼
   Fallback   Continue
   Response   with
   (Error)    Valid
              Responses
                │
                ▼
           ┌──────────────┐
           │ Valid >= 1?  │
           └──────┬───────┘
                  │
         ┌────────┴────────┐
         │                 │
    ┌────▼────┐      ┌────▼────┐
    │   YES   │      │   NO    │
    │         │      │         │
    │ Process │      │  Error  │
    │  Mode   │      │Response │
    └─────────┘      └─────────┘
```

## メトリクス収集 / Metrics Collection

```
Start Time
   ↓
API Calls
   ↓
End Time
   ↓
Calculate:
├── response_time_ms = End - Start
├── valid_responses = Count(ok === true)
├── agreement_ratio = valid_responses / 3
└── timestamp = new Date().toISOString()
```

## セキュリティアーキテクチャ / Security Architecture

```
┌─────────────────────────────────────┐
│  Environment Variables              │
│  ┌─────────────────────────────┐   │
│  │ OPENAI_API_KEY              │   │
│  │ GEMINI_API_KEY              │   │
│  │ ANTHROPIC_API_KEY           │   │
│  │ XAI_API_KEY                 │   │
│  └─────────────────────────────┘   │
└──────────────┬──────────────────────┘
               │
               ▼
      ┌────────────────┐
      │ Process.env    │
      └────────┬───────┘
               │
               ▼
      ┌────────────────┐
      │ Providers      │
      │ (Runtime Only) │
      └────────┬───────┘
               │
               ▼
      ┌────────────────┐
      │ External APIs  │
      │ (HTTPS)        │
      └────────────────┘
```

## スケーラビリティ / Scalability

### 水平スケーリング / Horizontal Scaling

```
     ┌──────────────┐
     │ Load Balancer│
     └──────┬───────┘
            │
   ┌────────┼────────┐
   │        │        │
┌──▼──┐  ┌─▼───┐  ┌─▼───┐
│ App │  │ App │  │ App │
│  1  │  │  2  │  │  3  │
└─────┘  └─────┘  └─────┘
```

各インスタンスは独立して動作可能（ステートレス）

### レート制限 / Rate Limiting

```
Provider Limits:
├── OpenAI:    RPM/TPM based
├── Gemini:    QPM based
├── Anthropic: RPM based
└── xAI:       RPM based

Recommendation:
└── Implement queue system for high traffic
```

## デプロイメント / Deployment

### Docker Architecture

```
┌─────────────────────────────────────┐
│  Docker Container                   │
│  ┌───────────────────────────────┐ │
│  │  Node.js 18                   │ │
│  │  ┌─────────────────────────┐ │ │
│  │  │  DOGMA System           │ │ │
│  │  │  ├── bootstrap.js       │ │ │
│  │  │  ├── server.js          │ │ │
│  │  │  ├── providers/         │ │ │
│  │  │  └── public/            │ │ │
│  │  └─────────────────────────┘ │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
         │
         ▼
    Port 8080
```

---

## パフォーマンス特性 / Performance Characteristics

### レスポンスタイム / Response Time

```
Typical Response Times:
├── CONSENSUS:    2-5 seconds
├── INTEGRATION:  5-10 seconds
└── SYNTHESIS:    5-12 seconds

Factors:
├── API Response Times (2-8 sec each)
├── Integration Time (1-3 sec)
└── Network Latency (~500ms)
```

### スループット / Throughput

```
Single Instance:
├── Sequential: ~6-12 requests/min
└── Parallel Processing: Limited by API rate limits

Recommended:
└── Use queue system for >10 concurrent requests
```

---

**詳細なシステム説明は [SYSTEM_EXPLANATION.md](SYSTEM_EXPLANATION.md) を参照してください。**

**For detailed system explanation, see [SYSTEM_EXPLANATION.md](SYSTEM_EXPLANATION.md).**
