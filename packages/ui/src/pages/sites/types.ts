import { Post } from '@chirpy-dev/trpc';

export type PostFields = Pick<
  Post,
  'pageId' | 'title' | 'slug' | 'coverImage'
> & {
  tags: string[];
  lastEditedTime: number;
  /** in minutes */
  readingTime: number;
  author: PostAuthor;
  featured: boolean;
  excerpt?: string;
};

export type PostAuthor = {
  id: string;
  name: string | null;
  image: string | null;
};
