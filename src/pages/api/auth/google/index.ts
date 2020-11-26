import connect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { handleInternalLoginFailure, passport } from '$server/services/passport';

const handler = connect<NextApiRequest, NextApiResponse>({
  onError: handleInternalLoginFailure,
});

handler.use(
  passport.initialize(),
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

export default handler;
