import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import 'twin.macro';

import { SiteLayout } from '$/blocks/layout';
import { Spinner } from '$/components/spinner';
import { useCurrentUser } from '$/contexts/current-user-provider/useCurrentUser';
import { useTimeout } from '$/hooks/useTimeout';
import { APP_NAME, LOG_IN_SUCCESS_KEY } from '$/lib/constants';
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
    if (session?.isNewUser) {
      router.push('/auth/welcome?isNewUser=true');
    } else if (!hasValidUserProfile(data)) {
      router.push('/auth/welcome?invalidProfile=true');
    } else if (data.id) {
      router.push('/dashboard');
    }
  }, [router, session?.isNewUser, data, status, loading]);
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
