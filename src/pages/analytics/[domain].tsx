import { GetStaticPaths, GetStaticProps } from 'next';
import { getSession } from 'next-auth/react';
import * as React from 'react';
import 'twin.macro';

import { AnalyticsBlock } from '$/blocks/analytics';
import { SiteLayout } from '$/blocks/layout';
import { PageTitle } from '$/blocks/page-title';
import { getAdminGqlClient } from '$/lib/admin-gql-client';
import { ProjectByDomainDocument, ProjectByDomainQuery } from '$/server/graphql/generated/project';
import { getAllProjectStaticPathsByDomain } from '$/server/services/project';
import { CommonPageProps } from '$/types/page.type';

export type AnalyticsProps = {
  project: ProjectByDomainQuery['projects'][0];
};

export default function Analytics(props: AnalyticsProps): JSX.Element {
  return (
    <SiteLayout hideFullBleed title="Analytics">
      <section tw="xl:max-width[70rem] mx-auto px-4">
        <PageTitle tw="pb-6">Analytics</PageTitle>
        <AnalyticsBlock
          site={{
            domain: props.project.domain,
            offset: '0',
            hasGoals: false,
            insertedAt: props.project.createdAt,
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
  const client = getAdminGqlClient();
  const { data } = await client
    .query<ProjectByDomainQuery>(ProjectByDomainDocument, {
      domain,
    })
    .toPromise();
  if (!data?.projects?.[0]) {
    return { notFound: true };
  }
  const session = await getSession();
  if (!session) {
    throw new Error(`Can't find the session for domain ${domain}`);
  }
  return {
    props: {
      project: data.projects[0],
      session: session,
    },
    revalidate: 1,
  };
};
