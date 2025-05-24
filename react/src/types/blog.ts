export type BlogCategory = 'software-engineer' | 'other';

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  category: BlogCategory;
  date: string;
  updatedDate?: string;
  tags?: string[];
  content: string;
  image?: string;
}

export interface BlogPostMetadata extends Omit<BlogPost, 'content'> {}