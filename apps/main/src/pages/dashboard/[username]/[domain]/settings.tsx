import { ssg } from '@chirpy-dev/trpc';
import { RouterOutputs } from '@chirpy-dev/trpc/src/client';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import * as React from 'react';

import { PageTitle } from '$/components/page-title';
import { getRecentProjectStaticPathsByDomain } from '$/server/services/project';
import { DeleteProject } from '../../../../components/delete-project';
import { SiteLayout } from '../../../../components/layout';
import { PageIdentifier } from '../../../../components/page-identifier';
import { ProjectInfo } from '../../../../components/project-info';

export type ProjectSettingsProps = {
  project: NonNullable<RouterOutputs['project']['byDomain']>;
  username: string;
};

export default function ProjectSettings(
  props: ProjectSettingsProps,
): JSX.Element {
  const { domain, name, id, queryParameters } = props.project;
  return (
    <SiteLayout title="Project settings">
      <PageTitle>Project settings</PageTitle>
      <ProjectInfo
        id={id}
        domain={domain}
        name={name}
        username={props.username}
      />
      <PageIdentifier
        id={id}
        domain={domain}
        queryParameters={queryParameters}
        username={props.username}
      />
      <DeleteProject domain={domain} name={name} username={props.username} />
    </SiteLayout>
  );
}

type PathParams = {
  domain: string;
  username: string;
};

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const paths = await getRecentProjectStaticPathsByDomain(50);
  return { paths, fallback: 'blocking' };
};

type StaticProps = ProjectSettingsProps;

export const getStaticProps: GetStaticProps<StaticProps, PathParams> = async ({
  params,
}: GetStaticPropsContext<PathParams>): Promise<
  GetStaticPropsResult<StaticProps>
> => {
  if (!params?.domain || !params.username) {
    return { notFound: true };
  }
  const { domain } = params;
  const project = await ssg.project.byDomain.fetch(domain);
  if (!project?.id) {
    return { notFound: true };
  }
  return {
    props: {
      project,
      username: params.username,
    },
    revalidate: 60,
  };
};
