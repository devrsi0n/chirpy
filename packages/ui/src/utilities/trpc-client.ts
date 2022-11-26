// import superjson from "superjson";

import { type AppRouter } from '@chirpy-dev/trpc/src/router';
import { getBaseUrl } from '@chirpy-dev/utils';
import { httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';

export const trpcClient = createTRPCNext<AppRouter>({
  config() {
    return {
      // transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      abortOnUnmount: true,
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 1000 * 2,
            cacheTime: 1000 * 60 * 60 * 72,
          },
        },
      },
    };
  },
  ssr: false,
});

/**
 * Inference helper for inputs
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;
/**
 * Inference helper for outputs
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;