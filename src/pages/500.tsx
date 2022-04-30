import { useRouter } from 'next/router';
import * as React from 'react';

import { SiteLayout } from '$/blocks/layout';
import { Button } from '$/components/button';
import { Heading } from '$/components/heading';
import { Link } from '$/components/link';
import { Text } from '$/components/text/text';
import { FEEDBACK_LINK } from '$/lib/constants';

export default function Custom500(): JSX.Element {
  const { query } = useRouter();
  const message = query['message'] || `We might have encountered some issues in our services...`;
  return (
    <SiteLayout title="500">
      <section className="px-4 space-y-8 flex flex-col items-center">
        <Heading className="font-bold">Oops! Something went wrong</Heading>
        <Text variant="secondary">{message}</Text>

        <div className="flex justify-center items-center space-x-6">
          <Link href="/" variant="plain">
            <Button
              variant="solid"
              color="primary"
              className="group space-x-1 transition hover:shadow-2xl"
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
