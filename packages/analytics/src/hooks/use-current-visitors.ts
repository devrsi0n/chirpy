import { trpc } from '@chirpy-dev/trpc/src/client';

import { useAnalytics } from '../components/provider';

export default function useCurrentVisitors() {
  const { domain } = useAnalytics();
  const { data } = trpc.analytics.currentVisitor.useQuery(
    {
      domain,
    },
    {
      refetchInterval: 5000,
    },
  );
  return data ?? 0;
}
