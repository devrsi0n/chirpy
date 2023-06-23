import { z } from 'zod';

export const AnalyticsInput = z.object({
  domain: z.string(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});
export type AnalyticsInput = z.infer<typeof AnalyticsInput>;
