import { GetStaticPaths, GetStaticProps } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import * as React from 'react';
import 'twin.macro';

import { AnalyticsBlock } from '$/blocks/Analytics';
import { PageTitle } from '$/blocks/PageTitle';
import { getAdminApollo } from '$/server/common/admin-apollo';
import { ProjectByDomainDocument, ProjectByDomainQuery } from '$/server/graphql/generated/project';
import { getAllProjectStaticPathsByDomain } from '$/server/services/project';
import { CommonPageProps } from '$/types/page.type';

export type AnalyticsProps = {
  project: ProjectByDomainQuery['projects'][0];
};

export default function Analytics(props: AnalyticsProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Analytics</title>
      </Head>
      <section tw="xl:max-width[70rem] mx-auto px-4">
        <PageTitle tw="pb-6">Analytics</PageTitle>
        <AnalyticsBlock
          site={{
            domain: props.project?.domain!,
            offset: '0',
            hasGoals: false,
            insertedAt: props.project?.createdAt!,
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
    </>
  );
}

Analytics.auth = true;

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
  const client = getAdminApollo();
  const {
    data: { projects },
  } = await client.query<ProjectByDomainQuery>({
    query: ProjectByDomainDocument,
    variables: {
      domain,
    },
  });
  if (!projects || !projects[0]) {
    return { notFound: true };
  }
  const session = await getSession();
  return {
    props: {
      project: projects[0],
      session: session!,
      layoutProps: {
        hideFullBleed: true,
      },
    },
    revalidate: 1,
  };
};
