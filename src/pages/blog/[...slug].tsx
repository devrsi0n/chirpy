import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import * as React from 'react';
import 'twin.macro';

import { MDXComponents } from '$/blocks/MDXComponents';
import { Image } from '$/components/Image';
import { useHasMounted } from '$/hooks/useHasMounted';
import { useScript } from '$/hooks/useScript';
import { APP_NAME_LOWERCASE } from '$/lib/constants';
import { getAllFileStructures, getDirectories } from '$/server/mdx/files';
import { getMDXPropsBySlug, MDXProps } from '$/server/mdx/mdx';
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

  useScript(`${process.env.NEXT_PUBLIC_APP_URL}/bootstrap/comment.js`, {
    [`${APP_NAME_LOWERCASE}Pid`]: process.env.NEXT_PUBLIC_COMMENT_PROJECT,
  });

  return (
    <>
      <Head>
        <title>{frontMatter?.title} - Blog</title>
      </Head>
      <>
        <div tw="min-h-full" className="main-container">
          <section tw="flex flex-row py-10 min-h-full space-x-2">
            <article tw="prose lg:prose-xl flex-1 overflow-y-auto">
              {banner && (
                <div tw="pb-10">
                  <Image {...banner} layout="responsive" alt="banner" />
                </div>
              )}
              {mdxSource && <MDXRemote {...mdxSource} components={MDXComponents} />}
            </article>
          </section>
          <div data-totalk-comment="true" tw="mt-16"></div>
        </div>
      </>
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
