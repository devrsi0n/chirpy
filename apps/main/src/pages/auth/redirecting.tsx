import { Spinner, useTimeout } from '@chirpy-dev/ui';
import { CALLBACK_URL_KEY } from '@chirpy-dev/utils';
import { useRouter } from 'next/router';
import * as React from 'react';

import { useCurrentUser } from '$/contexts';
import { hasValidUserProfile } from '$/utilities/user';
import { SiteLayout } from '../../components/layout';

export default function Redirecting(): JSX.Element {
  const { data } = useCurrentUser();
  const router = useRouter();
  React.useEffect(() => {
    if (!data.id) {
      return;
    }
    if (!hasValidUserProfile(data)) {
      router.push('/auth/welcome?invalidProfile=true');
    } else if (data.id) {
      const callbackUrl = sessionStorage.getItem(CALLBACK_URL_KEY);
      sessionStorage.removeItem(CALLBACK_URL_KEY);
      router.push(callbackUrl || `/dashboard/${data.username}`);
    }
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
    <SiteLayout title="Redirecting">
      <Spinner className="mt-24 justify-center" />
    </SiteLayout>
  );
}
