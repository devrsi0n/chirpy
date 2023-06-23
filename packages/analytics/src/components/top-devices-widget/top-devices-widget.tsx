import { DonutChart } from '@tremor/react';
import { Fragment } from 'react';

import useTopDevices from '../../hooks/use-top-devices';
import { tremorPieChartColors } from '../../styles/theme/tremor-colors';
import { formatNumber } from '../../utils';
import Widget from '../widget';

export default function TopDevicesWidget() {
  const { data, status } = useTopDevices();

  return (
    <Widget>
      <Widget.Title>Top Devices</Widget.Title>
      <Widget.Content status={status} noData={!data?.data?.length}>
        <div className="grid h-full w-full grid-cols-2">
          <DonutChart
            data={data?.data ?? []}
            category="visits"
            index="device"
            colors={tremorPieChartColors.map(([color]) => color)}
            showLabel={false}
            valueFormatter={formatNumber}
          />
          <div className="justify-self-end">
            <div className="grid grid-cols-2 gap-4 gap-y-1">
              <div className="truncate text-center text-xs font-medium uppercase tracking-widest">
                Device
              </div>
              <div className="truncate text-right text-xs font-medium uppercase tracking-widest">
                Visitors
              </div>
              {(data?.data ?? []).map(({ device, visits }, index) => (
                <Fragment key={device}>
                  <div className="z-10 flex h-9 items-center gap-2 rounded-md px-4 py-2 text-sm leading-5 text-gray-1100">
                    <div
                      className="h-4 min-w-[1rem]"
                      style={{
                        backgroundColor: tremorPieChartColors[index][1],
                      }}
                    />
                    <span>{device}</span>
                  </div>
                  <div className="flex h-9 items-center justify-end text-gray-1100">
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
