import { NextApiRequest, NextApiResponse } from 'next';

import { apiHandler } from '$/server/common/api-handler';
import { handleSuccessfulLogin, passport } from '$/server/services/passport';

export default function handleAuthCallback(req: NextApiRequest, res: NextApiResponse) {
  return apiHandler.use(
    passport.initialize(),
    passport.authenticate(req.query.provider, { failureRedirect: '/sign-in' }),
    handleSuccessfulLogin,
  )(req, res);
}
