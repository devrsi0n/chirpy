import { TopSource, TopSources } from '@chirpy-dev/types';
import { queryPipe } from '@chirpy-dev/utils';

export async function getTopSources({
  dateFrom: date_from,
  dateTo: date_to,
}: { dateFrom?: string; dateTo?: string } = {}): Promise<TopSources> {
  const { data: queryData } = await queryPipe<TopSource>(
    'top_sources_by_domain',
    {
      limit: 8,
      date_from,
      date_to,
    },
  );

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
