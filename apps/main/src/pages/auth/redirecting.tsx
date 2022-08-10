import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import * as React from 'react';

import { SiteLayout } from '$/blocks/layout';
import { Spinner } from '$/components/spinner';
import { useCurrentUser } from '$/contexts/current-user-context';
import { useTimeout } from '$/hooks/use-timeout';
import { CALLBACK_URL_KEY, SIGN_IN_SUCCESS_KEY } from '$/lib/constants';
import { hasValidUserProfile } from '$/utilities/user';

export default function Redirecting(): JSX.Element {
  const { status } = useSession();

  const { data, loading } = useCurrentUser();
  const router = useRouter();
  React.useEffect(() => {
    if (data.id) {
      localStorage.setItem(SIGN_IN_SUCCESS_KEY, 'true');
    }
    if (status === 'loading' || loading) {
      return;
    }
    if (!hasValidUserProfile(data)) {
      router.push('/auth/welcome?invalidProfile=true');
    } else if (data.id) {
      const callbackUrl = sessionStorage.getItem(CALLBACK_URL_KEY);
      sessionStorage.removeItem(CALLBACK_URL_KEY);
      router.push(callbackUrl || '/dashboard');
    }
  }, [router, data, status, loading]);
  useTimeout(() => {
    if (!data.id) {
      router.push(
        `/500?message=${encodeURIComponent(
          'User sign-in timeout after 30 seconds',
        )}`,
      );
    }
  }, 30_000);
  return (
    <SiteLayout title="Redirecting">
      <Spinner className="mt-24 justify-center" />
    </SiteLayout>
  );
}
