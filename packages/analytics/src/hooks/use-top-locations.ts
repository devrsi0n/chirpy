import { trpcClient } from '@chirpy-dev/trpc/src/client';
import { TopLocationsSorting } from '@chirpy-dev/types';

import { useAnalytics } from '../components/provider';
import useDateFilter from './use-date-filter';
import useParams from './use-params';

export default function useTopLocations() {
  const { startDate, endDate } = useDateFilter();
  const [sorting] = useParams({
    key: 'top_locations_sorting',
    defaultValue: TopLocationsSorting.Visitors,
    values: Object.values(TopLocationsSorting),
  });
  const { domain } = useAnalytics();
  return trpcClient.analytics.topLocation.useQuery({
    domain,
    dateFrom: startDate,
    dateTo: endDate,
    sorting,
  });
}
