import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import 'twin.macro';

import { SiteLayout } from '$/blocks/layout';
import { Spinner } from '$/components/spinner';
import { useCurrentUser } from '$/contexts/current-user-context/use-current-user';
import { useTimeout } from '$/hooks/use-timeout';
import { APP_NAME, CALLBACK_URL, LOG_IN_SUCCESS_KEY } from '$/lib/constants';
import { hasValidUserProfile } from '$/utilities/user';

export default function Redirecting(): JSX.Element {
  const { data: session, status } = useSession();

  const { data, loading } = useCurrentUser();
  const router = useRouter();
  React.useEffect(() => {
    if (data.id) {
      localStorage.setItem(LOG_IN_SUCCESS_KEY, 'true');
    }
    if (status === 'loading' || loading) {
      return;
    }
    if (!hasValidUserProfile(data)) {
      router.push('/auth/welcome?invalidProfile=true');
    } else if (data.id) {
      const callbackUrl = sessionStorage.getItem(CALLBACK_URL);
      sessionStorage.removeItem(CALLBACK_URL);
      router.push(callbackUrl || '/dashboard');
    }
  }, [router, data, status, loading]);
  useTimeout(() => {
    if (!data.id) {
      router.push(`/500?message=${encodeURIComponent('User sign-in timeout after 30 seconds')}`);
    }
  }, 30_000);
  return (
    <SiteLayout>
      <Head>
        <title>Redirecting - {APP_NAME}</title>
      </Head>
      <Spinner tw="mt-24 justify-center" />
    </SiteLayout>
  );
}

Redirecting.auth = true;
