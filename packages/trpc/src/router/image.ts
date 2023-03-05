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
    const rsp = (await rspRaw.json()) as UploadUrlResponse;
    return rsp.result.uploadURL;
  }),
});

interface UploadUrlResponse {
  result: UploadUrlResult;
  result_info: null;
  success: boolean;
  errors: string[];
  messages: string[];
}

interface UploadUrlResult {
  id: string;
  uploadURL: string;
}
