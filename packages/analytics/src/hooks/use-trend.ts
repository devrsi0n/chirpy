import { trpc } from '@chirpy-dev/trpc/src/client';

import { useAnalytics } from '../components/provider';
import useDateFilter from './use-date-filter';

export default function useTrend() {
  const { startDate, endDate } = useDateFilter();
  const { domain } = useAnalytics();
  return trpc.analytics.trend.useQuery({
    domain,
    dateFrom: startDate,
    dateTo: endDate,
  });
}
