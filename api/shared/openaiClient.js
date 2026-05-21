const OpenAI = require('openai');

let client;

function normalizeEndpoint(raw) {
  if (!raw) return '';
  let endpoint = raw.trim().replace(/\/+$/, '');
  if (endpoint.includes('/openai/')) {
    endpoint = endpoint.split('/openai/')[0];
  }
  if (endpoint.includes('/api/projects/')) {
    const match = endpoint.match(/^(https:\/\/[^/]+)/);
    if (match) endpoint = match[1];
  }
  return endpoint;
}

function getOpenAIClient() {
  if (!client) {
    const apiKey = process.env.AZURE_OPENAI_API_KEY;
    const endpoint = normalizeEndpoint(process.env.AZURE_OPENAI_ENDPOINT);

    if (!apiKey || !endpoint) {
      throw new Error(
        'AZURE_OPENAI_API_KEY and AZURE_OPENAI_ENDPOINT must be configured'
      );
    }

    client = new OpenAI({
      apiKey,
      baseURL: `${endpoint}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-4o'}`,
      defaultQuery: { 'api-version': '2024-08-01-preview' },
      defaultHeaders: { 'api-key': apiKey },
    });
  }
  return client;
}

module.exports = {
  getOpenAIClient,
  normalizeEndpoint,
};
