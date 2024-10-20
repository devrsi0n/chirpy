import { CommonPageProps, MDXProps } from '@chirpy-dev/types';
import { getBannerProps, Image, useHasMounted } from '@chirpy-dev/ui';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import * as React from 'react';

import { CommentWidget } from '$/components/comment-widget';
import { getAllFileStructures, getDirectories } from '$/server/mdx/files';
import { getMDXPropsBySlug } from '$/server/mdx/mdx';
import { SiteLayout } from '../../components/layout';
import { MDXComponents } from '../../components/mdx-components';

type BlogProps = MDXProps;
const CONTAINER_FOLDER = 'blog';

type PathParam = {
  slug: string[];
};

export const getStaticPaths: GetStaticPaths<PathParam> = async () => {
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

export const getStaticProps: GetStaticProps<
  BlogProps & CommonPageProps,
  PathParam
> = async ({ params }) => {
  if (!params?.slug) {
    return { notFound: true };
  }
  // log.debug({ slug: params.slug });
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

export default function BlogPost({
  mdxSource,
  frontMatter,
}: BlogProps): JSX.Element {
  const hasMounted = useHasMounted();
  const banner = React.useMemo(() => {
    if (frontMatter?.banner && hasMounted) {
      return getBannerProps(frontMatter.banner);
    }
  }, [frontMatter?.banner, hasMounted]);

  return (
    <SiteLayout title={frontMatter?.title || 'Blog'}>
      <section className="flex flex-row space-x-2">
        <article className="prose flex-1 overflow-y-auto">
          {banner && (
            <div className="pb-10">
              <Image {...banner} layout="responsive" alt="banner" />
            </div>
          )}
          {mdxSource && <MDXRemote {...mdxSource} components={MDXComponents} />}
        </article>
      </section>
      <CommentWidget />
    </SiteLayout>
  );
}
