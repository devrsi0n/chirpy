import {
  corsRouter,
  createContext,
  createNextApiHandler,
} from '@chirpy-dev/trpc';
import { isENVProd } from '@chirpy-dev/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { log as axiomLog } from 'next-axiom';

import { nextCors } from '../../../server/common/cors';

export default async function trpcCors(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await nextCors(req, res);

  const log = axiomLog.with({
    scope: 'trpc',
  });
  const rsp = await createNextApiHandler({
    router: corsRouter,
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
