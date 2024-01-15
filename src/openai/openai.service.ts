import { Inject, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { OpenAIModuleOptions } from './module-options.interface';
import { OPENAI_CONFIG_OPTIONS } from './constants';

@Injectable()
export class OpenAIService extends OpenAI {
  constructor(@Inject(OPENAI_CONFIG_OPTIONS) config: OpenAIModuleOptions) {
    super(config);
  }
}
