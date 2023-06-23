import { trpcClient } from '@chirpy-dev/trpc/src/client';

import { useAnalytics } from '../components/Provider';

export default function useCurrentVisitors() {
  const { domain } = useAnalytics();
  const { data } = trpcClient.analytics.currentVisitor.useQuery(
    {
      domain,
    },
    {
      refetchInterval: 5000,
    },
  );
  return data ?? 0;
}
