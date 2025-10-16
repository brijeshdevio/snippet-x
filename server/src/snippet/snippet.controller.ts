import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
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

  @Get('stats')
  async handleGetStats(@Req() req: { user: { sub: string } }) {
    const createdBy = req.user.sub;
    const result = await this.snippetService.statsSnippet(createdBy);
    return result;
  }

  @Get(':id')
  async handleGetSnippetById(
    @Req() req: { user: { sub: string } },
    @Param('id') snippetId: string,
  ) {
    const createdBy = req.user.sub;
    const snippet = await this.snippetService.getSnippetById(
      createdBy,
      snippetId,
    );
    return { snippet };
  }

  @Put(':id')
  async handleUpdateSnippet(
    @Req() req: { user: { sub: string } },
    @Param('id') snippetId: string,
    @Body() body: CreateSnippetDto,
  ) {
    const createdBy = req.user.sub;
    const snippet = await this.snippetService.updateSnippet(
      createdBy,
      snippetId,
      body,
    );
    return { snippet, message: 'Snippet updated successfully' };
  }

  @Delete(':id')
  async handleDeleteSnippetById(
    @Req() req: { user: { sub: string } },
    @Param('id') snippetId: string,
  ) {
    const createdBy = req.user.sub;
    const snippet = await this.snippetService.deleteSnippetById(
      createdBy,
      snippetId,
    );
    return { snippet, message: 'Snippet deleted successfully.' };
  }
}
