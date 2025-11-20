/**
 * MAGI Guardian - Mistral による仕様チェック層
 */
const { checkSpecCompliance } = require('./providers/mistral');

/**
 * Mary の統合回答を仕様チェック
 * @param {object} consensusResult - Mary からの合議結果
 * @param {string} originalPrompt - ユーザーの元質問
 * @param {object} meta - メタ情報（mode, spec等）
 * @returns {Promise<{approved: boolean, guardian_result: object, final_output: string}>}
 */
async function guardianCheck(consensusResult, originalPrompt, meta = {}) {
  const apiKey = process.env.MISTRAL_API_KEY;
  
  // Guardian が無効化されている場合はスキップ
  if (meta.skip_guardian || !apiKey) {
    return {
      approved: true,
      guardian_result: { decision: 'pass', reasons: ['Guardian disabled or no API key'], required_fixes: [] },
      final_output: consensusResult.final
    };
  }

  // デフォルト仕様（カスタム可能）
  const spec = meta.spec || `
- ユーザーの質問に直接答えること
- 3つのAI（BALTHASAR-2, MELCHIOR-1, CASPER-3）の意見を考慮すること
- 論理的で明確な回答を提供すること
- 不明な点は推測せず、明確に伝えること
  `.trim();

  const taskGoal = meta.task_goal || `ユーザーの質問「${originalPrompt}」に対して、正確で有用な回答を提供する`;

  const agentOutput = consensusResult.final;

  console.log('🛡️ Guardian check starting...');
  
  const guardianResult = await checkSpecCompliance(spec, taskGoal, agentOutput, apiKey);

  console.log('🛡️ Guardian decision:', guardianResult.decision);

  if (guardianResult.decision === 'pass') {
    return {
      approved: true,
      guardian_result: guardianResult,
      final_output: consensusResult.final
    };
  } else {
    // fail の場合は修正指示を含める
    const fixInstructions = guardianResult.required_fixes.join('\n- ');
    
    return {
      approved: false,
      guardian_result: guardianResult,
      final_output: null,
      retry_instructions: `以下の点を修正してください:\n- ${fixInstructions}`
    };
  }
}

module.exports = { guardianCheck };
