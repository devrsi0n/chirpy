import { useSession } from 'next-auth/client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import 'twin.macro';

import { Spinner } from '$/components/Spinner';
import { useCurrentUser } from '$/contexts/CurrentUserProvider/useCurrentUser';
import { hasValidUserProfile } from '$/utilities/user';

export default function Redirecting(): JSX.Element {
  const [session] = useSession();
  const { data, loading } = useCurrentUser();
  const router = useRouter();
  React.useEffect(() => {
    if (loading) {
      return;
    }
    if (session?.isNewUser) {
      router.push('/auth/welcome');
    } else if (!hasValidUserProfile(data)) {
      router.push('/auth/confirmation');
    } else {
      router.push('/dashboard');
    }
  }, [session?.isNewUser, router, data, loading]);
  return (
    <>
      <Head>
        <title>Redirecting</title>
      </Head>
      <Spinner tw="mt-32 justify-center" />
    </>
  );
}

Redirecting.auth = true;
