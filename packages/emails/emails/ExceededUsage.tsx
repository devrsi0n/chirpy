import { MjmlColumn, MjmlSection } from 'mjml-react';
import React from 'react';

import BaseLayout from './components/base-layout';
import Button from './components/button';
import Footer from './components/footer';
import Header from './components/header';
import Text from './components/text';

type UsageExceededProps = {
  userName: string;
  usage: number;
  usageLimit: number;
  type: 'first' | 'second';
  plan: string;
};

export default function UsageExceeded({
  userName,
  usage,
  usageLimit,
  type,
  plan,
}: UsageExceededProps): JSX.Element {
  return (
    <BaseLayout width={500}>
      <Header />
      <MjmlSection>
        <MjmlColumn>
          <Text>Hey {userName}!</Text>
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
            {'To respect your inbox, '}
            {type === 'first'
              ? 'we will only send you one more email about this in 3 days'
              : "this will be the last time we'll email you about this"}
            {`. Feel free to ignore this email if you don't plan on upgrading, or
            reply to let us know if you have any questions!`}
          </Text>
        </MjmlColumn>
      </MjmlSection>
      <Footer />
    </BaseLayout>
  );
}
