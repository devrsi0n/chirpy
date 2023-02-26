export type PostFields = {
  pageId: string;
  title: string;
  coverImage: string;
  tags: string[];
  lastEditedTime: number;
  /** in minutes */
  readingTime: number;
  author: PostAuthor;
  featured: boolean;
  slug: string;
  excerpt?: string;
};

export type PostAuthor = {
  id: string;
  name: string | null;
  image: string | null;
};
