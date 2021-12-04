import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import * as React from 'react';
import 'twin.macro';

import { Realtime } from '$/blocks/Analytics';
import { PageTitle } from '$/blocks/PageTitle';
import { getAdminApollo } from '$/server/common/admin-apollo';
import {
  ProjectAnalyticsDocument,
  ProjectAnalyticsQuery,
} from '$/server/graphql/generated/project';
import { CommonPageProps } from '$/types/page.type';

export type AnalyticsProps = {
  project: ProjectAnalyticsQuery['projectByPk'];
};

export default function Analytics(props: AnalyticsProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Analytics</title>
      </Head>
      <section tw="xl:max-width[70rem] mx-auto px-4">
        <PageTitle tw="pb-6">Analytics</PageTitle>

        <Realtime
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

type PathParam = {
  projectId: string;
};

export const getServerSideProps: GetServerSideProps<AnalyticsProps & CommonPageProps, PathParam> =
  async ({ params }) => {
    if (!params?.projectId) {
      return { notFound: true };
    }
    const { projectId } = params;
    const client = getAdminApollo();
    const {
      data: { projectByPk: project },
    } = await client.query<ProjectAnalyticsQuery>({
      query: ProjectAnalyticsDocument,
      variables: {
        projectId,
      },
    });
    if (!project) {
      return { notFound: true };
    }
    const session = await getSession();
    return {
      props: {
        project,
        session: session!,
        layoutProps: {
          hideFullBleed: true,
        },
      },
    };
  };
