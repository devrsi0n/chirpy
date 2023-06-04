import {
  AnalyticsProvider,
  Credentials,
  ErrorModal,
  Footer,
  Header,
  Meta,
  Widgets,
  useAuth,
} from '@chirpy-dev/analytics';
import Head from 'next/head';
import * as React from 'react';

import { SiteLayout, PageTitle } from '../../blocks';
import { RouterOutputs } from '../../utilities/trpc-client';

export type AnalyticsByDomainPageProps = {
  project: NonNullable<RouterOutputs['project']['byDomain']>;
};

export function AnalyticsByDomainPage({
  project,
}: AnalyticsByDomainPageProps): JSX.Element {
  return (
    <>
      <Head>
        <link href="/css/analytics.css" rel="stylesheet" />
      </Head>
      <SiteLayout hideFullBleed title="Analytics">
        <AnalyticsProvider>
          <section className="mx-auto px-4 xl:max-w-6xl" id="ats">
            <PageTitle className="pb-6">Analytics</PageTitle>

            {/* <Meta /> */}
            <div className="bg-body text-secondary min-h-screen px-5 py-5 text-sm leading-5 sm:px-10">
              <div className="mx-auto max-w-7xl">
                <div className="space-y-6 sm:space-y-10">
                  <Header />
                  <section>
                    <ErrorModal />
                    <Widgets />
                  </section>
                </div>
              </div>
            </div>
          </section>
        </AnalyticsProvider>
      </SiteLayout>
    </>
  );
}
