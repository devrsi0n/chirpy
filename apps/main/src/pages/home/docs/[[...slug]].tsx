import { DocsProps } from '@chirpy-dev/ui';
import { GetStaticPaths, GetStaticProps } from 'next';

import { getAllFileStructures, getDirectories } from '$/server/mdx/files';
import { getMDXPropsBySlug, getNearNav } from '$/server/mdx/mdx';

const CONTAINER_FOLDER = 'docs';

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
  // Render the welcome doc in index page
  const slug = params?.slug || ['welcome'];
  const [mdxProps, directories, nearNav] = await Promise.all([
    getMDXPropsBySlug([CONTAINER_FOLDER, ...slug].join('/')),
    getDirectories(CONTAINER_FOLDER, `/${CONTAINER_FOLDER}`),
    getNearNav(CONTAINER_FOLDER, slug.join('/')),
  ]);

  return {
    props: {
      ...mdxProps,
      directories,
      nearNav,
    },
    revalidate: 3600,
  };
};

export { Docs as default } from '@chirpy-dev/ui';
