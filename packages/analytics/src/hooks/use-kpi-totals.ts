import { trpcClient } from '@chirpy-dev/trpc/src/client';

import { useAnalytics } from '../components/provider';
import useDateFilter from './use-date-filter';

export default function useKpiTotals() {
  const { startDate, endDate } = useDateFilter();
  const { domain } = useAnalytics();

  return trpcClient.analytics.kpiTotal.useQuery({
    dateFrom: startDate,
    dateTo: endDate,
    domain,
  });
}
