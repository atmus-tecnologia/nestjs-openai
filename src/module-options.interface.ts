import { ModuleMetadata, Type } from '@nestjs/common';
import { ClientOptions } from 'openai';

export type OpenAIModuleOptions = ClientOptions;

export interface OpenAIModuleOptionsFactory {
  createOpenAIOptions(): Promise<OpenAIModuleOptions> | OpenAIModuleOptions;
}

export interface OpenAIModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useClass?: Type<OpenAIModuleOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<OpenAIModuleOptions> | OpenAIModuleOptions;
  inject?: any[];
}
