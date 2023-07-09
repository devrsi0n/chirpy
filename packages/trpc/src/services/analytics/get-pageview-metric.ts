import { cpDayjs } from '@chirpy-dev/utils';
import { z } from 'zod';

import { getKpiTotals } from './get-kpis';

export const PAGEVIEW_METRIC_INPUT = z.object({
  domain: z.string(),
});

const DATE_FORMAT = `YYYY-MM-DD`;

/**
 * Calc pageviews & growth rate (vs last period)
 */
export async function getPageViewMetric(
  input: z.infer<typeof PAGEVIEW_METRIC_INPUT>,
) {
  const today = cpDayjs();
  const sevenDaysAgo = today.subtract(7, 'day');
  const twoWeeksAgo = sevenDaysAgo.subtract(7, 'day');

  const [currMetric, prevMetric] = await Promise.all([
    getKpiTotals({
      ...input,
      dateTo: today.format(DATE_FORMAT),
      dateFrom: sevenDaysAgo.format(DATE_FORMAT),
    }),
    getKpiTotals({
      ...input,
      dateTo: sevenDaysAgo.format(DATE_FORMAT),
      dateFrom: twoWeeksAgo.format(DATE_FORMAT),
    }),
  ]);
  let growthRate =
    (currMetric.pageviews - prevMetric.pageviews) / prevMetric.pageviews;
  if (Number.isNaN(growthRate)) {
    growthRate = 0;
  }
  return {
    pageviews: currMetric.pageviews,
    prevPageviews: prevMetric.pageviews,
    growthRate,
  };
}
