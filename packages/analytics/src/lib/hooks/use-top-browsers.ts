import { trpcClient } from '@chirpy-dev/trpc/src/client';

import { useAnalytics } from '../../components/Provider';
import useDateFilter from './use-date-filter';

export default function useTopBrowsers() {
  const { startDate, endDate } = useDateFilter();
  const { domain } = useAnalytics();
  return trpcClient.analytics.topBrowser.useQuery({
    domain,
    dateFrom: startDate,
    dateTo: endDate,
  });
}
