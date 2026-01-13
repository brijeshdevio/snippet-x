import { Snippet } from '../schema/snippet.schema';

export interface GetSnippetsType {
  snippets: Snippet[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
