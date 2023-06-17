import { trpcClient } from '@chirpy-dev/trpc/src/client';

import useDateFilter from './use-date-filter';

export default function useTopSources() {
  const { startDate, endDate } = useDateFilter();
  return trpcClient.analytics.topSources.useQuery({
    dateFrom: startDate,
    dateTo: endDate,
  });
}
