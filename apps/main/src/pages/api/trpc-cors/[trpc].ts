import { corsRouter, createNextApiHandler } from '@chirpy-dev/trpc';
import { createContext } from '@chirpy-dev/trpc';
import { log } from 'next-axiom';
import { NextApiRequest, NextApiResponse } from 'next';
import { nextCors } from '../../../server/common/cors';

export default async function trpcCors(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await nextCors(req, res);

  return createNextApiHandler({
    router: corsRouter,
    createContext,
    onError: ({ path, error }) => {
      if(process.env.NODE_ENV === "development") {
        console.log(`❌ tRPC failed on ${path}: ${error}`);
        return;
      }
      log.error(`❌ tRPC failed on ${path}: ${error}`);
    },
  })(req, res);
}
