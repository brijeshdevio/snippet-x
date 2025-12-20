export interface CreateSnippetType {
  title: string;
  language: string;
  code: string;
  description: string;
  tags: string[];
}

export interface SnippetCardType {
  _id: string;
  title: string;
  language: string;
  description: string;
  updatedAt: string;
  tags: string[];
}

export interface SnippetType {
  _id: string;
  title: string;
  language: string;
  code: string;
  description: string;
  updatedAt: string;
  tags: string[];
}

export interface SnippetQuery {
  folder?: string;
  search?: string;
  language?: string;
  tag?: string;
  page?: number;
  limit?: number;
}

export interface SnippetsType {
  snippets: SnippetCardType[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface GenerateSnippet {
  prompt: string;
  language: string;
}

export interface ContentType {
  language?: string;
  snippet?: string;
  title?: string;
}
