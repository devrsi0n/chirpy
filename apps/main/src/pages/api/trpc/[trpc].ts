import { appRouter, createNextApiHandler } from '@chirpy-dev/trpc';
import { createContext } from '@chirpy-dev/trpc';
import { NextApiResponse } from 'next';
import { AxiomAPIRequest, withAxiom } from 'next-axiom';

export default withAxiom(async (req: AxiomAPIRequest, res: NextApiResponse) => {
  const log = req.log.with({
    scope: 'trpc'
  })
  return createNextApiHandler({
    router: appRouter,
    createContext,
    onError: ({ path, error }) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`❌ tRPC failed on ${path}: ${error}`);
        return;
      }
      log.error(`❌ tRPC failed on ${path}: ${error}`);
    },
  })(req, res);
});
