import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { protectedProcedure, tRouter } from '../trpc-server';

export const imageRouter = tRouter({
  uploadUrl: protectedProcedure.query(async () => {
    const rspRaw = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_TOKEN}/images/v2/direct_upload `,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_IMAGE_TOKEN}`,
        },
      },
    );
    const rsp = (await rspRaw.json()) as CfResponse<UploadUrlResult>;
    return rsp.result.uploadURL;
  }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ input: url }) => {
      // URL format: "https://imagedelivery.net/<ACCOUNT_HASH>/<IMAGE_ID>/<VARIANT_NAME>"
      const imageId = url.split('/')[4];
      if (!imageId) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
        });
      }
      const rspRaw = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_TOKEN}/images/v1/${imageId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${process.env.CLOUDFLARE_IMAGE_TOKEN}`,
          },
        },
      );
      const rsp = (await rspRaw.json()) as CfResponse<Record<string, never>>;
      return rsp;
    }),
});

interface CfResponse<T> {
  result: T;
  result_info: null;
  success: boolean;
  errors: string[];
  messages: string[];
}

interface UploadUrlResult {
  id: string;
  uploadURL: string;
}
