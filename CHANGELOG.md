# Changelog

Notable changes are recorded here. Versions follow Semantic Versioning.

## [1.0.0](https://github.com/atmus-tecnologia/nestjs-openai/releases/tag/v1.0.0) - 2026-11-04

### Breaking changes

- Require Node.js 22.12+ and NestJS 11 or 12; NestJS 10 is no longer supported.
- Updated upstream SDK majors may change types, defaults and resource behavior. See [MIGRATION.md](MIGRATION.md).

### Changes

- Upgrade the official OpenAI SDK from 4 to 7, exposing Responses and all inherited SDK resources.
- Support NestJS 11/12 and implement async useClass/useExisting configuration.
- Export public module option types and injection token.
- Declare the TypeScript entry point explicitly and document Responses usage.
- Replace copied documentation with package-specific installation, configuration, API and migration examples.
- Add offline regression tests, clean TypeScript builds, package-consumer validation, CI and an opt-in OIDC npm publishing workflow.
- Remove obsolete lint/release tooling, duplicate runtime peers and the shell-only deploy script.
- Publish only compiled JavaScript, declarations, source maps, documentation and license.

## 0.0.2

Previous release. Detailed historical changes were not recorded.
