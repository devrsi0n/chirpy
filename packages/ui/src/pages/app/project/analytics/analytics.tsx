import * as React from 'react';

import { Analytics, PageTitleDeprecated } from '../../../../blocks';
import { ClientOnly } from '../../../../components';
import { RouterOutputs } from '../../../../utilities/trpc-client';
import { AppLayout } from '../../components/app-layout';

export type ProjectAnalyticsProps = {
  project: NonNullable<RouterOutputs['project']['byDomain']>;
};

export function ProjectAnalytics({
  project,
}: ProjectAnalyticsProps): JSX.Element {
  return (
    <AppLayout title="Analytics">
      <section className="mx-auto px-4 xl:max-w-6xl">
        <PageTitleDeprecated className="pb-6">Analytics</PageTitleDeprecated>
        <ClientOnly>
          <Analytics
            site={{
              domain: project.domain,
              offset: '0',
              hasGoals: false,
              insertedAt: project.createdAt.toISOString(),
              embedded: true,
              background: '',
              selfhosted: true,
              cities: false,
            }}
            stuck={false}
            loggedIn={true}
            currentUserRole="owner"
          />
        </ClientOnly>
      </section>
    </AppLayout>
  );
}
