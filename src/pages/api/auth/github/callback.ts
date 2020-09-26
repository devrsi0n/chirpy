import { NextApiRequest, NextApiResponse } from 'next';
import connect from 'next-connect';
import { handleInternalLoginFailure, handleSuccessfulLogin, passport } from '$server/passport';

export default connect<NextApiRequest, NextApiResponse>({
  onError: handleInternalLoginFailure,
}).use(
  passport.initialize(),
  passport.authenticate('github', { failureRedirect: '/login' }),
  handleSuccessfulLogin,
);
