import { SUPPORT_LINK } from '@chirpy-dev/utils';
import { useRouter } from 'next/router';
import * as React from 'react';

import { SiteLayout } from '../../blocks';
import { Button, Heading, Link, Text } from '../../components';
import { AppLayout } from './components/app-layout';
import { isAppDomain } from './utils';

export function Custom500(): JSX.Element {
  const { query } = useRouter();
  const message =
    query['message'] ||
    `We might have encountered some issues in our services...`;
  const Container = isAppDomain ? AppLayout : SiteLayout;
  return (
    <Container title="Server error">
      <section className="flex flex-col items-center space-y-8 px-4">
        <Heading className="font-bold">Oops! Something went wrong</Heading>
        <Text variant="secondary">{message}</Text>

        <div className="flex items-center justify-center space-x-6">
          <Link href="/" variant="plain">
            <Button
              variant="primary"
              className="group space-x-1 transition hover:shadow-2xl"
            >
              <span>Back to homepage</span>
            </Button>
          </Link>
          <Button>
            <Link variant="plain" href={SUPPORT_LINK}>
              Report it on GitHub
            </Link>
          </Button>
        </div>
      </section>
    </Container>
  );
}
