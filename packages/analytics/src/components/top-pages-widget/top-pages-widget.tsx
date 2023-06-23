import { TopPagesSorting } from '@chirpy-dev/types';
import { BarList } from '@tremor/react';
import { useMemo } from 'react';

import useParams from '../../hooks/use-params';
import useTopPages from '../../hooks/use-top-pages';
import { cx, formatNumber } from '../../utils';
import { useAnalytics } from '../provider';
import Widget from '../widget';

export default function TopPagesWidget() {
  const { data, status } = useTopPages();
  const [sorting, setSorting] = useParams({
    key: 'top_pages_sorting',
    values: Object.values(TopPagesSorting),
  });
  const { domain } = useAnalytics();
  const chartData = useMemo(
    () =>
      (data?.data ?? []).map((d) => ({
        name: d.pathname,
        value: d[sorting],
        href: `${domain}${d.pathname}`,
      })),
    [data?.data, domain, sorting],
  );

  return (
    <Widget>
      <Widget.Title>Top Pages</Widget.Title>
      <Widget.Content status={status} noData={!chartData?.length}>
        <div className="grid grid-cols-5 gap-x-4 gap-y-2">
          <div className="col-span-3 h-5 text-xs font-semibold uppercase tracking-widest text-gray-1100">
            Content
          </div>
          <div
            className={cx(
              'col-span-1 h-5 cursor-pointer text-right text-xs font-semibold uppercase tracking-widest',
              sorting === TopPagesSorting.Visitors && 'text-primary',
            )}
            onClick={() => setSorting(TopPagesSorting.Visitors)}
          >
            Visits
          </div>
          <div
            className={cx(
              'col-span-1 row-span-1 h-5 cursor-pointer text-right text-xs font-semibold uppercase tracking-widest',
              sorting === TopPagesSorting.Pageviews && 'text-primary',
            )}
            onClick={() => setSorting(TopPagesSorting.Pageviews)}
          >
            Pageviews
          </div>

          <div className="col-span-3">
            <BarList data={chartData} valueFormatter={(_) => ''} />
          </div>
          <div className="col-span-1 row-span-4 flex flex-col gap-2">
            {(data?.data ?? []).map(({ pathname, visits }) => (
              <div
                key={pathname}
                className="flex h-9 w-full items-center justify-end text-gray-1100"
              >
                {formatNumber(visits ?? 0)}
              </div>
            ))}
          </div>
          <div className="col-span-1 row-span-4 flex flex-col gap-2">
            {(data?.data ?? []).map(({ pathname, hits }) => (
              <div
                key={pathname}
                className="flex h-9 w-full items-center justify-end text-gray-1100"
              >
                {formatNumber(hits)}
              </div>
            ))}
          </div>
        </div>
      </Widget.Content>
    </Widget>
  );
}
