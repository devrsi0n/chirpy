import { SiteLayout } from '../../blocks';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useCurrentUser } from '../../contexts';

export function RedirectToDashboard(): JSX.Element {
  const router = useRouter();
  const { data, loading } = useCurrentUser();
  React.useEffect(() => {
    if (loading) {
      return;
    }
    if (!data) {
      router.push('/404');
      return;
    }
    router.push(`/dashboard/${data.username}`);
  }, [router, data, loading]);
  return (
    <SiteLayout title="Redirecting">
      <h1>Redirecting to dashboard</h1>
    </SiteLayout>
  );
}
