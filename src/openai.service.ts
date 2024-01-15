import { Inject, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { OpenAIModuleOptions } from './module-options.interface';

@Injectable()
export class OpenAIService extends OpenAI {
  constructor(@Inject('OPENAI_CONFIG_OPTIONS') config: OpenAIModuleOptions) {
    super(config);
  }
}
