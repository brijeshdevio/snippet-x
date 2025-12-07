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
import { AuthGuard } from 'src/common';
import { FolderService } from './folder.service';
import { CreateFolderDto, UpdateFolderDto } from './dto';

@UseGuards(AuthGuard)
@Controller('folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post()
  async handleCreateFolder(
    @Req() req: { user: { sub: string } },
    @Body() body: CreateFolderDto,
  ) {
    const createdBy = req.user.sub;
    const folder = await this.folderService.createFolder(createdBy, body);
    return { folder, message: 'Folder created successfully' };
  }

  @Get()
  async handleGetFolders(@Req() req: { user: { sub: string } }) {
    const createdBy = req.user.sub;
    const folders = await this.folderService.getFolders(createdBy);
    return { folders };
  }

  @Get(':id')
  async handleGetFolder(
    @Req() req: { user: { sub: string } },
    @Param('id') folderId: string,
  ) {
    const createdBy = req.user.sub;
    const folder = await this.folderService.getFolder(createdBy, folderId);
    return { folder };
  }

  @Put(':id')
  async handleUpdateFolder(
    @Req() req: { user: { sub: string } },
    @Param('id') folderId: string,
    @Body() body: UpdateFolderDto,
  ) {
    const createdBy = req.user.sub;
    const folder = await this.folderService.updateFolder(
      createdBy,
      folderId,
      body,
    );
    return { folder, message: 'Folder updated successfully' };
  }

  @Delete(':id')
  async handleDeleteFolder(
    @Req() req: { user: { sub: string } },
    @Param('id') folderId: string,
  ) {
    const createdBy = req.user.sub;
    const folder = await this.folderService.deleteFolder(createdBy, folderId);
    return { folder, message: 'Folder deleted successfully' };
  }
}
