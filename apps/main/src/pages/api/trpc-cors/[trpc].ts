import { corsRouter, createNextApiHandler } from '@chirpy-dev/trpc';
import { createContext } from '@chirpy-dev/trpc';
import { AxiomAPIRequest, withAxiom } from 'next-axiom';
import { NextApiResponse } from 'next';
import { nextCors } from '../../../server/common/cors';

export default withAxiom(async function trpcCors(
  req: AxiomAPIRequest,
  res: NextApiResponse,
) {
  await nextCors(req, res);
  
  const log = req.log.with({ scope: 'trpc-cors' });
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
})
