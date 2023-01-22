import { JSONContent } from '@chirpy-dev/utils';
import { z } from 'zod';

/**
 * validator of type
 * ```ts
 * export declare type JSONContent = {
 *  type?: string;
 *   attrs?: Record<string, any>;
 *   content?: JSONContent[];
 *   marks?: {
 *       type: string;
 *       attrs?: Record<string, any>;
 *       [key: string]: any;
 *   }[];
 *   text?: string;
 *   [key: string]: any;
 * };
 * ```
 */
export const rteContentValidator: z.ZodType<JSONContent> = z.lazy(
  () =>
    z
      .object({
        type: z.string().optional(),
        attrs: z.record(z.any()).optional(),
        content: z.array(rteContentValidator).optional(),
        marks: z
          .array(
            z.object({
              type: z.string(),
              attrs: z.record(z.any()).optional(),
            }),
          )
          .optional(),
        text: z.string().optional(),
      })
      .passthrough(), // Only check a sub set of fields, don't strip unknown fields
);

export const notificationSubscriptionValidator = z
  .object({
    endpoint: z.string().url(),
  })
  .passthrough();
