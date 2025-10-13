import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Snippet } from 'src/schema/snippet.schema';
import { CreateSnippetDto } from './dto';

@Injectable()
export class SnippetService {
  constructor(
    @InjectModel(Snippet.name) private readonly snippetModel: Model<Snippet>,
  ) {}

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
}
