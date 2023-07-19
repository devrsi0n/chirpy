import type { AppRouter } from '@chirpy-dev/trpc';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import superjson from 'superjson';

export const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_APP_URL}/api/trpc-cors`,
    }),
  ],
  transformer: superjson,
});
