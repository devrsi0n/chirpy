import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import Script from 'next/script';
import * as React from 'react';
import 'twin.macro';

import { SiteLayout } from '$/blocks/layout';
import { MDXComponents } from '$/blocks/mdx-components';
import { Image } from '$/components/image';
import { useHasMounted } from '$/hooks/use-has-mounted';
import { getAllFileStructures, getDirectories } from '$/server/mdx/files';
import { getMDXPropsBySlug, MDXProps } from '$/server/mdx/mdx';
import { isENVDev } from '$/server/utilities/env';
import { CommonPageProps } from '$/types/page.type';
import { getBannerProps } from '$/utilities/image';

type BlogProps = MDXProps;
const CONTAINER_FOLDER = 'blog';

export default function Blog({ mdxSource, frontMatter }: BlogProps): JSX.Element {
  const hasMounted = useHasMounted();
  const banner = React.useMemo(() => {
    if (frontMatter?.banner && hasMounted) {
      return getBannerProps(frontMatter.banner);
    }
  }, [frontMatter?.banner, hasMounted]);

  return (
    <SiteLayout title={frontMatter?.title || 'Blog'}>
      <section tw="flex flex-row space-x-2">
        <article tw="prose lg:prose-xl flex-1 overflow-y-auto">
          {banner && (
            <div tw="pb-10">
              <Image {...banner} layout="responsive" alt="banner" />
            </div>
          )}
          {mdxSource && <MDXRemote {...mdxSource} components={MDXComponents} />}
        </article>
      </section>
      <div data-chirpy-comment tw="my-16" />
      <Script
        src="/bootstrap/comment.js"
        strategy={isENVDev ? 'afterInteractive' : 'beforeInteractive'}
        data-chirpy-domain={process.env.NEXT_PUBLIC_COMMENT_DOMAIN}
      />
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

export const getStaticProps: GetStaticProps<BlogProps & CommonPageProps, PathParam> = async ({
  params,
}) => {
  if (!params?.slug) {
    return { notFound: true };
  }
  // console.log({ slug: params.slug });
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
