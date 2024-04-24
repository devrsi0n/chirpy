import { type inferAsyncReturnType } from '@trpc/server';
import { type CreateNextContextOptions } from '@trpc/server/adapters/next';
import { type Session } from 'next-auth';

import { prisma } from './common/db-client';
import { getServerAuthSession } from './common/get-server-auth-session';
import { getWidgetSession } from './session';

type CreateContextOptions = {
  session: Session | null;
};

/** Use this helper for:
 * - testing, so we don't have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 **/
export const createContextInner = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;

  // Get the session from the server using the getServerSession wrapper function
  const session =
    (await getWidgetSession(req)) || (await getServerAuthSession({ req, res }));

  return {
    ...createContextInner({
      session,
    }),
    ...opts,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
