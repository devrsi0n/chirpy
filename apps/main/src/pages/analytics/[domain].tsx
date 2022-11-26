import { ProjectByDomainDocument } from '@chirpy-dev/graphql';
import { CommonPageProps } from '@chirpy-dev/types';
import { AnalyticsByDomainPageProps } from '@chirpy-dev/ui';
import { GetStaticPaths, GetStaticProps } from 'next';

import { query } from '$/server/common/gql';
import { getRecentProjectStaticPathsByDomain } from '$/server/services/project';

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
  const paths = await getRecentProjectStaticPathsByDomain(50);

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<
  AnalyticsByDomainPageProps & CommonPageProps,
  PathParams
> = async ({ params }) => {
  if (!params?.domain) {
    return { notFound: true };
  }
  const { domain } = params;
  const projects = await query(
    ProjectByDomainDocument,
    {
      domain,
    },
    'projects',
  );
  const [project] = projects;
  if (!project.domain) {
    return { notFound: true };
  }

  return {
    props: {
      project: project,
    },
    revalidate: 60 * 60,
  };
};

export { AnalyticsByDomainPage as default } from '@chirpy-dev/ui';
