import { NextApiRequest, NextApiResponse } from 'next';

import { authHandler } from '$/server/common/auth-handler';
import { handleSuccessfulLogin, passport } from '$/server/services/passport';

export default function handleAuthCallback(req: NextApiRequest, res: NextApiResponse) {
  console.log(`Auth callback`, req.query);
  return authHandler.use(
    passport.authenticate(req.query.provider, { failureRedirect: '/sign-in' }),
    handleSuccessfulLogin,
  )(req, res);
}
