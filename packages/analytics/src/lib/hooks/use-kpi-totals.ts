import { queryPipe } from '../api';
import { KpisData, KpiTotals, KpiType } from '../constants/kpis';
import { QueryError } from '../types/api';
import useDateFilter from './use-date-filter';
import useQuery from './use-query';

async function getKpiTotals(
  date_from?: string,
  date_to?: string,
): Promise<KpiTotals> {
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

function getNotFoundColumnsWarning(warning: QueryError | null): string | null {
  if (!warning) return null;
  try {
    // parsing the error message to get the columns that are not found
    const rawColumns = warning.message
      .split('required columns:')[1]
      .trim()
      .split("'")
      .map((part) => part.trim())
      .filter(Boolean)
      .join(',')
      .split(',')
      .slice(0, -1);
    const columns = Array.from(new Set(rawColumns));
    const formatter = new Intl.ListFormat('en', {
      style: 'long',
      type: 'conjunction',
    });
    return `${formatter.format(columns)} column${
      columns.length > 0 ? 's' : ''
    } at the analytics_events data source cannot be found`;
  } catch {
    return null;
  }
}

export default function useKpiTotals() {
  const { startDate, endDate } = useDateFilter();
  const { warning, ...query } = useQuery(
    [startDate, endDate, 'kpiTotals'],
    getKpiTotals,
  );
  return { ...query, warning: getNotFoundColumnsWarning(warning) };
}
