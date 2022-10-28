import { promises as fs } from 'fs';
import { MDXProps } from '@chirpy-dev/types';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings, {
  Options as AutolinkHeadingsOptions,
} from 'rehype-autolink-headings';
import rehypePrettyCode, { Options } from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';

import { POST_ROOT } from '../common/constants';
import { getFrontMatters } from './front-matter';

export async function getMDXPropsBySlug(slug: string): Promise<MDXProps> {
  const { data, content } = await getFrontMatters(
    path.join(POST_ROOT, `${slug}.mdx`),
  );
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        [rehypePrettyCode, PRETTY_CODE_OPTIONS],
        // @ts-ignore
        rehypeSlug,
        // @ts-ignore
        [rehypeAutolinkHeadings, AUTO_LINK_HEADINGS_OPTIONS],
      ],
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

export async function getAllFilesFrontMatter(
  subFolder: string,
): Promise<FrontMatterData[]> {
  const files = await fs.readdir(path.join(POST_ROOT, subFolder));

  return Promise.all(
    files.map(async (postSlug: string) => {
      const { data } = await getFrontMatters(
        path.join(POST_ROOT, subFolder, postSlug),
      );

      return {
        ...data,
        slug: postSlug.replace('.mdx', ''),
      };
    }),
  );
}

const PRETTY_CODE_OPTIONS: Partial<Options> = {
  // Use one of Shiki's packaged themes
  theme: 'dracula',
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
  },
  // Feel free to add classNames that suit your docs
  onVisitHighlightedLine(node) {
    node.properties.className.push('highlighted');
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ['word'];
  },
};

const AUTO_LINK_HEADINGS_OPTIONS: Partial<AutolinkHeadingsOptions> = {
  behavior: 'append',
};
