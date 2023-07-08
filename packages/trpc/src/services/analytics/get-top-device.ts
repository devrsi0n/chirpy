import { TopDevicesData } from '@chirpy-dev/types';
import { devices, queryPipe } from '@chirpy-dev/utils';

import { ANALYTICS_INPUT } from './constants';

export async function getTopDevice(input: AnalyticsInput) {
  const { data: queryData } = await queryPipe<TopDevicesData>(
    'top_devices_by_domain',
    {
      domain: input.domain,
      date_from: input.dateFrom,
      date_to: input.dateTo,
      limit: 4,
    },
  );
  const data = [...queryData]
    .sort((a, b) => b.visits - a.visits)
    .map(({ device, visits }) => ({
      device: devices[device] ?? device,
      visits,
    }));

  return { data };
}
