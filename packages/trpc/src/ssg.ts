import { createServerSideHelpers } from '@trpc/react-query/server';
import superjson from 'superjson';

import { createContextInner } from './context';
import { appRouter } from './router';

export const ssg = createServerSideHelpers({
  router: appRouter,
  // @ts-ignore
  ctx: createContextInner({
    session: null,
  }),
  transformer: superjson,
});
