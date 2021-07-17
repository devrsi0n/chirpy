import { NextApiRequest, NextApiResponse } from 'next';

import { apiHandler } from '$/server/common/api-handler';
import { passport } from '$/server/services/passport';

export default function handleAuth(req: NextApiRequest, res: NextApiResponse) {
  const provider = req.query.provider as string;
  console.log('provider', provider);

  const scope = scopeMap[provider];
  return apiHandler.use(
    passport.initialize(),
    passport.authenticate(provider, {
      ...(scope && { scope }),
    }),
  )(req, res);
}

const scopeMap: Record<string, string[]> = {
  github: ['user:email'],
  google: ['profile', 'email'],
};
