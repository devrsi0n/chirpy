import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import * as React from 'react';
import tw from 'twin.macro';

import { AdminCard } from '$/blocks/admin-card';
import { SiteLayout } from '$/blocks/layout';
import { Text } from '$/components/text';
import { getAdminGqlClient } from '$/lib/admin-gql-client';
import {
  DomainOfProjectsDocument,
  DomainOfProjectsQuery,
} from '$/server/graphql/generated/project';
import { getAllProjectStaticPathsByDomain } from '$/server/services/project';

export default function Admin({ projects }: StaticProps): JSX.Element {
  return (
    <SiteLayout title="Admin">
      {projects?.length ? (
        <div tw="flex flex-row">
          <ul tw="space-y-6 flex-1" aria-label="Project list">
            {projects.map((project) => (
              <li key={project?.id}>
                <AdminCard project={project} />
              </li>
            ))}
          </ul>
          <div tw="flex-1" />
        </div>
      ) : (
        <div tw="py-6">
          <Text>No projects</Text>
        </div>
      )}
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

type StaticProps = {
  projects: DomainOfProjectsQuery['projects'];
};

export const getStaticProps: GetStaticProps<StaticProps, PathParams> = async ({
  params,
}: GetStaticPropsContext<PathParams>): Promise<GetStaticPropsResult<StaticProps>> => {
  if (!params?.domain) {
    return { notFound: true };
  }
  const { domain } = params;
  const client = getAdminGqlClient();
  const { data } = await client
    .query<DomainOfProjectsQuery>(DomainOfProjectsDocument, {
      domain,
    })
    .toPromise();

  if (!data?.projects) {
    return { notFound: true };
  }
  return {
    props: { projects: data.projects },
  };
};
