import { GetStaticProps } from 'next';

import { BlogHome } from 'ui';
import { getDirectories } from '$/server/mdx/files';
import { Directory } from 'types';

const CONTAINER_FOLDER = 'blog';

export type BlogHomeProps = {
  directories: Directory[];
};

export default  BlogHome

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
