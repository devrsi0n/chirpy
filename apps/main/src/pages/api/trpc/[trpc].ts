import {
  appRouter,
  createContext,
  createNextApiHandler,
} from '@chirpy-dev/trpc';
import { isENVProd } from '@chirpy-dev/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { log } from 'next-axiom';

export default async function trpcHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const rsp = await createNextApiHandler({
    router: appRouter,
    createContext,
    onError: ({ path, error }) => {
      if (!isENVProd) {
        console.log(`❌ tRPC failed on ${path}: ${error}`);
        return;
      }
      log.error(`❌ tRPC failed on ${path}: ${error}`);
    },
  })(req, res);
  await log.flush();
  return rsp;
}
