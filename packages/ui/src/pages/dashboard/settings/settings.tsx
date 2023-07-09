import { RouterOutputs } from '@chirpy-dev/trpc/src/client';
import * as React from 'react';

import { PageTitle, SiteLayout } from '../../../blocks';
import { DeleteProject } from './delete-project';
import { PageIdentifier } from './page-identifier';
import { ProjectInfo } from './project-info';

export type ProjectSettingsProps = {
  project: NonNullable<RouterOutputs['project']['byDomain']>;
  username: string;
};

export function ProjectSettings(props: ProjectSettingsProps): JSX.Element {
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
