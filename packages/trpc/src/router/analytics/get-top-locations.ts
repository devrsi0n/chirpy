import {
  TopLocation,
  TopLocationsData,
  TopLocationsSortingValue,
} from '@chirpy-dev/types';
import { queryPipe } from '@chirpy-dev/utils';

export async function getTopLocations({
  sorting,
  dateFrom: date_from,
  dateTo: date_to,
}: {
  sorting: TopLocationsSortingValue;
  dateFrom?: string;
  dateTo?: string;
}) {
  const { data: queryData } = await queryPipe<TopLocationsData>(
    'top_locations',
    { limit: 8, date_from, date_to },
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
