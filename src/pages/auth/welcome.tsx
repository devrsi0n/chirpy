import Head from 'next/head';
import * as React from 'react';
import 'twin.macro';

import { ConfirmUserFields } from '$/blocks/ConfirmUserFields';
import { Button } from '$/components/Button';
import { Heading } from '$/components/Heading';
import { Link } from '$/components/Link';
import { Text } from '$/components/Text';
import { useCurrentUser } from '$/contexts/CurrentUserProvider/useCurrentUser';
import { useConfetti } from '$/hooks/useConfetti';
import { hasValidUserProfile } from '$/utilities/user';

// export type WelcomeProps = React.PropsWithChildren<{}>;

export default function Welcome(/*props: WelcomeProps*/): JSX.Element {
  useConfetti();
  const { data, loading } = useCurrentUser();
  const [isFullFilled, setIsFullFilled] = React.useState(true);
  React.useEffect(() => {
    if (loading) return;
    if (!hasValidUserProfile(data)) {
      setIsFullFilled(false);
    } else {
      setIsFullFilled(true);
    }
  }, [data, loading]);
  return (
    <div tw="py-12">
      <Head>
        <title>Welcome</title>
      </Head>
      {isFullFilled ? (
        <FullFilled />
      ) : (
        <section tw="flex flex-row items-center space-x-8">
          <div tw="space-y-3">
            <Heading as="h2" tw="tracking-tight">
              Welcome on board
            </Heading>
            <Text>Just fill this form to get started</Text>
          </div>
          <ConfirmUserFields />
        </section>
      )}
    </div>
  );
}

Welcome.auth = true;

function FullFilled(): JSX.Element {
  return (
    <section tw="flex flex-col items-center justify-center space-y-12">
      <Heading as="h2" tw="tracking-tight">
        Welcome on board
      </Heading>
      <Button variant="solid" color="primary">
        <Link href="/dashboard" variant="plain">
          Dashboard
        </Link>
      </Button>
    </section>
  );
}
