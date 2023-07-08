import { z } from 'zod';

export const ANALYTICS_INPUT = z.object({
  domain: z.string(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});

export type AnalyticsInput = z.infer<typeof ANALYTICS_INPUT>;
