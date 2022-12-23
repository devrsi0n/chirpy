import * as React from 'react';

import { Analytics, SiteLayout, PageTitleDeprecated } from '../../../blocks';
import { ClientOnly } from '../../../components';
import { RouterOutputs } from '../../../utilities/trpc-client';

export type AnalyticsByDomainPageProps = {
  project: NonNullable<RouterOutputs['project']['byDomain']>;
};

export function AnalyticsByDomainPage({
  project,
}: AnalyticsByDomainPageProps): JSX.Element {
  return (
    <SiteLayout hideFullBleed title="Analytics">
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
    </SiteLayout>
  );
}
