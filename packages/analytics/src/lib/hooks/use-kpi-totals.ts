import { trpcClient } from '@chirpy-dev/trpc/src/client';

import useDateFilter from './use-date-filter';

export default function useKpiTotals() {
  const { startDate, endDate } = useDateFilter();

  return trpcClient.analytics.kpiTotal.useQuery({
    dateFrom: startDate,
    dateTo: endDate,
  });
}
