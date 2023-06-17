import { trpcClient } from '@chirpy-dev/trpc/src/client';

import useDateFilter from './use-date-filter';

export default function useTopBrowsers() {
  const { startDate, endDate } = useDateFilter();
  return trpcClient.analytics.topBrowser.useQuery({
    dateFrom: startDate,
    dateTo: endDate,
  });
}
