const { CohereClientV2 } = require('cohere-ai');

const client = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});

// 1. テキスト抽出・クリーニング
async function extractText(document) {
  try {
    const response = await client.summarize({
      text: document,
      length: 'medium',
      format: 'bullets',
      model: 'command-r-plus',
      temperature: 0.3,
    });
    return { ok: true, text: response.summary };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

// 2. 自動分類・カテゴリ判定
async function classify(document) {
  try {
    const response = await client.classify({
      inputs: [document],
      examples: [
        { text: 'Sales and Revenue trends', label: 'MD&A' },
        { text: 'Risk management and compliance', label: 'Risk Factors' },
        { text: 'Balance sheet and assets', label: 'Financial Statements' },
        { text: 'Cash flow analysis', label: 'Cash Flow' },
        { text: 'Management strategy and outlook', label: 'Management Strategy' }
      ],
      model: 'command-r-plus',
    });
    return {
      ok: true,
      classification: response.classifications[0]
    };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

// 3. キーワード・エンティティ抽出
async function extractEntities(document) {
  try {
    const prompt = `Extract all financial entities and metrics from this document:
${document}

Return as JSON: { metrics: [], companies: [], risks: [], highlights: [] }`;

    const response = await client.generate({
      prompt: prompt,
      max_tokens: 500,
      model: 'command-r-plus',
      temperature: 0.2,
    });
    
    return {
      ok: true,
      entities: response.generations[0].text
    };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

// 4. 感情分析・トーン判定
async function analyzeTone(document) {
  try {
    const prompt = `Analyze the tone and sentiment of this earnings report:
${document}

Provide: sentiment (positive/neutral/negative), confidence, key_indicators`;

    const response = await client.generate({
      prompt: prompt,
      max_tokens: 300,
      model: 'command-r-plus',
      temperature: 0.2,
    });
    
    return {
      ok: true,
      tone: response.generations[0].text
    };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

// 5. 要約生成
async function generateSummary(document) {
  try {
    const response = await client.summarize({
      text: document,
      length: 'auto',
      format: 'bullets',
      model: 'command-r-plus',
      temperature: 0.3,
    });
    
    return {
      ok: true,
      summary: response.summary
    };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

// 6. 比較分析準備（フォーマット統一）
async function prepareComparison(document, previousYear) {
  try {
    const prompt = `Compare this year's report with previous year and extract key changes:
THIS YEAR:
${document}

PREVIOUS YEAR:
${previousYear}

Return: year_over_year_changes, growth_rate, key_differences`;

    const response = await client.generate({
      prompt: prompt,
      max_tokens: 600,
      model: 'command-r-plus',
      temperature: 0.2,
    });
    
    return {
      ok: true,
      comparison: response.generations[0].text
    };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

// 統合解析エンドポイント
async function analyzeComprehensive(document, previousYear = null) {
  try {
    const [extraction, classification, entities, tone, summary] = await Promise.all([
      extractText(document),
      classify(document),
      extractEntities(document),
      analyzeTone(document),
      generateSummary(document),
    ]);

    let comparison = { ok: true, comparison: null };
    if (previousYear) {
      comparison = await prepareComparison(document, previousYear);
    }

    return {
      ok: true,
      provider: 'cohere',
      model: 'command-r-plus',
      analysis: {
        extraction: extraction.ok ? extraction.text : extraction.error,
        classification: classification.ok ? classification.classification : classification.error,
        entities: entities.ok ? entities.entities : entities.error,
        tone: tone.ok ? tone.tone : tone.error,
        summary: summary.ok ? summary.summary : summary.error,
        comparison: comparison.ok ? comparison.comparison : comparison.error,
      }
    };
  } catch (error) {
    return {
      ok: false,
      error: error.message
    };
  }
}

module.exports = {
  extractText,
  classify,
  extractEntities,
  analyzeTone,
  generateSummary,
  prepareComparison,
  analyzeComprehensive
};
