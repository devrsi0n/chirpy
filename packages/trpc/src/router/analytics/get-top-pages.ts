import { TopPagesData, TopPagesSortingValue } from '@chirpy-dev/types';
import { queryPipe } from '@chirpy-dev/utils';

export async function getTopPages({
  sorting,
  dateFrom: date_from,
  dateTo: date_to,
}: {
  sorting: TopPagesSortingValue;
  dateFrom?: string;
  dateTo?: string;
}) {
  const { data: queryData, meta } = await queryPipe<TopPagesData>('top_pages', {
    limit: 8,
    date_from,
    date_to,
  });
  const data = [...queryData].sort((a, b) => b[sorting] - a[sorting]);

  const columnLabels = {
    pathname: 'content',
    visits: 'visitors',
    hits: 'pageviews',
  };
  const columns = meta.map(({ name }) => ({
    label: columnLabels[name],
    value: name,
  }));
  const pages = data.map(({ pathname }) => pathname);
  const labels = data.map((record) => record[sorting]);

  return {
    data,
    columns,
    pages,
    labels,
  };
}
