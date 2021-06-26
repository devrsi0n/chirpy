import { NextApiRequest, NextApiResponse } from 'next';
import connect from 'next-connect';

import { handleInternalLoginFailure } from '$/server/services/common';
import { handleSuccessfulLogin, passport } from '$/server/services/passport';

export default connect<NextApiRequest, NextApiResponse>({
  onError: handleInternalLoginFailure,
}).use(
  passport.initialize(),
  passport.authenticate('google', { failureRedirect: '/sign-in' }),
  handleSuccessfulLogin,
);
