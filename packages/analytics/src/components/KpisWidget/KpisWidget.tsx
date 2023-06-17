import { AreaChart } from '@tremor/react';
import { useMemo } from 'react';

import useKpiTotals from '../../lib/hooks/use-kpi-totals';
import useKpis from '../../lib/hooks/use-kpis';
import Widget from '../Widget';
import KPIsTabs from './KpisTabs';

export default function KPIsWidget() {
  const { data, kpi, setKpi, kpiOption, status } = useKpis();
  const { data: kpiTotals } = useKpiTotals();
  const chartData = useMemo(
    () =>
      (data?.dates ?? []).map((date, index) => {
        const value = Math.max(
          Number(data?.data[0][index]) || 0,
          Number(data?.data[1][index]) || 0,
        );

        return {
          date: date.toUpperCase(),
          [kpiOption.label]: value,
        };
      }),
    [data?.data, data?.dates, kpiOption],
  );

  return (
    <Widget>
      <Widget.Title isVisuallyHidden>KPIs</Widget.Title>
      <KPIsTabs value={kpi} onChange={setKpi} totals={kpiTotals} />
      <Widget.Content
        status={status}
        noData={!chartData?.length}
        className="mt-4 pt-2"
      >
        <AreaChart
          data={chartData}
          index="date"
          categories={[kpiOption.label]}
          colors={['blue']}
          valueFormatter={kpiOption.formatter}
          showLegend={false}
        />
      </Widget.Content>
    </Widget>
  );
}
