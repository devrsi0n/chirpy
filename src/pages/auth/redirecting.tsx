import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import 'twin.macro';

import { Spinner } from '$/components/Spinner';
import { useCurrentUser } from '$/contexts/CurrentUserProvider/useCurrentUser';
import { APP_NAME, LOG_IN_SUCCESS_KEY } from '$/lib/constants';
import { hasValidUserProfile } from '$/utilities/user';

export default function Redirecting(): JSX.Element {
  const { data: session } = useSession();

  const { data, loading } = useCurrentUser();
  const router = useRouter();
  React.useEffect(() => {
    if (loading) {
      return;
    }
    if (data.id) {
      localStorage.setItem(LOG_IN_SUCCESS_KEY, 'true');
    }
    setTimeout(() => {
      if (session?.isNewUser) {
        router.push('/auth/welcome?isNewUser=true');
      } else if (!hasValidUserProfile(data)) {
        router.push('/auth/welcome?invalidProfile=true');
      } else {
        router.push('/dashboard');
      }
    }, 1000);
  }, [session?.isNewUser, router, data, loading]);
  return (
    <>
      <Head>
        <title>Redirecting - {APP_NAME}</title>
      </Head>
      <Spinner tw="mt-24 justify-center" />
    </>
  );
}

Redirecting.auth = true;
