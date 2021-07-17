import { NextApiRequest, NextApiResponse } from 'next';

import { authHandler } from '$/server/common/auth-handler';
import { passport } from '$/server/services/passport';

export default function handleAuth(req: NextApiRequest, res: NextApiResponse) {
  console.log(`Auth callback`, req.query);
  const provider = req.query.provider as string;
  const scope = scopeMap[provider];
  return authHandler.use(
    passport.authenticate(provider, {
      ...(scope && { scope }),
    }),
  )(req, res);
}

const scopeMap: Record<string, string[]> = {
  github: ['user:email'],
  google: ['profile', 'email'],
};
