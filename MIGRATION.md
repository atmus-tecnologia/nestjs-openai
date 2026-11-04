# Migrating from 0.0.2 to 1.0.0

This is a breaking release. Upgrade Node.js to 22.12+ and NestJS to 11 or 12 before installing it. Keep @nestjs/common and @nestjs/core on the same major. CommonJS consumers can load the package on supported Node releases; ESM consumers can use named imports. TypeScript consumers should use a modern NodeNext or Node20 module configuration compatible with require(esm) when consuming NestJS 12.

The service still extends the official OpenAI client. `register` and `registerAsync` retain their names. SDK 4 → 7 changes are upstream breaking changes: review method signatures, resource availability, model parameters and streaming types before upgrading an existing application. Assistants-era code is not automatically migrated.

Prefer `service.responses.create(...)` for new integrations; `service.chat.completions` is available where supported by the installed SDK. No model is selected by this package. Use a model available to your account. Do not enable browser API-key usage.

See the [official TypeScript reference](https://developers.openai.com/api/reference/typescript) and [SDK migration history](https://github.com/openai/openai-node/blob/master/CHANGELOG.md).

Run your application's integration tests before rollout. This repository's tests use offline transports; they do not establish live-provider or production behavior.
