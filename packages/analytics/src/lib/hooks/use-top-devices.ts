import { trpcClient } from '@chirpy-dev/trpc/src/client';

import useDateFilter from './use-date-filter';

export default function useTopDevices() {
  const { startDate, endDate } = useDateFilter();
  return trpcClient.analytics.topDevice.useQuery({
    dateFrom: startDate,
    dateTo: endDate,
  });
}
