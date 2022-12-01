import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import superjson from 'superjson';

import { createContextInner } from './context';
import { appRouter } from './router';

export const ssg = createProxySSGHelpers({
  router: appRouter,
  // @ts-ignore
  ctx: createContextInner({
    session: null,
  }),
  transformer: superjson,
});
