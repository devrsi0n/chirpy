import { trpcClient } from '@chirpy-dev/trpc/src/client';
import { TopLocationsSorting } from '@chirpy-dev/types/src/analytics/top-locations';

import useDateFilter from './use-date-filter';
import useParams from './use-params';

export default function useTopLocations() {
  const { startDate, endDate } = useDateFilter();
  const [sorting] = useParams({
    key: 'top_locations_sorting',
    defaultValue: TopLocationsSorting.Visitors,
    values: Object.values(TopLocationsSorting),
  });

  return trpcClient.analytics.topLocation.useQuery({
    dateFrom: startDate,
    dateTo: endDate,
    sorting,
  });
}
