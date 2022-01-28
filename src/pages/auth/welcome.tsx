import Head from 'next/head';
import * as React from 'react';
import 'twin.macro';

import { ConfirmUserFields } from '$/blocks/confirm-user-fields';
import { SiteLayout } from '$/blocks/layout';
import { Button } from '$/components/button';
import { Heading } from '$/components/heading';
import { Link } from '$/components/link';
import { Text } from '$/components/text';
import { useCurrentUser } from '$/contexts/current-user-context/use-current-user';
import { useCelebration } from '$/hooks/use-celebration';
import { APP_NAME } from '$/lib/constants';
import { ssrMode } from '$/utilities/env';
import { hasValidUserProfile } from '$/utilities/user';

// export type WelcomeProps = React.PropsWithChildren<{}>;

export default function Welcome(/*props: WelcomeProps*/): JSX.Element {
  useCelebration('isNewUser');
  const { data, loading } = useCurrentUser();
  const [isFullFilled, setIsFullFilled] = React.useState(ssrMode ? true : isProfileFullFilled);

  React.useEffect(() => {
    if (loading) return;
    if (!hasValidUserProfile(data)) {
      setIsFullFilled(false);
    } else {
      setIsFullFilled(true);
    }
  }, [data, loading]);
  return (
    <SiteLayout>
      <Head>
        <title>Welcome - {APP_NAME}</title>
      </Head>
      {isFullFilled ? <FullFilled /> : <NotFullFilled />}
    </SiteLayout>
  );
}

Welcome.auth = true;

function FullFilled(): JSX.Element {
  return (
    <section tw="flex flex-col items-center justify-center space-y-12">
      <div tw="text-center space-y-2">
        <Heading as="h2" tw="tracking-tight">
          Welcome on board 🎉
        </Heading>
        <Text variant="secondary">
          Feel free to create a project, integrate a widget in your site, or just explore!
        </Text>
      </div>
      <div tw="space-x-4">
        <Button variant="solid" color="primary">
          <Link href="/dashboard" variant="plain">
            Dashboard
          </Link>
        </Button>
        <Button color="gray">
          <Link href="/docs/index" variant="plain">
            Docs
          </Link>
        </Button>
      </div>
    </section>
  );
}

function NotFullFilled() {
  return (
    <div tw="flex flex-col items-center space-y-8 md:(flex-row items-center space-y-0 space-x-8)">
      <div tw="space-y-3">
        <Heading as="h2" tw="tracking-tight">
          Welcome on board
        </Heading>
        <Text variant="secondary">Just fill this form to get started</Text>
      </div>
      <ConfirmUserFields />
    </div>
  );
}

function isProfileFullFilled(): boolean {
  return !location.search.includes('invalidProfile=true');
}
