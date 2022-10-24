import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';

import { ThemePage, ThemeProps } from 'ui';
import { query } from '$/server/common/gql';
import { ThemeProjectByPkDocument } from '@chirpy-dev/graphql';
import { getAllProjectStaticPathsByDomain } from '$/server/services/project';

export default ThemePage;

type PathParams = {
  domain: string;
};

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  if (process.env.DOCKER) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
  // TODO: only generated a subset of theme pages to improve build perf
  const paths = await getAllProjectStaticPathsByDomain();

  return { paths, fallback: 'blocking' };
};

type StaticProps = ThemeProps;

export const getStaticProps: GetStaticProps<StaticProps, PathParams> = async ({
  params,
}: GetStaticPropsContext<PathParams>): Promise<
  GetStaticPropsResult<StaticProps>
> => {
  if (!params?.domain) {
    return { notFound: true };
  }
  const { domain } = params;
  const projects = await query(
    ThemeProjectByPkDocument,
    {
      domain,
    },
    'projects',
  );

  if (!projects || !projects[0]) {
    return { notFound: true };
  }
  return {
    props: { project: projects[0], buildDate: new Date().toISOString() },
    revalidate: 60 * 60,
  };
};
