import { appRouter, createNextApiHandler } from '@chirpy-dev/trpc';
import { createContext } from '@chirpy-dev/trpc/src/context';
import { log } from 'next-axiom';

export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError: ({ path, error }) => {
    log.error(`❌ tRPC failed on ${path}: ${error}`);
  },
});
