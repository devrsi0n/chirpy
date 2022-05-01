import { GetStaticPaths, GetStaticProps } from 'next';
import * as React from 'react';

import { AnalyticsBlock } from '$/blocks/analytics';
import { SiteLayout } from '$/blocks/layout';
import { PageTitle } from '$/blocks/page-title';
import { gqlQuery } from '$/server/common/gql';
import { ProjectByDomainDocument, ProjectByDomainQuery } from '$/server/graphql/generated/project';
import { getAllProjectStaticPathsByDomain } from '$/server/services/project';
import { CommonPageProps } from '$/types/page.type';

export type AnalyticsProps = {
  project: ProjectByDomainQuery['projects'][number];
};

export default function Analytics({ project }: AnalyticsProps): JSX.Element {
  return (
    <SiteLayout hideFullBleed title="Analytics">
      <section className="xl:max-width[70rem] mx-auto px-4">
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
  const paths = await getAllProjectStaticPathsByDomain();

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<AnalyticsProps & CommonPageProps, PathParams> = async ({
  params,
}) => {
  if (!params?.domain) {
    return { notFound: true };
  }
  const { domain } = params;
  const projects = await gqlQuery(
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
