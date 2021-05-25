import { promises as fs } from 'fs';
import mdxPrism from 'mdx-prism';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';
import readingTime from 'reading-time';

import { POST_ROOT } from './constants';
import { getFrontMatters } from './front-matter';

export type MDXProps = {
  mdxSource: MDXRemoteSerializeResult;
  frontMatter: {
    wordCount: number;
    readingTime: ReturnType<typeof readingTime>;
    slug: string | null;
    [key: string]: $TsAny;
  };
};

export async function getMDXPropsBySlug(slug: string): Promise<MDXProps> {
  const { data, content } = await getFrontMatters(path.join(POST_ROOT, `${slug}.mdx`));
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        // require('remark-autolink-headings'),
        // require('remark-slug'),
        // require('remark-code-titles')
      ],
      rehypePlugins: [mdxPrism],
    },
  });

  return {
    mdxSource,
    frontMatter: {
      wordCount: content.split(/\s+/gu).length,
      readingTime: readingTime(content),
      slug: slug || null,
      ...data,
    },
  };
}

export type FrontMatterData = {
  slug: string;
  [key: string]: $TsAny;
};

export async function getAllFilesFrontMatter(subFolder: string): Promise<FrontMatterData[]> {
  const files = await fs.readdir(path.join(POST_ROOT, subFolder));

  return Promise.all(
    files.map(async (postSlug: string) => {
      const { data } = await getFrontMatters(path.join(POST_ROOT, subFolder, postSlug));

      return {
        ...data,
        slug: postSlug.replace('.mdx', ''),
      };
    }),
  );
}
