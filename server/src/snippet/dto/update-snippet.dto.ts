import { IsString, IsOptional, IsArray, IsMongoId } from 'class-validator';

export class UpdateSnippetDto {
  @IsString({ message: 'Title must be a string' })
  @IsOptional()
  title?: string;

  @IsString({ message: 'Code must be a string' })
  @IsOptional()
  code?: string;

  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;

  @IsMongoId({ message: 'Folder ID must be a valid MongoDB ID' })
  @IsOptional()
  folder?: string;

  @IsString({ message: 'Language must be a string' })
  @IsOptional()
  language?: string;

  @IsArray({ message: 'Tags must be an array' })
  @IsString({ each: true, message: 'Each tag must be a string' })
  @IsOptional()
  tags?: string[];
}
