import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import 'twin.macro';

import { SiteLayout } from '$/blocks/Layout';
import { Button } from '$/components/Button';
import { Heading } from '$/components/Heading';
import { Link } from '$/components/Link';
import { Text } from '$/components/Text/Text';
import { APP_NAME, FEEDBACK_LINK } from '$/lib/constants';

export default function Custom500(): JSX.Element {
  const { query } = useRouter();
  const message = query['message'] || `We might have encountered some issues in our services...`;
  return (
    <SiteLayout>
      <Head>
        <title>500 - {APP_NAME}</title>
      </Head>
      <section tw="px-4 space-y-8 flex flex-col items-center">
        <Heading tw="font-bold">Oops! Something went wrong</Heading>
        <Text variant="secondary">{message}</Text>

        <div tw="flex justify-center items-center space-x-6">
          <Link href="/" variant="plain">
            <Button
              variant="solid"
              color="primary"
              className="group"
              tw="space-x-1 transition hover:shadow-2xl"
            >
              <span>Back to homepage</span>
            </Button>
          </Link>
          <Button>
            <Link variant="plain" href={FEEDBACK_LINK}>
              Report it on GitHub
            </Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
