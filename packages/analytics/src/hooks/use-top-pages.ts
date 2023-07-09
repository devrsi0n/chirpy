import { trpc } from '@chirpy-dev/trpc/src/client';
import { TopPagesSorting } from '@chirpy-dev/types';

import { useAnalytics } from '../components/provider';
import useDateFilter from './use-date-filter';
import useParams from './use-params';

export default function useTopPages() {
  const { startDate, endDate } = useDateFilter();
  const [sorting] = useParams({
    key: 'top_pages_sorting',
    defaultValue: TopPagesSorting.Visitors,
    values: Object.values(TopPagesSorting),
  });
  const { domain } = useAnalytics();
  return trpc.analytics.topPages.useQuery({
    domain,
    dateFrom: startDate,
    dateTo: endDate,
    sorting,
  });
}
