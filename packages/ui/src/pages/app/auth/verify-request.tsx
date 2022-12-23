import * as React from 'react';

import { SiteLayout } from '../../../blocks';
import { Heading, IconMail, Text } from '../../../components';

export function VerifyRequest(): JSX.Element {
  return (
    <SiteLayout title="Verify your request">
      <section className="flex flex-col items-center space-y-8">
        <Heading className="flex items-center space-x-2">
          <IconMail size={28} />
          <span>Check your email</span>
        </Heading>
        <Text variant="secondary">
          A sign in link has been sent to your email address.
        </Text>
      </section>
    </SiteLayout>
  );
}
