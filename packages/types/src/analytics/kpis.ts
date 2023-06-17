export type KpisData = {
  date: string;
  visits: number;
  pageviews: number;
  bounce_rate: null | number;
  avg_session_sec: number;
};

export const ALL_KPIS = [
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
