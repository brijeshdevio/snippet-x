import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Snippet } from 'src/schema/snippet.schema';
import { CreateSnippetDto, UpdateSnippetDto } from './dto';

@Injectable()
export class SnippetService {
  constructor(
    @InjectModel(Snippet.name) private readonly snippetModel: Model<Snippet>,
  ) {}

  private isValidId(_id: string) {
    if (isValidObjectId(_id)) {
      return true;
    }
    throw new BadRequestException(`Invalid Snippet ID: ${_id}`);
  }

  async createSnippet(
    createdBy: string,
    data: CreateSnippetDto,
  ): Promise<Snippet> {
    const newSnippet = await this.snippetModel.create({
      createdBy,
      ...data,
    });
    return newSnippet;
  }

  async getSnippets(createdBy: string): Promise<Snippet[]> {
    const snippets = await this.snippetModel
      .find({ createdBy })
      .lean()
      .select('-__v -createdBy -createdAt -code');
    return snippets;
  }

  async getSnippetById(createdBy: string, snippetId: string): Promise<Snippet> {
    this.isValidId(snippetId);

    const snippet = await this.snippetModel
      .findOne({ createdBy, _id: snippetId })
      .lean()
      .select('-__v -createdBy -createdAt');
    if (snippet) {
      return snippet;
    }

    throw new ForbiddenException('You do not have access to get this Snippet.');
  }

  async updateSnippet(
    createdBy: string,
    snippetId: string,
    data: UpdateSnippetDto,
  ): Promise<Snippet> {
    const updatedSnippet = await this.snippetModel
      .findOneAndUpdate(
        {
          createdBy,
          _id: snippetId,
        },
        { ...data },
        { new: true },
      )
      .lean()
      .select('-__v -createdBy -createdAt -code');
    if (updatedSnippet) {
      return updatedSnippet;
    }

    throw new ForbiddenException(
      'You do not have access to update this Snippet.',
    );
  }
}
