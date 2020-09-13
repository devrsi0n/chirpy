import connect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { handleFailedLogin, passport } from '$server/passport';

const handler = connect<NextApiRequest, NextApiResponse>({
  onError: handleFailedLogin,
});

handler.use(
  passport.initialize(),
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

export default handler;
