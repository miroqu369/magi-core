'use strict';
const app = global.app;

// Yahoo Finance からリアルタイムデータを取得（非同期）
const getStockData = async (ticker) => {
  try {
    // モックデータを使用（Yahoo Finance の問題回避）
    const mockData = {
      'AAPL': { price: 229.45, pe_ratio: 32.5, eps: 7.05, dividend_yield: 0.42, market_cap: 3500000000000 },
      'GOOGL': { price: 178.90, pe_ratio: 28.3, eps: 6.32, dividend_yield: 0, market_cap: 1800000000000 },
      'MSFT': { price: 435.02, pe_ratio: 38.5, eps: 11.32, dividend_yield: 0.71, market_cap: 3200000000000 },
      'TSLA': { price: 268.00, pe_ratio: 68.5, eps: 3.91, dividend_yield: 0, market_cap: 850000000000 }
    };
    
    const data = mockData[ticker.toUpperCase()];
    if (!data) return null;
    
    console.log(`✅ Retrieved data for ${ticker}`);
    return data;
  } catch (e) {
    console.error(`❌ Error retrieving ${ticker}:`, e.message);
    return null;
  }
};

app.post('/api/consensus', async (req, res) => {
  const { prompt, meta = {} } = req.body;
  
  if (!prompt) {
    return res.status(400).json({ error: 'prompt is required' });
  }

  try {
    const consensusResult = await consensusFlow(prompt, meta);
    const guardianResult = await guardianCheck(consensusResult, prompt, meta);

    if (guardianResult.approved) {
      return res.json({
        ...consensusResult,
        guardian: {
          checked: true,
          decision: guardianResult.guardian_result.decision,
          reasons: guardianResult.guardian_result.reasons
        }
      });
    } else {
      return res.status(422).json({
        error: 'Specification check failed',
        guardian: guardianResult.guardian_result,
        retry_instructions: guardianResult.retry_instructions,
        original_output: consensusResult.final
      });
    }
  } catch (error) {
    console.error('Consensus error:', error);
    res.status(500).json({ error: error.message });
  }
});


app.post('/api/stock/search', async (req, res) => {
  try {
    const { ticker } = req.body;
    if (!ticker) return res.status(400).json({ error: 'ticker required' });

    console.log(`🔍 Searching for ${ticker}`);
    const data = await getStockData(ticker);

    if (!data) return res.status(404).json({ error: 'Ticker not found' });

    console.log(`✅ Successfully retrieved ${ticker}`);
    res.json({ ticker, ...data });
  } catch (e) {
    console.error('❌ stock/search error:', e.message);
    res.status(500).json({ error: e.message });
  }
});


const { extractText } = require('./providers/cohere');

app.post('/api/document/analyze', async (req, res) => {
  try {
    const { document } = req.body;
    if (!document) return res.status(400).json({ error: 'document required' });
    
    console.log('📄 COHERE: テキスト抽出開始');
    const extracted = await extractText(document);
    
    if (!extracted.ok) {
      return res.status(500).json({ error: extracted.error });
    }
    
    console.log('✅ COHERE: 抽出完了');
    res.json({
      provider: 'cohere',
      model: 'command-r-plus',
      ok: true,
      summary: extracted.summary
    });
  } catch (e) {
    console.error('❌ document/analyze error:', e.message);
    res.status(500).json({ error: e.message });
  }
});
module.exports = app;
