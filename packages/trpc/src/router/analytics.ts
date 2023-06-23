import { AnalyticsInput } from '../analytics/constants';
import {
  CURRENT_VISITORS_INPUT,
  getCurrentVisitors,
} from '../analytics/get-current-visitors';
import { KPIS_INPUT, getKpiTotals, getKpis } from '../analytics/get-kpis';
import { getTopBrowser } from '../analytics/get-top-browser';
import { getTopDevice } from '../analytics/get-top-device';
import {
  TOP_LOCATIONS_INPUT,
  getTopLocations,
} from '../analytics/get-top-locations';
import { TOP_PAGES_INPUT, getTopPages } from '../analytics/get-top-pages';
import { getTopSources } from '../analytics/get-top-source';
import { getTrend } from '../analytics/get-trend';
import { router, protectedProcedure } from '../trpc-server';

export const analyticsRouter = router({
  kpiTotal: protectedProcedure
    .input(AnalyticsInput)
    .query(async ({ input }) => {
      return getKpiTotals(input);
    }),
  kpis: protectedProcedure.input(KPIS_INPUT).query(async ({ input }) => {
    return getKpis(input);
  }),
  currentVisitor: protectedProcedure
    .input(CURRENT_VISITORS_INPUT)
    .query(async ({ input }) => {
      return getCurrentVisitors(input);
    }),
  topBrowser: protectedProcedure
    .input(AnalyticsInput)
    .query(async ({ input }) => {
      return getTopBrowser(input);
    }),
  topDevice: protectedProcedure
    .input(AnalyticsInput)
    .query(async ({ input }) => {
      return getTopDevice(input);
    }),
  topLocation: protectedProcedure
    .input(TOP_LOCATIONS_INPUT)
    .query(async ({ input }) => {
      return getTopLocations(input);
    }),
  topPages: protectedProcedure
    .input(TOP_PAGES_INPUT)
    .query(async ({ input }) => {
      return getTopPages(input);
    }),
  topSources: protectedProcedure
    .input(AnalyticsInput)
    .query(async ({ input }) => {
      return getTopSources(input);
    }),
  trend: protectedProcedure.input(AnalyticsInput).query(async ({ input }) => {
    return getTrend(input);
  }),
});
