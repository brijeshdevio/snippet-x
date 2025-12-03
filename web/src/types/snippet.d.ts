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
  search?: string;
  language?: string;
  tag?: string;
}
