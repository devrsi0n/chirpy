import { TopBrowsersData } from '@chirpy-dev/types';
import { browsers, queryPipe } from '@chirpy-dev/utils';

import { ANALYTICS_INPUT } from './constants';

export async function getTopBrowser(input: AnalyticsInput) {
  const { data: queryData } = await queryPipe<TopBrowsersData>(
    'top_browsers_by_domain',
    {
      domain: input.domain,
      date_from: input.dateFrom,
      date_to: input.dateTo,
      limit: 4,
    },
  );
  const data = [...queryData]
    .sort((a, b) => b.visits - a.visits)
    .map(({ browser, visits }) => ({
      browser: browsers[browser] ?? browser,
      visits,
    }));
  return { data };
}
