import { DonutChart } from '@tremor/react';
import { Fragment } from 'react';

import useBrowsers from '../../lib/hooks/use-top-browsers';
import { formatNumber } from '../../lib/utils';
import { tremorPieChartColors } from '../../styles/theme/tremor-colors';
import Widget from '../Widget';

export default function BrowsersWidget() {
  const { data, status } = useBrowsers();

  return (
    <Widget>
      <Widget.Title>Top Browsers</Widget.Title>
      <Widget.Content status={status} noData={!data?.data?.length}>
        <div className="grid h-full w-full grid-cols-2">
          <DonutChart
            variant="pie"
            data={data?.data ?? []}
            category="visits"
            index="browser"
            colors={tremorPieChartColors.map(([color]) => color)}
            showLabel={false}
            valueFormatter={formatNumber}
          />
          <div className="justify-self-end">
            <div className="grid grid-cols-2 gap-4 gap-y-1">
              <div className="truncate text-center text-xs font-medium uppercase tracking-widest">
                Browser
              </div>
              <div className="truncate text-right text-xs font-medium uppercase tracking-widest">
                Visitors
              </div>
              {(data?.data ?? []).map(({ browser, visits }, index) => (
                <Fragment key={browser}>
                  <div className="text-neutral-64 z-10 flex h-9 items-center gap-2 rounded-md px-4 py-2 text-sm leading-5">
                    <div
                      className="h-4 min-w-[1rem]"
                      style={{
                        backgroundColor: tremorPieChartColors[index][1],
                      }}
                    />
                    <span>{browser}</span>
                  </div>
                  <div className="text-neutral-64 flex h-9 items-center justify-end">
                    {formatNumber(visits)}
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </Widget.Content>
    </Widget>
  );
}
