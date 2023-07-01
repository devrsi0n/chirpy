import { trpcClient } from '@chirpy-dev/trpc/src/client';
import { DehydratedState } from '@tanstack/react-query';
import clsx from 'clsx';
import * as React from 'react';

import { PageTitle, SiteLayout } from '../../blocks';

export type ProjectProps = {
  domain: string;
  trpcState: DehydratedState;
};

export function Project(props: ProjectProps): JSX.Element {
  const { data: project } = trpcClient.project.byDomain.useQuery(props.domain);
  return (
    <SiteLayout title="Project">
      <PageTitle>{project?.name}</PageTitle>
    </SiteLayout>
  );
}
