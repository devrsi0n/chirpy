import { cpDayjs } from '@chirpy-dev/utils';
import { BarChart } from '@tremor/react';
import { useMemo } from 'react';

import useTrend from '../../hooks/use-trend';
import Widget from '../widget';

export default function TrendWidget() {
  const { data, status } = useTrend();
  const chartData = useMemo(
    () =>
      (data?.data ?? []).map((d) => ({
        Date: cpDayjs(d.t).format('HH:mm'),
        'Number of visits': d.visits,
      })),
    [data],
  );

  return (
    <Widget>
      <div className="flex items-center justify-between">
        <Widget.Title>Users in last 30 minutes</Widget.Title>
        <h3 className="text-xl font-normal text-gray-1100">
          {data?.totalVisits ?? 0}
        </h3>
      </div>
      <Widget.Content
        status={status}
        loaderSize={40}
        noData={!chartData?.length}
      >
        <BarChart
          data={chartData}
          index="Date"
          categories={['Number of visits']}
          colors={['violet']}
          className="h-32"
          showXAxis={false}
          showYAxis={false}
          showLegend={false}
          showGridLines={false}
        />
      </Widget.Content>
    </Widget>
  );
}
