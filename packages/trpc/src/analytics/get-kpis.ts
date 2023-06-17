import { ChartValue, KpiTotals, KpiType, KpisData } from '@chirpy-dev/types';
import { queryPipe } from '@chirpy-dev/utils';
import moment from 'moment';

export async function getKpis({
  kpi,
  dateFrom: date_from,
  dateTo: date_to,
}: {
  kpi: KpiType;
  dateFrom?: string;
  dateTo?: string;
}) {
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

function arrayHasCurrentDate(dates: string[], isHourlyGranularity: boolean) {
  const now = moment()
    .utc()
    .format(isHourlyGranularity ? 'HH:00' : 'MMM DD, YYYY');
  return dates.at(-1) === now;
}

export async function getKpiTotals({
  dateFrom: date_from,
  dateTo: date_to,
}: { dateFrom?: string; dateTo?: string } = {}): Promise<KpiTotals> {
  /**
   * If we sent the same value for date_from and date_to, the result is one row per hour.
   *
   * But we actually need one row per date, so we're sending one extra day in the filter,
   * and removing ir afterwards.
   *
   * Not the best approach, it'd be better to modify the kpis endpoint. But we don't want
   * to break the backwards compatibility (breaking the dashboard for alreayd active users).
   *
   */
  const date_to_aux = date_to ? new Date(date_to) : new Date();
  date_to_aux.setDate(date_to_aux.getDate() + 1);
  const date_to_aux_str = date_to_aux.toISOString().slice(0, 10);

  const { data } = await queryPipe<KpisData>('kpis', {
    date_from,
    date_to: date_to_aux_str,
  });

  const queryData = data.filter((record) => record['date'] != date_to_aux_str);

  // Sum total KPI value from the trend
  const _KPITotal = (kpi: KpiType) =>
    queryData.reduce((prev, curr) => (curr[kpi] ?? 0) + prev, 0);

  // Get total number of sessions
  const totalVisits = _KPITotal('visits');

  // Sum total KPI value from the trend, ponderating using sessions
  const _ponderatedKPIsTotal = (kpi: KpiType) =>
    queryData.reduce(
      (prev, curr) => prev + ((curr[kpi] ?? 0) * curr['visits']) / totalVisits,
      0,
    );

  return {
    avg_session_sec: _ponderatedKPIsTotal('avg_session_sec'),
    pageviews: _KPITotal('pageviews'),
    visits: totalVisits,
    bounce_rate: _ponderatedKPIsTotal('bounce_rate'),
  };
}
