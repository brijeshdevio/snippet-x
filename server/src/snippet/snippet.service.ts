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
    this.isValidId(snippetId);

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

  async deleteSnippetById(
    createdBy: string,
    snippetId: string,
  ): Promise<Snippet> {
    this.isValidId(snippetId);

    const snippet = await this.snippetModel
      .findOneAndDelete({ createdBy, _id: snippetId })
      .lean()
      .select('-__v -createdBy -createdAt');
    if (snippet) {
      return snippet;
    }

    throw new ForbiddenException(
      'You do not have access to delete this Snippet.',
    );
  }

  async statsSnippet(createdBy: string) {
    // 1. Total count of snippets
    const totalCount = await this.snippetModel.countDocuments({ createdBy });

    // 2. Language usage stats
    const languages = await this.snippetModel.aggregate([
      { $match: { createdBy } },
      {
        $group: {
          _id: '$language',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    // 👉 Distinct language count
    const languageCount = languages.length;

    // 3. Recently created snippets (latest 10)
    const recentSnippets = await this.snippetModel
      .find({ createdBy })
      .lean()
      .select('-__v -createdAt -createdBy -code')
      .sort({ createdAt: -1 })
      .limit(10);

    // 4. Recent 1-week activity (created OR updated)
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const recentActivity = await this.snippetModel.countDocuments({
      createdBy,
      $or: [
        { createdAt: { $gte: oneWeekAgo } },
        { updatedAt: { $gte: oneWeekAgo } },
      ],
    });

    return {
      totalCount,
      languageCount,
      recentSnippets,
      recentActivity,
    };
  }
}
