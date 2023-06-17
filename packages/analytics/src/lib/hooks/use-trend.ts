import { trpcClient } from '@chirpy-dev/trpc/src/client';

import useDateFilter from './use-date-filter';

export default function useTrend() {
  const { startDate, endDate } = useDateFilter();
  return trpcClient.analytics.trend.useQuery({
    dateFrom: startDate,
    dateTo: endDate,
  });
}
