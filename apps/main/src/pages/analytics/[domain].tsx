import { GetStaticPaths, GetStaticProps } from 'next';
import * as React from 'react';

import { AnalyticsBlock, SiteLayout, PageTitle } from 'ui';
import { query } from '$/server/common/gql';
import {
  ProjectByDomainDocument,
  ProjectByDomainQuery,
} from '@chirpy-dev/graphql';
import { getAllProjectStaticPathsByDomain } from '$/server/services/project';
import { CommonPageProps } from 'types';

export type AnalyticsProps = {
  project: ProjectByDomainQuery['projects'][number];
};

export default function Analytics({ project }: AnalyticsProps): JSX.Element {
  return (
    <SiteLayout hideFullBleed title="Analytics">
      <section className="mx-auto px-4 xl:max-w-6xl">
        <PageTitle className="pb-6">Analytics</PageTitle>
        <AnalyticsBlock
          site={{
            domain: project?.domain,
            offset: '0',
            hasGoals: false,
            insertedAt: project?.createdAt,
            embedded: true,
            background: '',
            selfhosted: true,
            cities: false,
          }}
          stuck={false}
          loggedIn={true}
          currentUserRole="owner"
        />
      </section>
    </SiteLayout>
  );
}

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
  AnalyticsProps & CommonPageProps,
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
