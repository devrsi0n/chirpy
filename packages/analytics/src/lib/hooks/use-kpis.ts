import moment from 'moment';
import { useRouter } from 'next/router';

import { queryPipe } from '../api';
import { ChartValue } from '../types/charts';
import { KpisData, KpiType, isKpi, KPI_OPTIONS } from '../types/kpis';
import useDateFilter from './use-date-filter';
import useQuery from './use-query';

const arrayHasCurrentDate = (dates: string[], isHourlyGranularity: boolean) => {
  const now = moment()
    .utc()
    .format(isHourlyGranularity ? 'HH:00' : 'MMM DD, YYYY');
  return dates.at(-1) === now;
};

async function getKpis(kpi: KpiType, date_from?: string, date_to?: string) {
  const { data: queryData } = await queryPipe<KpisData>('kpis', {
    date_from,
    date_to,
  });
  const isHourlyGranularity = !!date_from && !!date_to && date_from === date_to;
  const dates = queryData.map(({ date }) =>
    moment(date).format(isHourlyGranularity ? 'HH:mm' : 'MMM DD, YYYY'),
  );
  const isCurrentData = arrayHasCurrentDate(dates, isHourlyGranularity);

  const data = isCurrentData
    ? queryData.reduce(
        (acc, record, index) => {
          const value = record[kpi] ?? 0;

          const pastValue = index < queryData.length - 1 ? value : '';
          const currentValue = index > queryData.length - 3 ? value : '';

          const [pastPart, currentPart] = acc;

          return [
            [...pastPart, pastValue],
            [...currentPart, currentValue],
          ];
        },
        [[], []] as ChartValue[][],
      )
    : [queryData.map((value) => value[kpi] ?? 0), ['']];

  return {
    dates,
    data,
  };
}

export default function useKpis() {
  const { startDate, endDate } = useDateFilter();
  const router = useRouter();
  const { kpi: kpiParam } = router.query;
  const kpi = isKpi(kpiParam) ? kpiParam : 'visits';
  const kpiOption = KPI_OPTIONS.find(({ value }) => value === kpi)!;
  const query = useQuery([kpi, startDate, endDate, 'kpis'], getKpis);

  const setKpi = (kpi: KpiType) => {
    const url = new URL(window.location.href);
    url.searchParams.set('kpi', kpi);
    router.push(url.href, undefined, { scroll: false });
  };

  return {
    setKpi,
    kpi,
    kpiOption,
    ...query,
  };
}
