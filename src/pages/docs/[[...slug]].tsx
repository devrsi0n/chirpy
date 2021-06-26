import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import * as React from 'react';
import 'twin.macro';

import { MDXComponents } from '$/blocks/MDXComponents';
import { SideBar, SideBarProps } from '$/blocks/SideBar';
import { Layout } from '$/components/Layout';
import { getAllFileStructures, getDirectories } from '$/server/mdx/files';
import { getMDXPropsBySlug, MDXProps } from '$/server/mdx/mdx';

type DocsProps = MDXProps & Pick<SideBarProps, 'directories'>;
const CONTAINER_FOLDER = 'docs';

export default function Docs({ mdxSource, frontMatter, directories = [] }: DocsProps): JSX.Element {
  return (
    <>
      <Head>
        <title>{frontMatter?.title} - Docs</title>
      </Head>
      <Layout noContainer noFooter>
        <div tw="min-h-full" className="main-container">
          <section tw="flex flex-row min-h-full space-x-4 -my-2.5">
            <SideBar tw="pt-10" directories={directories} title="Documentation" />
            <article tw="prose lg:prose-xl flex-1 overflow-y-auto">
              <div tw="pt-10">
                {mdxSource && <MDXRemote {...mdxSource} components={MDXComponents} />}
              </div>
            </article>
          </section>
        </div>
      </Layout>
    </>
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

  return { props: { ...mdxProps, directories }, revalidate: 3600 };
};
