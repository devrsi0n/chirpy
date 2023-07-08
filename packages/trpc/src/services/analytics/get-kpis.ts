import {
  ALL_KPIS,
  ChartValue,
  KpisData,
  KpiTotals,
  KpiType,
} from '@chirpy-dev/types';
import { cpDayjs, queryPipe } from '@chirpy-dev/utils';
import { z } from 'zod';

import { ANALYTICS_INPUT } from './constants';

export const KPIS_INPUT = ANALYTICS_INPUT.extend({
  kpi: z.enum(ALL_KPIS),
});

export async function getKpis({
  domain,
  kpi,
  dateFrom,
  dateTo,
}: z.infer<typeof KPIS_INPUT>) {
  const { data: queryData } = await queryPipe<KpisData>('kpis_by_domain', {
    domain,
    date_from: dateFrom,
    date_to: dateTo,
  });
  const isHourlyGranularity = !!dateFrom && !!dateTo && dateFrom === dateTo;
  const dates = queryData.map(({ date }) =>
    cpDayjs(date).format(isHourlyGranularity ? 'HH:mm' : 'MMM DD, YYYY'),
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

function arrayHasCurrentDate(dates: string[], isHourlyGranularity: boolean) {
  const now = cpDayjs()
    .utc()
    .format(isHourlyGranularity ? 'HH:00' : 'MMM DD, YYYY');
  return dates.at(-1) === now;
}

export async function getKpiTotals({
  domain,
  dateFrom,
  dateTo,
}: AnalyticsInput): Promise<KpiTotals> {
  /**
   * If we sent the same value for date_from and date_to, the result is one row per hour.
   *
   * But we actually need one row per date, so we're sending one extra day in the filter,
   * and removing it afterwards.
   *
   * Not the best approach, it'd be better to modify the kpis endpoint. But we don't want
   * to break the backwards compatibility (breaking the dashboard for alreayd active users).
   *
   */
  const date_to_aux = dateTo ? new Date(dateTo) : new Date();
  date_to_aux.setDate(date_to_aux.getDate() + 1);
  const date_to_aux_str = date_to_aux.toISOString().slice(0, 10);

  const { data } = await queryPipe<KpisData>('kpis_by_domain', {
    domain,
    date_from: dateFrom,
    date_to: date_to_aux_str,
  });

  const queryData = data.filter((record) => record['date'] != date_to_aux_str);

  // Sum total KPI value from the trend
  const sumKPITotal = (kpi: KpiType) =>
    queryData.reduce((prev, curr) => (curr[kpi] ?? 0) + prev, 0);

  // Get total number of sessions
  const totalVisits = sumKPITotal('visits');

  // Sum total KPI value from the trend, ponderating using sessions
  const _ponderatedKPIsTotal = (kpi: KpiType) =>
    queryData.reduce(
      (prev, curr) => prev + ((curr[kpi] ?? 0) * curr['visits']) / totalVisits,
      0,
    );

  return {
    avg_session_sec: _ponderatedKPIsTotal('avg_session_sec'),
    pageviews: sumKPITotal('pageviews'),
    visits: totalVisits,
    bounce_rate: _ponderatedKPIsTotal('bounce_rate'),
  };
}
