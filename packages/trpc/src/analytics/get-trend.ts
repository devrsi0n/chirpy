import { Trend, TrendData } from '@chirpy-dev/types';
import { cpDayjs, queryPipe } from '@chirpy-dev/utils';

import { AnalyticsInput } from './constants';

export async function getTrend({
  domain,
  dateFrom,
  dateTo,
}: AnalyticsInput): Promise<Trend> {
  const { data } = await queryPipe<TrendData>('trend_by_domain', {
    domain,
    date_from: dateFrom,
    date_to: dateTo,
  });
  const visits = data.map(({ visits }) => visits);
  const dates = data.map(({ t }) => {
    return cpDayjs(t).format('HH:mm');
  });
  const totalVisits = visits.reduce((a, b) => a + b, 0);

  return {
    visits,
    dates,
    totalVisits,
    data,
  };
}
