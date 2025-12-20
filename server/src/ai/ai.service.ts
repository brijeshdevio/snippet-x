import { Injectable } from '@nestjs/common';
import { getGroqChatCompletion } from 'src/config/groq.config';

@Injectable()
export class AiService {
  ai = getGroqChatCompletion;
  constructor() {}

  async generateSnippet(content: { language: string; prompt: string }) {
    const response = await this.ai(content);
    if (typeof response === 'string') {
      return JSON.parse(response) as string;
    }
    return response;
  }
}
