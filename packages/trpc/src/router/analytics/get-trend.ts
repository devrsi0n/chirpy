import { Trend, TrendData } from '@chirpy-dev/types';
import { queryPipe } from '@chirpy-dev/utils';
import moment from 'moment';

export async function getTrend({
  dateFrom: date_from,
  dateTo: date_to,
}: { dateFrom?: string; dateTo?: string } = {}): Promise<Trend> {
  const { data } = await queryPipe<TrendData>('trend', { date_from, date_to });
  const visits = data.map(({ visits }) => visits);
  const dates = data.map(({ t }) => {
    return moment(t).format('HH:mm');
  });
  const totalVisits = visits.reduce((a, b) => a + b, 0);

  return {
    visits,
    dates,
    totalVisits,
    data,
  };
}
