import { RouterOutputs } from '@chirpy-dev/trpc/src/client';
import * as React from 'react';

import { PageTitle, SiteLayout } from '../../../blocks';
import { DeleteProject } from './delete-project';
import { PageIdentifier } from './page-identifier';

export type ProjectSettingsProps = {
  project: NonNullable<RouterOutputs['project']['byDomain']>;
};

export function ProjectSettings(props: ProjectSettingsProps): JSX.Element {
  const { domain, name, id, queryParameters } = props.project;
  return (
    <SiteLayout title="Project settings">
      <PageTitle>Project settings</PageTitle>
      <PageIdentifier
        id={id}
        domain={domain}
        queryParameters={queryParameters}
      />
      <DeleteProject domain={domain} name={name} />
    </SiteLayout>
  );
}
