import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import * as React from 'react';
import 'twin.macro';

import { MDXComponents } from '$/blocks/MDXComponents';
import { SideBar, SideBarProps } from '$/blocks/SideBar';
import { Layout } from '$/components/Layout';

import { getAllFileStructures, getDirectories } from '$shared/files';
import { getMDXPropsBySlug, MDXProps } from '$shared/mdx';

type DocsProps = MDXProps & Pick<SideBarProps, 'directories'>;
const DOCS = 'docs';

export default function Docs({ mdxSource, frontMatter, directories = [] }: DocsProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Docs•{frontMatter?.title}</title>
      </Head>
      <Layout noContainer noFooter>
        <div tw="min-h-full" className="main-container">
          <section tw="flex flex-row py-10 min-h-full space-x-2">
            <SideBar directories={directories} title="Documentation" />
            <article tw="prose lg:prose-xl flex-1 overflow-y-auto">
              {mdxSource && <MDXRemote {...mdxSource} components={MDXComponents} />}
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
  const fileStructures = await getAllFileStructures(DOCS);
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
    getMDXPropsBySlug([DOCS, ...params.slug].join('/')),
    getDirectories(DOCS, `/${DOCS}`),
  ]);

  return { props: { ...mdxProps, directories }, revalidate: 3600 };
};
