require('reflect-metadata');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { OpenAIService } = require('../dist');

test('Responses API inherits the SDK and forwards authentication, input and errors', async () => {
  let request;
  const client = new OpenAIService({ apiKey: 'test-key', maxRetries: 0,
    fetch: async (url, options) => {
      request = { url: String(url), options };
      return new Response(JSON.stringify({ id: 'resp_test', object: 'response', output: [] }), { headers: { 'content-type': 'application/json' } });
    },
  });
  const response = await client.responses.create({ model: 'test-model', input: 'Hello' });
  assert.equal(response.id, 'resp_test');
  assert(request.url.endsWith('/responses'));
  assert.equal(new Headers(request.options.headers).get('authorization'), 'Bearer test-key');
  assert.equal(JSON.parse(request.options.body).input, 'Hello');
  const failing = new OpenAIService({ apiKey: 'test-key', maxRetries: 0, fetch: async () =>
    new Response(JSON.stringify({ error: { message: 'Invalid key' } }), { status: 401, headers: { 'content-type': 'application/json' } }) });
  await assert.rejects(() => failing.responses.create({ model: 'test-model', input: 'Hello' }), error => error.status === 401);
});
