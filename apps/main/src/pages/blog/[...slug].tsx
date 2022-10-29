import { CommonPageProps, MDXProps } from '@chirpy-dev/types';
import { GetStaticPaths, GetStaticProps } from 'next';

import { getAllFileStructures, getDirectories } from '$/server/mdx/files';
import { getMDXPropsBySlug } from '$/server/mdx/mdx';

type BlogProps = MDXProps;
const CONTAINER_FOLDER = 'blog';

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

export { BlogPost as default } from '@chirpy-dev/ui';
