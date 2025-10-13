import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SnippetDocument = HydratedDocument<Snippet>;

@Schema({ timestamps: true })
export class Snippet {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  code: string;

  @Prop({ type: String, required: true, default: 'JavaScript' })
  language: string;

  @Prop({ type: [String] })
  tags: string[];

  @Prop({ type: String })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;
}

export const SnippetSchema = SchemaFactory.createForClass(Snippet);
