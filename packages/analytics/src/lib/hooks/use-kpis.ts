import { trpcClient } from '@chirpy-dev/trpc/src/client';
import { KpiType, isKpi } from '@chirpy-dev/types';
import { useRouter } from 'next/router';

import { KPI_OPTIONS } from '../constants/kpis';
import useDateFilter from './use-date-filter';

export default function useKpis() {
  const { startDate, endDate } = useDateFilter();
  const router = useRouter();
  const { kpi: kpiParam } = router.query;
  const kpi = isKpi(kpiParam) ? kpiParam : 'visits';
  const kpiOption = KPI_OPTIONS.find(({ value }) => value === kpi)!;
  const query = trpcClient.analytics.kpis.useQuery({
    kpi,
    dateFrom: startDate,
    dateTo: endDate,
  });

  const setKpi = (kpi: KpiType) => {
    const url = new URL(window.location.href);
    url.searchParams.set('kpi', kpi);
    router.push(url.href, undefined, { scroll: false });
  };

  return {
    setKpi,
    kpi,
    kpiOption,
    ...query,
  };
}
