import { getWidgetSession, isWidgetRequest, NextAuth } from '@chirpy-dev/trpc';
import { getNextAuthOptions } from '@chirpy-dev/trpc/src/auth/auth-options';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const isWidget = isWidgetRequest(req);
  if (
    isWidget &&
    req.url?.endsWith('/api/auth/session') &&
    req.method === 'GET'
  ) {
    // Used by widget/iframe, nextauth can't handle auth via http header
    const session = await getWidgetSession(req);
    return res.status(200).json(session || {});
  }

  const options = getNextAuthOptions(req);
  return await NextAuth(options)(req, res);
}
