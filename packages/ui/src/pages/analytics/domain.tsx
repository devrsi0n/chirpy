import * as React from 'react';
import { RouterOutputs } from 'src/utilities/trpc-client';

import { AnalyticsBlock, SiteLayout, PageTitle } from '../../blocks';

export type AnalyticsByDomainPageProps = {
  project: NonNullable<RouterOutputs['project']['byDomain']>;
};

export function AnalyticsByDomainPage({
  project,
}: AnalyticsByDomainPageProps): JSX.Element {
  return (
    <SiteLayout hideFullBleed title="Analytics">
      <section className="mx-auto px-4 xl:max-w-6xl">
        <PageTitle className="pb-6">Analytics</PageTitle>
        <AnalyticsBlock
          site={{
            domain: project.domain,
            offset: '0',
            hasGoals: false,
            insertedAt: String(project.createdAt),
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
    </SiteLayout>
  );
}
