import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import * as React from 'react';
import 'twin.macro';

import { PageTitle } from '$/blocks/PageTitle';
import { PageViewChart } from '$/blocks/PageViewChart';
import { Heading } from '$/components/Heading';
import { Link } from '$/components/Link';
import { Text } from '$/components/Text';
import { getAdminApollo } from '$/server/common/admin-apollo';
import {
  ProjectAnalyticsDocument,
  ProjectAnalyticsQuery,
} from '$/server/graphql/generated/project';
import { dayjs, getStartOfSubtractDate } from '$/utilities/date';

export type AnalyticsProps = {
  project: ProjectAnalyticsQuery['projectByPk'];
};

export default function Analytics(props: AnalyticsProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Analytics</title>
      </Head>
      <div tw="py-10" className="main-container">
        <PageTitle tw="pb-6">Analytics</PageTitle>
        <div tw="flex flex-row justify-between pb-4">
          <div tw="flex flex-row items-center space-x-2">
            <Link variant="plain" href={`https://${props.project?.domain}`}>
              <img
                src={`https://www.google.com/s2/favicons?domain=${props.project?.domain}&sz=64`}
                width={32}
                height={32}
                alt={`Favicon of ${props.project?.domain}`}
              />
            </Link>
            <Heading as="h5" tw="font-bold">
              {props.project?.domain}
            </Heading>
          </div>
          <div>
            <Text tw="text-gray-400">{dayjs().format('MM-DD')}</Text>
          </div>
        </div>
        <PageViewChart project={props.project} />
      </div>
    </>
  );
}

Analytics.auth = true;

type PathParam = {
  projectId: string;
};

export const getServerSideProps: GetServerSideProps<AnalyticsProps, PathParam> = async ({
  params,
}) => {
  if (!params?.projectId) {
    return { notFound: true };
  }
  const { projectId } = params;
  const client = getAdminApollo();
  const project = (
    await client.query({
      query: ProjectAnalyticsDocument,
      variables: {
        projectId,
        today: dayjs().toISOString(),
        yesterday: getStartOfSubtractDate(1),
        twoDaysAgo: getStartOfSubtractDate(2),
      },
    })
  ).data.projectByPk;
  if (!project) {
    return { notFound: true };
  }
  return { props: { project, session: await getSession() } };
};
