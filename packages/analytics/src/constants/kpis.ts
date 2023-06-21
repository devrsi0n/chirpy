import { KpiOption } from '@chirpy-dev/types';

import {
  formatMinSec,
  formatNumber,
  formatPercentage,
  kFormatter,
} from '../utils';

export const KPI_OPTIONS: KpiOption[] = [
  {
    label: 'unique visitors',
    value: 'visits',
    tooltip: 'visits',
    formatter: formatNumber,
  },
  {
    label: 'site pageviews',
    value: 'pageviews',
    tooltip: 'pageviews',
    formatter: kFormatter,
  },
  {
    label: 'avg. visit time',
    value: 'avg_session_sec',
    tooltip: 'avg. visit time',
    formatter: formatMinSec,
  },
  {
    label: 'bounce rate',
    value: 'bounce_rate',
    tooltip: 'bounce rate',
    formatter: formatPercentage,
  },
];
