import { appRouter, createNextApiHandler } from '@chirpy-dev/trpc';
import { createContext } from '@chirpy-dev/trpc';
import { log } from 'next-axiom';

export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError: ({ path, error }) => {
    if(process.env.NODE_ENV === "development") {
      console.log(`❌ tRPC failed on ${path}: ${error}`);
      return;
    }
    log.error(`❌ tRPC failed on ${path}: ${error}`);
  },
});
