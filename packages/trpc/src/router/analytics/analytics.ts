import {
  ALL_KPIS,
  TopBrowsersData,
  TopDevicesData,
  TopLocationsSorting,
  TopLocationsSortingValueTuple,
  TopPagesSorting,
  TopPagesSortingValueTuple,
} from '@chirpy-dev/types';
import { queryPipe, browsers, devices } from '@chirpy-dev/utils';
import { z } from 'zod';

import { router, protectedProcedure } from '../../trpc-server';
import { getKpiTotals, getKpis } from './get-kpis';
import { getTopLocations } from './get-top-locations';
import { getTopPages } from './get-top-pages';
import { getTopSources } from './get-topic-source';
import { getTrend } from './get-trend';

const DateInput = z.object({
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});

export const analyticsRouter = router({
  kpiTotal: protectedProcedure.input(DateInput).query(async ({ input }) => {
    return getKpiTotals(input);
  }),
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
  topPages: protectedProcedure
    .input(
      DateInput.extend({
        sorting: z.enum(
          Object.values(TopPagesSorting) as TopPagesSortingValueTuple,
        ),
      }),
    )
    .query(async ({ input }) => {
      return getTopPages(input);
    }),
  topSources: protectedProcedure.input(DateInput).query(async ({ input }) => {
    return getTopSources(input);
  }),
  trend: protectedProcedure.input(DateInput).query(async ({ input }) => {
    return getTrend(input);
  }),
});
