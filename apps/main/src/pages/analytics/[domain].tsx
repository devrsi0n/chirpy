import { GetStaticPaths, GetStaticProps } from 'next';

import { AnalyticsByDomainPage, AnalyticsByDomainPageProps } from 'ui';
import { query } from '$/server/common/gql';
import { ProjectByDomainDocument } from '@chirpy-dev/graphql';
import { getAllProjectStaticPathsByDomain } from '$/server/services/project';
import { CommonPageProps } from 'types';

export default AnalyticsByDomainPage;

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
  // TODO: only generated a subset of analytics pages
  const paths = await getAllProjectStaticPathsByDomain();

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
