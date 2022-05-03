import { useRouter } from 'next/router';
import * as React from 'react';

import { SiteLayout } from '@chirpy/blocks';
import { Button } from '@chirpy/components';
import { Heading } from '@chirpy/components';
import { Link } from '@chirpy/components';
import { Text } from '@chirpy/components';
import { FEEDBACK_LINK } from '@chirpy/utilities';

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
