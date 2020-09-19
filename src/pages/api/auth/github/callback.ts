import { NextApiRequest, NextApiResponse } from 'next';
import connect from 'next-connect';
import { handleFailedLogin, handleSuccessfulLogin, passport } from '$server/passport';

export default connect<NextApiRequest, NextApiResponse>({
  onError: handleFailedLogin,
}).use(
  passport.initialize(),
  passport.authenticate('github', { failureRedirect: '/login' }),
  handleSuccessfulLogin,
);
