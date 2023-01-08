import { CALLBACK_URL_KEY, SIGN_IN_SUCCESS_KEY } from '@chirpy-dev/utils';
import { useRouter } from 'next/router';
import * as React from 'react';

import { Spinner } from '../../components';
import { useCurrentUser } from '../../contexts';
import { useTimeout } from '../../hooks';
import { AppLayout } from './components/app-layout';

export function Redirecting(): JSX.Element {
  const { data } = useCurrentUser();
  const router = useRouter();
  const settled = React.useRef(false);
  React.useEffect(() => {
    if (!data.id || settled.current) {
      return;
    }
    if (sessionStorage.getItem(SIGN_IN_SUCCESS_KEY) !== 'true') {
      localStorage.setItem(SIGN_IN_SUCCESS_KEY, 'true');
    }
    const callbackUrl = sessionStorage.getItem(CALLBACK_URL_KEY);
    sessionStorage.removeItem(CALLBACK_URL_KEY);
    router.push(callbackUrl || '/');
    settled.current = true;
  }, [router, data]);
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
    <AppLayout title="Redirecting">
      <Spinner className="mt-24 justify-center" />
    </AppLayout>
  );
}
