const { CohereClientV2 } = require('cohere-ai');

const client = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});

async function extractText(document) {
  try {
    const response = await client.summarize({
      text: document,
      length: 'medium',
      format: 'bullets',
      model: 'command-r-plus',
      temperature: 0.3,
    });

    return {
      ok: true,
      summary: response.summary,
    };
  } catch (error) {
    console.error('[COHERE ERROR]', error.message);
    return {
      ok: false,
      error: error.message,
    };
  }
}

module.exports = { extractText };
