import { NextAuth } from '@chirpy-dev/trpc';
import { getNextAuthOptions } from '@chirpy-dev/trpc/src/auth/auth-options';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const options = getNextAuthOptions(req);
  return await NextAuth(options)(req, res);
}
