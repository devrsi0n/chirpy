import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import * as React from 'react';

import { Footer } from '$/blocks/footer';
import { SiteLayout } from '$/blocks/layout';
import { MDXComponents } from '$/blocks/mdx-components';
import { SideBar, SideBarProps } from '$/blocks/side-bar';
import { getAllFileStructures, getDirectories } from '$/server/mdx/files';
import { getMDXPropsBySlug, MDXProps } from '$/server/mdx/mdx';
import { CommonPageProps } from '$/types/page.type';

type DocsProps = MDXProps & Pick<SideBarProps, 'directories'> & CommonPageProps;
const CONTAINER_FOLDER = 'docs';

export default function Docs({
  mdxSource,
  frontMatter,
  directories = [],
}: DocsProps): JSX.Element {
  return (
    <SiteLayout
      title={frontMatter?.title || 'Docs'}
      hideFullBleed
      hideFooter
      styles={{
        container: 'py-0',
      }}
    >
      <div className="flex min-h-full flex-col">
        <section className="flex min-h-full w-full flex-1 flex-row space-x-4">
          <SideBar
            className="pt-10"
            directories={directories}
            title="Documentation"
          />
          <div className="flex-1">
            <article className="prose mx-auto overflow-x-hidden pt-10">
              {mdxSource && (
                <MDXRemote {...mdxSource} components={MDXComponents} />
              )}
            </article>
            <Footer />
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}

type PathParam = {
  slug: string[];
};

export const getStaticPaths: GetStaticPaths<PathParam> = async () => {
  if (process.env.DOCKER) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
  const fileStructures = await getAllFileStructures(CONTAINER_FOLDER);
  return {
    paths: fileStructures.map((f) => ({
      params: {
        slug: [...(f.ancestors || []), f.slug].filter(Boolean),
      },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<DocsProps, PathParam> = async ({
  params,
}) => {
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
