import { queryPipe } from '../api';
import { TopSource, TopSources } from '../types/top-sources';
import useDateFilter from './use-date-filter';
import useQuery from './use-query';

async function getTopSources(
  date_from?: string,
  date_to?: string,
): Promise<TopSources> {
  const { data: queryData } = await queryPipe<TopSource>('top_sources', {
    limit: 8,
    date_from,
    date_to,
  });

  const data: TopSource[] = [...queryData]
    .sort((a, b) => b.visits - a.visits)
    .map(({ referrer, visits }) => ({
      referrer: referrer || 'Direct',
      href: referrer ? `https://${referrer}` : undefined,
      visits,
    }));
  const refs = data.map(({ referrer }) => referrer);
  const visits = data.map(({ visits }) => visits);

  return {
    data,
    refs,
    visits,
  };
}

export default function useTopSources() {
  const { startDate, endDate } = useDateFilter();
  return useQuery([startDate, endDate, 'topSources'], getTopSources);
}
