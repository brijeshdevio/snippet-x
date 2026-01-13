import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Folder } from '../schema/folder.schema';
import { CreateFolderDto, UpdateFolderDto } from './dto';

@Injectable()
export class FolderService {
  constructor(@InjectModel(Folder.name) private folderModel: Model<Folder>) {}

  private isValidId(_id: string) {
    if (isValidObjectId(_id)) {
      return true;
    }
    throw new BadRequestException(`Invalid Folder ID: ${_id}`);
  }

  async createFolder(createdBy: string, data: CreateFolderDto) {
    const folder = await this.folderModel.create({
      ...data,
      createdBy,
    });
    return folder;
  }

  async getFolders(createdBy: string) {
    const folders = await this.folderModel
      .find({ createdBy })
      .select('-__v -createdBy -createdAt -description -updatedAt');
    return folders;
  }

  async getFolder(createdBy: string, id: string) {
    this.isValidId(id);
    const folder = await this.folderModel
      .findOne({ createdBy, _id: id })
      .select('-__v -createdBy');
    if (folder) {
      return folder;
    }

    throw new ForbiddenException('You do not have access to get this Folder.');
  }

  async updateFolder(createdBy: string, id: string, data: UpdateFolderDto) {
    this.isValidId(id);
    const folder = await this.folderModel
      .findOneAndUpdate({ createdBy, _id: id }, { ...data }, { new: true })
      .select('-__v -createdBy');
    if (folder) {
      return folder;
    }
    throw new ForbiddenException(
      'You do not have access to update this Folder.',
    );
  }

  async deleteFolder(createdBy: string, id: string) {
    this.isValidId(id);
    const folder = await this.folderModel
      .findOneAndDelete({ createdBy, _id: id })
      .select('-__v -createdBy');
    if (folder) {
      return folder;
    }
    throw new ForbiddenException(
      'You do not have access to delete this Folder.',
    );
  }
}
