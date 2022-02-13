import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import * as React from 'react';
import 'twin.macro';

import { SiteLayout } from '$/blocks/layout';
import { MDXComponents } from '$/blocks/mdx-components';
import { SideBar, SideBarProps } from '$/blocks/side-bar';
import { getAllFileStructures, getDirectories } from '$/server/mdx/files';
import { getMDXPropsBySlug, MDXProps } from '$/server/mdx/mdx';
import { CommonPageProps } from '$/types/page.type';

type DocsProps = MDXProps & Pick<SideBarProps, 'directories'> & CommonPageProps;
const CONTAINER_FOLDER = 'docs';

export default function Docs({ mdxSource, frontMatter, directories = [] }: DocsProps): JSX.Element {
  return (
    <SiteLayout title={frontMatter?.title || 'Docs'}>
      <div tw="min-h-full">
        <section tw="flex flex-row min-h-full space-x-4 -my-2.5">
          <SideBar tw="pt-10" directories={directories} title="Documentation" />
          <article className="prose lg:prose-xl" tw="flex-1 overflow-y-auto">
            <div tw="pt-10">
              {mdxSource && <MDXRemote {...mdxSource} components={MDXComponents} />}
            </div>
          </article>
        </section>
      </div>
    </SiteLayout>
  );
}

type PathParam = {
  slug: string[];
};

export const getStaticPaths: GetStaticPaths<PathParam> = async () => {
  const fileStructures = await getAllFileStructures(CONTAINER_FOLDER);
  const payload = {
    paths: fileStructures.map((f) => ({
      params: {
        slug: [...(f.ancestors || []), f.slug].filter(Boolean),
      },
    })),
    fallback: true,
  };
  return payload;
};

export const getStaticProps: GetStaticProps<DocsProps, PathParam> = async ({ params }) => {
  if (!params?.slug) {
    return { notFound: true };
  }
  const [mdxProps, directories] = await Promise.all([
    getMDXPropsBySlug([CONTAINER_FOLDER, ...params.slug].join('/')),
    getDirectories(CONTAINER_FOLDER, `/${CONTAINER_FOLDER}`),
  ]);

  return {
    props: {
      ...mdxProps,
      directories,
    },
    revalidate: 3600,
  };
};
