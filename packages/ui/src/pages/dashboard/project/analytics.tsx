import {
  AnalyticsProvider,
  ErrorModal,
  Header,
  Widgets,
} from '@chirpy-dev/analytics';
import Head from 'next/head';
import * as React from 'react';

import { PageTitle, SiteLayout } from '../../../blocks';

export type AnalyticsByDomainPageProps = {
  domain: string;
};

export function AnalyticsByDomainPage({
  domain,
}: AnalyticsByDomainPageProps): JSX.Element {
  return (
    <>
      <Head>
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link href="/css/analytics.css" rel="stylesheet" />
      </Head>
      <SiteLayout hideFullBleed title="Analytics">
        <AnalyticsProvider domain={domain}>
          <section className="mx-auto px-4 xl:max-w-6xl" id="ats">
            <PageTitle className="pb-6">Analytics</PageTitle>

            <div className="bg-body text-secondary min-h-screen py-5 text-sm leading-5">
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
