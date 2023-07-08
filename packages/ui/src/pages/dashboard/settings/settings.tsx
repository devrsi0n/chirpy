import * as React from 'react';

import { PageTitle, SiteLayout } from '../../../blocks';
import { DeleteProject } from './delete-project';
import { PageIdentifier } from './page-identifier';

export type ProjectSettingsProps = {
  domain: string;
  name: string;
  id: string;
};

export function ProjectSettings({
  domain,
  name,
  id,
}: ProjectSettingsProps): JSX.Element {
  return (
    <SiteLayout title="Project settings">
      <PageTitle>Project settings</PageTitle>
      <PageIdentifier id={id} />
      <DeleteProject domain={domain} name={name} />
    </SiteLayout>
  );
}
