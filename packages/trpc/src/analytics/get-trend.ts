import { Trend, TrendData } from '@chirpy-dev/types';
import { queryPipe } from '@chirpy-dev/utils';

import { trpcDayjs } from '../common/date';
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
    return trpcDayjs(t).format('HH:mm');
  });
  const totalVisits = visits.reduce((a, b) => a + b, 0);

  return {
    visits,
    dates,
    totalVisits,
    data,
  };
}
