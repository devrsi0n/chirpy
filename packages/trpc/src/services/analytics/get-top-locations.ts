import {
  TopLocation,
  TopLocationsData,
  TopLocationsSorting,
  TopLocationsSortingValueTuple,
} from '@chirpy-dev/types';
import { queryPipe } from '@chirpy-dev/utils';
import { z } from 'zod';

import { ANALYTICS_INPUT } from './constants';

export const TOP_LOCATIONS_INPUT = ANALYTICS_INPUT.extend({
  sorting: z.enum(
    Object.values(TopLocationsSorting) as TopLocationsSortingValueTuple,
  ),
});

export async function getTopLocations({
  domain,
  sorting,
  dateFrom,
  dateTo,
}: z.infer<typeof TOP_LOCATIONS_INPUT>) {
  const { data: queryData } = await queryPipe<TopLocationsData>(
    'top_locations_by_domain',
    { domain, limit: 8, date_from: dateFrom, date_to: dateTo },
  );
  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

  const data: TopLocation[] = [...queryData]
    .sort((a, b) => b[sorting] - a[sorting])
    .map(({ location, ...rest }) => {
      const unknownLocation = '🌎  Unknown';
      return {
        location: location
          ? `${getFlagEmoji(location)} ${regionNames.of(location)}`
          : unknownLocation,
        shortLocation: location
          ? `${getFlagEmoji(location)} ${location}`
          : unknownLocation,
        ...rest,
      };
    });

  const locations = data.map(({ location }) => location);
  const labels = data.map((record) => record[sorting]);

  return {
    data,
    locations,
    labels,
  };
}
function getFlagEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127_397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
