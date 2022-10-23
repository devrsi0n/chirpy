import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import * as React from 'react';

import {
  CommentWidget,
  SiteLayout,
  MDXComponents,
  Image,
  useHasMounted,
} from 'ui';
import { getAllFileStructures, getDirectories } from '$/server/mdx/files';
import { getMDXPropsBySlug, MDXProps } from '$/server/mdx/mdx';
import { CommonPageProps } from 'types';
import { getBannerProps } from '$/utilities/image';

type BlogProps = MDXProps;
const CONTAINER_FOLDER = 'blog';

export default function Blog({
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
