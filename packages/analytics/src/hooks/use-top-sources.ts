import { trpcClient } from '@chirpy-dev/trpc/src/client';

import { useAnalytics } from '../components/provider';
import useDateFilter from './use-date-filter';

export default function useTopSources() {
  const { startDate, endDate } = useDateFilter();
  const { domain } = useAnalytics();
  return trpcClient.analytics.topSources.useQuery({
    domain,
    dateFrom: startDate,
    dateTo: endDate,
  });
}
