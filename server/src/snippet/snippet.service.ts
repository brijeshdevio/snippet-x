import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Snippet } from '../schema/snippet.schema';
import { CreateSnippetDto, QueryDto, UpdateSnippetDto } from './dto';
import { GetSnippetsType } from '../types';

@Injectable()
export class SnippetService {
  constructor(
    @InjectModel(Snippet.name) private readonly snippetModel: Model<Snippet>,
  ) {}

  defaultQuery: QueryDto = {
    folder: '',
    search: '',
    language: '',
    tag: '',
    page: '1',
    limit: '10',
  };

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
    if (data.folder) {
      this.isValidId(data.folder);
    }
    const newSnippet = await this.snippetModel.create({
      createdBy,
      ...data,
    });
    return newSnippet;
  }

  async getSnippets(
    createdBy: string,
    queries: QueryDto = this.defaultQuery,
  ): Promise<GetSnippetsType> {
    const query: Record<string, any> = { createdBy };
    const queryList: Record<string, any>[] = [];
    const page = parseInt(queries.page) || 1;
    const limit = parseInt(queries.limit) || 10;

    if (queries?.search) {
      queryList.push({
        title: {
          $regex: queries.search,
          $options: 'i',
        },
      });
    }

    if (queries?.language) {
      queryList.push({
        language: {
          $regex: queries.language,
          $options: 'i',
        },
      });
    }

    if (queries?.tag) {
      queryList.push({
        tags: queries.tag,
      });
    }

    if (queryList.length > 0) {
      query.$and = queryList;
    }

    if (queries?.folder) {
      this.isValidId(queries.folder);
      query.folder = queries.folder;
    }

    const skip = (page - 1) * limit;

    const snippets = await this.snippetModel
      .find(query)
      .lean()
      .select('-__v -createdBy -createdAt -code')
      .populate('folder', 'name')
      .skip(skip)
      .limit(limit);
    const total = await this.snippetModel.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    return {
      snippets,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
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

    if (data.folder) {
      this.isValidId(data.folder);
    }

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
