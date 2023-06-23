import { type GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';

import { nextAuthOptions } from '../auth/auth-options';

/**
 * Wrapper for getServerSession https://next-auth.js.org/configuration/nextjs
 * See example usage in trpc createContext or the restricted API route
 */
export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => {
  return await getServerSession(ctx.req, ctx.res, nextAuthOptions);
};
