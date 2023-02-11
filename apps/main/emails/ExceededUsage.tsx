// @ts-ignore
import { SUPPORT_LINK } from '@chirpy-dev/utils/dist';
import { MjmlColumn, MjmlSection } from 'mjml-react';
import React from 'react';

import BaseLayout from './components/base-layout';
import Button from './components/button';
import Footer from './components/footer';
import Header from './components/header';
import Link from './components/link';
import Text from './components/text';

export type ExceededUsageProps = {
  userName?: string | null;
  usage: number;
  usageLimit: number;
  plan: string;
};

export default function ExceededUsage({
  userName,
  usage,
  usageLimit,
  plan,
}: ExceededUsageProps): JSX.Element {
  return (
    <BaseLayout width={500}>
      <Header />
      <MjmlSection>
        <MjmlColumn>
          <Text>Hi {userName || 'there'}!</Text>
          <Text>
            Just wanted to reach out and let you know that your account has
            exceeded the
            <strong> {plan} Plan </strong>
            limit of <strong>{usageLimit} page views</strong>. You have used{' '}
            <strong>{usage} page views</strong> across all your projects in your
            current billing cycle.
          </Text>
          <Text>
            {`All your existing pages will continue to work, and we're still
            collecting data on them, but you'll need to upgrade to view their
            stats, edit them, or publish new content.`}
          </Text>
          <Button href={`https://app.chirpy.dev/billing`}>
            Upgrade my plan
          </Button>
          <Text paddingTop={32}>
            {`Feel free to ignore this email if you don't plan on upgrading, or send an email to `}
            <Link href={SUPPORT_LINK}>Chirpy Support</Link>
            {` if you have any
            questions!`}
          </Text>
        </MjmlColumn>
      </MjmlSection>
      <Footer />
    </BaseLayout>
  );
}
