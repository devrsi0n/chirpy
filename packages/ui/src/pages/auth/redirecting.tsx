import { CALLBACK_URL_KEY, SIGN_IN_SUCCESS_KEY } from '@chirpy-dev/utils';
import { useRouter } from 'next/router';
import * as React from 'react';

import { SiteLayout } from '../../blocks';
import { Spinner } from '../../components';
import { useCurrentUser } from '../../contexts';
import { useTimeout } from '../../hooks';
import { hasValidUserProfile } from '../../utilities';

export function Redirecting(): JSX.Element {
  const { data, loading } = useCurrentUser();
  const router = useRouter();
  React.useEffect(() => {
    if (data.id) {
      localStorage.setItem(SIGN_IN_SUCCESS_KEY, 'true');
    }
    if (loading) {
      return;
    }
    if (!hasValidUserProfile(data)) {
      router.push('/auth/welcome?invalidProfile=true');
    } else if (data.id) {
      const callbackUrl = sessionStorage.getItem(CALLBACK_URL_KEY);
      sessionStorage.removeItem(CALLBACK_URL_KEY);
      router.push(callbackUrl || '/dashboard');
    }
  }, [router, data, loading]);
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
