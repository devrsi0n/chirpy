import { Directory } from '@chirpy-dev/types';
import { GetStaticProps } from 'next';

import { getDirectories } from '$/server/mdx/files';

const CONTAINER_FOLDER = 'blog';

export type BlogHomeProps = {
  directories: Directory[];
};

export const getStaticProps: GetStaticProps<BlogHomeProps> = async () => {
  const directories = await getDirectories(
    CONTAINER_FOLDER,
    `/${CONTAINER_FOLDER}`,
  );
  return {
    props: {
      directories,
    },
    revalidate: 3600,
  };
};

export { BlogHome as default } from '@chirpy-dev/ui';
