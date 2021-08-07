import { useSession } from 'next-auth/client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import 'twin.macro';

import { useCurrentUser } from '$/blocks/CurrentUserProvider/useCurrentUser';
import { Text } from '$/components/Text';
import { hasValidUserProfile } from '$/utilities/user';

export default function Redirecting(): JSX.Element {
  const [session] = useSession();
  const { data } = useCurrentUser();
  const router = useRouter();
  React.useEffect(() => {
    if (session?.isNewUser) {
      router.push('/auth/welcome');
    } else if (!hasValidUserProfile(data)) {
      router.push('/auth/confirmation');
    } else {
      router.push('/dashboard');
    }
  }, [session?.isNewUser, router, data]);
  return (
    <>
      <Head>
        <title>Redirecting</title>
      </Head>
      <section>
        <Text>Redirecting...</Text>
      </section>
    </>
  );
}

Redirecting.auth = true;
