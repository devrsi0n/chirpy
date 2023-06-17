import { trpcClient } from '@chirpy-dev/trpc/src/client';

export default function useCurrentVisitors() {
  const { data } = trpcClient.analytics.currentVisitor.useQuery();
  return data ?? 0;
}
