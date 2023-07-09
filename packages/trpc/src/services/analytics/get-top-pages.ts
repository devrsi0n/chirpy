import {
  TopPagesData,
  TopPagesSorting,
  TopPagesSortingValueTuple,
} from '@chirpy-dev/types';
import { queryPipe } from '@chirpy-dev/utils';
import { z } from 'zod';

import { ANALYTICS_INPUT } from './constants';

export const TOP_PAGES_INPUT = ANALYTICS_INPUT.extend({
  sorting: z.enum(Object.values(TopPagesSorting) as TopPagesSortingValueTuple),
});

export async function getTopPages({
  domain,
  sorting,
  dateFrom,
  dateTo,
}: z.infer<typeof TOP_PAGES_INPUT>) {
  const { data: queryData, meta } = await queryPipe<TopPagesData>(
    'top_pages_by_domain',
    {
      domain,
      limit: 8,
      date_from: dateFrom,
      date_to: dateTo,
    },
  );
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
