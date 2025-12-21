import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { AiService } from './ai.service';
import { AuthGuard } from 'src/common';

@UseGuards(AuthGuard)
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('generate')
  async handleGenerateSnippet(
    @Body() content: { language: string; prompt: string },
    @Res({ passthrough: true }) res: Response,
  ) {
   return await this.aiService.generateSnippet(content);
  }
}
