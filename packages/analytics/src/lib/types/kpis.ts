import {
  formatMinSec,
  formatNumber,
  formatPercentage,
  kFormatter,
} from '../../lib/utils';

export type KpisData = {
  date: string;
  visits: number;
  pageviews: number;
  bounce_rate: null | number;
  avg_session_sec: number;
};

const ALL_KPIS = [
  'visits',
  'pageviews',
  'avg_session_sec',
  'bounce_rate',
] as const;

type KpiTuple = typeof ALL_KPIS;

export type KpiType = KpiTuple[number];

export function isKpi(kpi: string | string[] | undefined): kpi is KpiType {
  return ALL_KPIS.includes(kpi as KpiType);
}

export type KpiTotals = Record<KpiType, number>;

export type KpiOption = {
  label: string;
  value: KpiType;
  tooltip: string;
  formatter: (value: number) => string;
};

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
