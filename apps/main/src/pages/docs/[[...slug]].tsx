import { GetStaticPaths, GetStaticProps } from 'next';

import { SideBarProps } from 'ui';
import { getAllFileStructures, getDirectories } from '$/server/mdx/files';
import { getMDXPropsBySlug } from '$/server/mdx/mdx';
import { CommonPageProps, MDXProps } from 'types';

type DocsProps = MDXProps & Pick<SideBarProps, 'directories'> & CommonPageProps;
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

export { Docs as default } from 'ui';
