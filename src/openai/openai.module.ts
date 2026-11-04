import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { OPENAI_CONFIG_OPTIONS } from './constants';
import { OpenAIModuleAsyncOptions, OpenAIModuleOptions, OpenAIModuleOptionsFactory } from './module-options.interface';
import { OpenAIService } from './openai.service';


@Global()
@Module({})
export class OpenAIModule {
  static register(options: OpenAIModuleOptions): DynamicModule {
    return {
      module: OpenAIModule,
      providers: [
        {
          provide: OPENAI_CONFIG_OPTIONS,
          useValue: options,
        },
        OpenAIService,
      ],
      exports: [OpenAIService],
    };
  }

  static registerAsync(options: OpenAIModuleAsyncOptions): DynamicModule {
    const asyncProviders = this.createAsyncProviders(options);
    return {
      module: OpenAIModule,
      imports: options.imports || [],
      providers: [...asyncProviders, OpenAIService],
      exports: [OpenAIService],
    };
  }

  private static createAsyncProviders(options: OpenAIModuleAsyncOptions): Provider[] {
    if (options.useFactory) {
      return [{ provide: OPENAI_CONFIG_OPTIONS, useFactory: options.useFactory, inject: options.inject || [] }];
    }
    const factory = options.useClass || options.useExisting;
    if (!factory) throw new Error('OpenAIModule.registerAsync requires useFactory, useClass or useExisting');
    return [
      ...(options.useClass ? [options.useClass] : []),
      { provide: OPENAI_CONFIG_OPTIONS, useFactory: (instance: OpenAIModuleOptionsFactory) => instance.createOpenAIOptions(), inject: [factory] },
    ];
  }
}
