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
    @Res() res: Response,
  ): Promise<Response> {
    const response = await this.aiService.generateSnippet(content);
    return res.json(response);
  }
}
