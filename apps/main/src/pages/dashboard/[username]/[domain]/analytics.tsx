import {
  AnalyticsProvider,
  ErrorModal,
  Header,
  Widgets,
} from '@chirpy-dev/analytics';
import { ssg } from '@chirpy-dev/trpc';
import { CommonPageProps } from '@chirpy-dev/types';
import { PageTitle, SiteLayout } from '@chirpy-dev/ui';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import * as React from 'react';

import { getRecentProjectStaticPathsByDomain } from '$/server/services/project';

export type AnalyticsByDomainPageProps = {
  domain: string;
};

// Have to move page here to fix cyclic dependencies between ui & analytics packages
export default function AnalyticsByDomainPage({
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

type PathParams = {
  domain: string;
  username: string;
};

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const paths = await getRecentProjectStaticPathsByDomain(50);

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<
  AnalyticsByDomainPageProps & CommonPageProps,
  PathParams
> = async ({ params }) => {
  if (!params?.domain || !params?.username) {
    return { notFound: true };
  }
  const { domain } = params;
  const project = await ssg.project.byDomain.fetch(domain);
  if (!project?.id) {
    return { notFound: true };
  }

  return {
    props: {
      domain,
    },
    revalidate: 60 * 60,
  };
};
