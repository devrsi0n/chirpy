import { createProxySSGHelpers } from '@trpc/react-query/ssg';

// import superjson from "superjson";
import { createContextInner } from './context';
import { appRouter } from './router';

export { createContext } from './context';
export * from './auth';
export * from './trpc-server';
export * from './common/db';
export { createNextApiHandler } from '@trpc/server/adapters/next';
export { appRouter } from './router';

export const ssg = createProxySSGHelpers({
  router: appRouter,
  ctx: createContextInner({
    session: null,
  }),
  // transformer: superjson,
});