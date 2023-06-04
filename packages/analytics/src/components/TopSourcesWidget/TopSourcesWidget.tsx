import { BarList } from '@tremor/react';
import { useMemo } from 'react';

import useTopSources from '../../lib/hooks/use-top-sources';
import { formatNumber } from '../../lib/utils';
import Widget from '../Widget';

export default function TopSourcesWidget() {
  const { data, status, warning } = useTopSources();
  const chartData = useMemo(
    () =>
      (data?.data ?? []).map((d) => ({
        name: d.referrer,
        value: d.visits,
        href: d.href,
      })),
    [data?.data],
  );

  return (
    <Widget>
      <Widget.Title>Top Sources</Widget.Title>
      <Widget.Content
        status={status}
        noData={!chartData?.length}
        warning={warning?.message}
      >
        <div className="grid grid-cols-5 gap-x-4 gap-y-2">
          <div className="col-span-4 h-5 text-xs font-semibold uppercase tracking-widest text-gray-500">
            Refs
          </div>
          <div className="col-span-1 h-5 text-right text-xs font-semibold uppercase tracking-widest">
            Visitors
          </div>

          <div className="col-span-4">
            <BarList data={chartData} valueFormatter={(_) => ''} />
          </div>
          <div className="col-span-1 row-span-4 flex flex-col gap-2">
            {(data?.data ?? []).map(({ referrer, visits }) => (
              <div
                key={referrer}
                className="text-neutral-64 flex h-9 w-full items-center justify-end"
              >
                {formatNumber(visits ?? 0)}
              </div>
            ))}
          </div>
        </div>
      </Widget.Content>
    </Widget>
  );
}