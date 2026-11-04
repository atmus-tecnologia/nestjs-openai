import { OpenAIModule, type OpenAIModuleOptions, OpenAIService } from '@atmus/nestjs-openai';
const options: OpenAIModuleOptions = { apiKey: 'test-key' };
OpenAIModule.register(options);
declare const client: OpenAIService;
void client.responses.create({ model: 'test-model', input: 'test' });
