require('reflect-metadata');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { Module } = require('@nestjs/common');
const { Test } = require('@nestjs/testing');
const { OpenAIModule, OpenAIService } = require('../dist');
const options = { apiKey: 'test-key', maxRetries: 0 };

test('synchronous and async factory registration resolve the injectable service', async () => {
  class Config { getOptions() { return options; } }
  class ConfigModule {}
  Module({ providers: [Config], exports: [Config] })(ConfigModule);
  for (const definition of [
    OpenAIModule.register(options),
    OpenAIModule.registerAsync({ imports: [ConfigModule], inject: [Config], useFactory: async config => config.getOptions() }),
  ]) {
    const context = await Test.createTestingModule({ imports: [definition] }).compile();
    try { assert(context.get(OpenAIService) instanceof OpenAIService); }
    finally { await context.close(); }
  }
});

test('empty async options fail with a useful message', () => {
  assert.throws(() => OpenAIModule.registerAsync({}), /requires useFactory/);
});

test('useClass and useExisting resolve options through Nest dependency injection', async () => {
  class OptionsFactory { createOpenAIOptions() { return options; } }
  class OptionsModule {}
  Module({ providers: [OptionsFactory], exports: [OptionsFactory] })(OptionsModule);
  for (const definition of [
    OpenAIModule.registerAsync({ useClass: OptionsFactory }),
    OpenAIModule.registerAsync({ imports: [OptionsModule], useExisting: OptionsFactory }),
  ]) {
    const context = await Test.createTestingModule({ imports: [definition] }).compile();
    try { assert(context.get(OpenAIService) instanceof OpenAIService); }
    finally { await context.close(); }
  }
});
