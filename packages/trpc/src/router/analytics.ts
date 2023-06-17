import {
  ALL_KPIS,
  ChartValue,
  KpiType,
  KpisData,
  TopBrowsersData,
  TopDevicesData,
  TopLocation,
  TopLocationsData,
  TopLocationsSorting,
  TopLocationsSortingValue,
  TopLocationsSortingValueTuple,
} from '@chirpy-dev/types';
import { queryPipe, browsers, devices } from '@chirpy-dev/utils';
import moment from 'moment';
import { z } from 'zod';

import { router, protectedProcedure } from '../trpc-server';

const DateInput = z.object({
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});

export const analyticsRouter = router({
  kpis: protectedProcedure
    .input(
      DateInput.extend({
        kpi: z.enum(ALL_KPIS),
      }),
    )
    .query(async ({ input }) => {
      return getKpis(input);
    }),
  topBrowser: protectedProcedure.input(DateInput).query(async ({ input }) => {
    const { data: queryData } = await queryPipe<TopBrowsersData>(
      'top_browsers',
      {
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
  }),
  topDevice: protectedProcedure.input(DateInput).query(async ({ input }) => {
    const { data: queryData } = await queryPipe<TopDevicesData>('top_devices', {
      date_from: input.dateFrom,
      date_to: input.dateTo,
      limit: 4,
    });
    const data = [...queryData]
      .sort((a, b) => b.visits - a.visits)
      .map(({ device, visits }) => ({
        device: devices[device] ?? device,
        visits,
      }));

    return { data };
  }),
  topLocation: protectedProcedure
    .input(
      DateInput.extend({
        sorting: z.enum(
          Object.values(TopLocationsSorting) as TopLocationsSortingValueTuple,
        ),
      }),
    )
    .query(async ({ input }) => {
      return getTopLocations(input);
    }),
});

async function getKpis({
  kpi,
  dateFrom: date_from,
  dateTo: date_to,
}: {
  kpi: KpiType;
  dateFrom?: string;
  dateTo?: string;
}) {
  const { data: queryData } = await queryPipe<KpisData>('kpis', {
    date_from,
    date_to,
  });
  const isHourlyGranularity = !!date_from && !!date_to && date_from === date_to;
  const dates = queryData.map(({ date }) =>
    moment(date).format(isHourlyGranularity ? 'HH:mm' : 'MMM DD, YYYY'),
  );
  const isCurrentData = arrayHasCurrentDate(dates, isHourlyGranularity);

  const data = isCurrentData
    ? queryData.reduce(
        (acc, record, index) => {
          const value = record[kpi] ?? 0;

          const pastValue = index < queryData.length - 1 ? value : '';
          const currentValue = index > queryData.length - 3 ? value : '';

          const [pastPart, currentPart] = acc;

          return [
            [...pastPart, pastValue],
            [...currentPart, currentValue],
          ];
        },
        [[], []] as ChartValue[][],
      )
    : [queryData.map((value) => value[kpi] ?? 0), ['']];

  return {
    dates,
    data,
  };
}

async function getTopLocations({
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

function arrayHasCurrentDate(dates: string[], isHourlyGranularity: boolean) {
  const now = moment()
    .utc()
    .format(isHourlyGranularity ? 'HH:00' : 'MMM DD, YYYY');
  return dates.at(-1) === now;
}

function getFlagEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127_397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
