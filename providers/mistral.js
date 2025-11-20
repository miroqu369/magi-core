/**
 * Mistral AI Provider (仕様ガーディアン専用)
 */
const axios = require('axios');

const MISTRAL_BASE_URL = process.env.MISTRAL_BASE_URL || 'https://api.mistral.ai/v1';
const MISTRAL_MODEL = process.env.MISTRAL_MODEL || 'mistral-medium-latest';

/**
 * Mistral に仕様チェックを依頼
 * @param {string} spec - 仕様テキスト
 * @param {string} taskGoal - タスクの目的
 * @param {string} agentOutput - AIエージェントの回答
 * @param {string} apiKey - Mistral API Key
 * @returns {Promise<{decision: 'pass'|'fail', reasons: string[], required_fixes: string[]}>}
 */
async function checkSpecCompliance(spec, taskGoal, agentOutput, apiKey) {
  if (!apiKey) {
    throw new Error('MISTRAL_API_KEY is not set');
  }

  const systemPrompt = `あなたは「仕様ガーディアン」です。

目的:
- AIエージェントが出力した回答が、与えられた「仕様」と「タスクの目的」に
  どの程度合致しているかを厳密にチェックし、合否を判定します。

必須ルール:
- 感想や雑談は一切書かず、指定したJSON形式のみで出力してください。
- 回答の「わかりやすさ」「文体」ではなく、「仕様の満足度」だけを評価してください。
- 仕様を満たしていない場合は、些細な不足でも必ず fail にしてください。

出力形式:
以下のJSON形式でのみ出力してください:

{
  "decision": "pass" または "fail",
  "reasons": ["理由1", "理由2"],
  "required_fixes": ["修正ポイント1", "修正ポイント2"]
}`;

  const userPrompt = `[仕様]
${spec}

[タスクの目的]
${taskGoal}

[AIエージェントの回答]
${agentOutput}`;

  try {
    const response = await axios.post(
      `${MISTRAL_BASE_URL}/chat/completions`,
      {
        model: MISTRAL_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.2, // 厳密なチェックのため低温度
        response_format: { type: 'json_object' }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        timeout: 60000
      }
    );

    const content = response.data.choices[0].message.content;
    const result = JSON.parse(content);

    // バリデーション
    if (!result.decision || !['pass', 'fail'].includes(result.decision)) {
      throw new Error('Invalid decision format from Mistral');
    }

    return {
      decision: result.decision,
      reasons: result.reasons || [],
      required_fixes: result.required_fixes || []
    };

  } catch (error) {
    console.error('Mistral Guardian Error:', error.response?.data || error.message);
    
    // エラー時はフォールバック（pass扱い）
    return {
      decision: 'pass',
      reasons: ['Guardian error - defaulting to pass'],
      required_fixes: [],
      error: error.message
    };
  }
}

module.exports = { checkSpecCompliance };
