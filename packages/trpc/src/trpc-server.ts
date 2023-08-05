import { initTRPC, TRPCError } from '@trpc/server';
import { log } from 'next-axiom';
import superjson from 'superjson';

import { type Context } from './context';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;

const logger = t.middleware(async ({ path, type, next }) => {
  const start = Date.now();
  const result = await next();
  const durationMs = Date.now() - start;
  result.ok
    ? log.info('[tRPC Server] request ok:', { path, type, durationMs })
    : log.error('[tRPC Server] request failed', { path, type, durationMs });
  await log.flush();
  return result;
});

const loggedProcedure = t.procedure.use(logger);

export const publicProcedure = loggedProcedure;

/**
 * Reusable middleware to ensure
 * users are logged in
 */
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const protectedProcedure = loggedProcedure.use(isAuthed);
