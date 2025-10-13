import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SnippetService } from './snippet.service';
import { AuthGuard } from 'src/common';
import { CreateSnippetDto } from './dto';

@UseGuards(AuthGuard)
@Controller('snippets')
export class SnippetController {
  constructor(private readonly snippetService: SnippetService) {}

  @Post()
  async handleCreateSnippet(
    @Req() req: { user: { sub: string } },
    @Body() body: CreateSnippetDto,
  ) {
    const createdBy = req.user.sub;
    const snippet = await this.snippetService.createSnippet(createdBy, body);
    return { snippet, message: 'Snippet created successfully' };
  }

  @Get()
  async handleGetSnippets(@Req() req: { user: { sub: string } }) {
    const createdBy = req.user.sub;
    const snippets = await this.snippetService.getSnippets(createdBy);
    return { snippets };
  }
}
