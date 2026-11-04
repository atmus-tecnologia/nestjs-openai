# @atmus/nestjs-openai

Inject the official OpenAI SDK into NestJS applications, including Responses, streaming and other SDK resources.

## Installation

Version 1.0.0 is distributed through GitHub Releases. It has not been published to npm yet; use the archive URL below.

```sh
npm install https://github.com/atmus-tecnologia/nestjs-openai/releases/download/v1.0.0/atmus-nestjs-openai-1.0.0.tgz @nestjs/common reflect-metadata rxjs
```

Use the same Nest major as your application. Upgrading from a previous release? Read [MIGRATION.md](MIGRATION.md) first.

## Configuration

```ts
import { Module } from '@nestjs/common';
import { OpenAIModule } from '@atmus/nestjs-openai';

@Module({
  imports: [OpenAIModule.register({ apiKey: process.env.OPENAI_API_KEY! })],
})
export class AppModule {}
```

Load OPENAI_API_KEY before registering the module. Never commit API keys or passwords.
For asynchronous configuration:

```ts
OpenAIModule.registerAsync({
  useFactory: async () => ({ apiKey: process.env.OPENAI_API_KEY! }),
})
```

`useClass` and `useExisting` are also supported; factories implement `createOpenAIOptions()`.

## Usage and API

```ts
import { Injectable } from '@nestjs/common';
import { OpenAIService } from '@atmus/nestjs-openai';

@Injectable()
export class AnswersService {
  constructor(private readonly openai: OpenAIService) {}

  async answer(input: string) {
    const response = await this.openai.responses.create({
      model: process.env.OPENAI_MODEL!,
      input,
    });
    return response.output_text;
  }
}
```

Set OPENAI_MODEL to a model available to your account. OpenAIService extends OpenAI, so SDK methods, errors, retries and streaming remain native. ClientOptions such as timeout, maxRetries, baseURL and custom fetch can be passed directly to register. No extra request wrapping or model defaults are introduced.

For streaming, pass `stream: true` to `responses.create` and iterate with `for await (const event of stream)`. See the [official TypeScript API](https://developers.openai.com/api/reference/typescript). Keep API keys on the server.

Public exports: OpenAIModule, OpenAIService, OpenAIModuleOptions, OpenAIModuleAsyncOptions, OpenAIModuleOptionsFactory and OPENAI_CONFIG_OPTIONS. The module retains its global scope.


## Compatibility and development

Requires **Node.js 22.12+**, **NestJS 11 or 12**, RxJS 7.8+ and reflect-metadata 0.2.2+.
The package ships CommonJS JavaScript, TypeScript declarations and source maps. Modern Node supports loading NestJS 12's ESM dependencies; use a compatible NodeNext/Node20 TypeScript configuration in consuming applications.

```sh
npm ci
npm run check
```

Checks include offline regression tests and installation of the actual npm archive in an isolated consumer. CI covers Node 22/24 and Nest 11/12. No real API credentials are used by the test suite. Live provider behavior must be validated in your application.

See [CHANGELOG.md](CHANGELOG.md), [MIGRATION.md](MIGRATION.md) and [CONTRIBUTING.md](CONTRIBUTING.md) for release history, breaking changes and publication instructions. Licensed under [MIT](LICENSE).
