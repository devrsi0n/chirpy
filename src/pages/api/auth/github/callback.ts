import { NextApiRequest, NextApiResponse } from 'next';
import connect from 'next-connect';

import { handleSuccessfulLogin, passport } from '$server/services/passport';
import { handleInternalLoginFailure } from '$server/services/common';

export default connect<NextApiRequest, NextApiResponse>({
  onError: handleInternalLoginFailure,
}).use(
  passport.initialize(),
  passport.authenticate('github', { failureRedirect: '/sign-in' }),
  handleSuccessfulLogin,
);
