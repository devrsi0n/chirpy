import { ssg } from '@chirpy-dev/trpc';
import { Code, Heading, Text } from '@chirpy-dev/ui';
import { getAppURL } from '@chirpy-dev/utils';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import * as React from 'react';

import { PageTitle } from '$/components/page-title';
import { getRecentProjectStaticPathsByDomain } from '$/server/services/project';
import { SiteLayout } from '../../../../components/layout';

export function GetStarttedTitle(): React.ReactNode {
  return (
    <div>
      <Heading as="h2" className="mb-3 font-bold !leading-none">
        Get Started
      </Heading>
      <Text variant="secondary" className="font-normal">
        Integrate the widget into your website to start engaging with your
        users.
      </Text>
    </div>
  );
}

export function GetStartedBody({ domain }: { domain: string }) {
  return (
    <div className="flex flex-col gap-4">
      <Heading as="h3">Usage on any website</Heading>
      <div className="flex flex-col gap-2">
        <Text variant="secondary">
          {`Chirpy is not just your average comment system - it's a feature-packed tool with powerful `}
          <strong>built-in analytics</strong>
          {`. With Chirpy, you can seamlessly integrate the analytics service and save time and effort.`}
        </Text>
        <Text variant="secondary">
          {`Getting started is a breeze. Simply follow these steps:`}
        </Text>
      </div>
      <ol className="flex list-outside list-decimal flex-col gap-6 ps-4">
        <li>
          <div className="space-y-2">
            <Text variant="secondary">
              {`Copy the script provided below and paste it into the body of your HTML, make sure it will be loaded on every page.`}
            </Text>
            <Code language="html">
              {`<script defer src="${getAppURL()}/bootstrapper.js" data-chirpy-domain="${domain}"></script>`}
            </Code>
          </div>
        </li>
        <li>
          <div className="space-y-2">
            <Text variant="secondary">
              {`Then, paste this html element to any page that should render the comment widget:`}
            </Text>
            <Code language="html">{`<!--
  The widget follows "system" settings for light/dark mode
  by default, but you can manually select "light" or "dark"
  mode for a consistent display
-->
<div
  data-chirpy-theme="system"
  data-chirpy-comment="true"
  id="chirpy-comment"
></div>`}</Code>
          </div>
        </li>
        <li>
          <Text variant="secondary">
            {`🎉 Congratulations! The comment widget is ready to go live.`}
          </Text>
        </li>
      </ol>
    </div>
  );
}

export type GetStartedProps = {
  domain: string;
};

export default function GetStarted(props: GetStartedProps): JSX.Element {
  return (
    <SiteLayout title="Get Started">
      <div className="flex flex-col gap-6">
        <PageTitle>Get started</PageTitle>
        <GetStartedBody domain={props.domain} />
      </div>
    </SiteLayout>
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

type StaticProps = GetStartedProps;

export const getStaticProps: GetStaticProps<StaticProps, PathParams> = async ({
  params,
}: GetStaticPropsContext<PathParams>): Promise<
  GetStaticPropsResult<StaticProps>
> => {
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
