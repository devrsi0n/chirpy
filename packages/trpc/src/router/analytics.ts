import { ANALYTICS_INPUT } from '../services/analytics/constants';
import {
  CURRENT_VISITORS_INPUT,
  getCurrentVisitors,
} from '../services/analytics/get-current-visitors';
import {
  getKpis,
  getKpiTotals,
  KPIS_INPUT,
} from '../services/analytics/get-kpis';
import {
  getPageViewMetric,
  PAGEVIEW_METRIC_INPUT,
} from '../services/analytics/get-pageview-metric';
import { getTopBrowser } from '../services/analytics/get-top-browser';
import { getTopDevice } from '../services/analytics/get-top-device';
import {
  getTopLocations,
  TOP_LOCATIONS_INPUT,
} from '../services/analytics/get-top-locations';
import {
  getTopPages,
  TOP_PAGES_INPUT,
} from '../services/analytics/get-top-pages';
import { getTopSources } from '../services/analytics/get-top-source';
import { getTrend } from '../services/analytics/get-trend';
import { protectedProcedure, router } from '../trpc-server';

export const analyticsRouter = router({
  kpiTotal: protectedProcedure
    .input(ANALYTICS_INPUT)
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
    .input(ANALYTICS_INPUT)
    .query(async ({ input }) => {
      return getTopBrowser(input);
    }),
  topDevice: protectedProcedure
    .input(ANALYTICS_INPUT)
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
    .input(ANALYTICS_INPUT)
    .query(async ({ input }) => {
      return getTopSources(input);
    }),
  trend: protectedProcedure.input(ANALYTICS_INPUT).query(async ({ input }) => {
    return getTrend(input);
  }),
  pageviewMetric: protectedProcedure
    .input(PAGEVIEW_METRIC_INPUT)
    .query(async ({ input }) => {
      return getPageViewMetric(input);
    }),
});
