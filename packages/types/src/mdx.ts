import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import readingTime from 'reading-time';

export type MDXProps = {
  mdxSource: MDXRemoteSerializeResult;
  frontMatter: {
    wordCount: number;
    readingTime: ReturnType<typeof readingTime>;
    slug: string | null;
    [key: string]: $TsAny;
  };
};