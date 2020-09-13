import { NextApiRequest, NextApiResponse } from 'next';
import connect from 'next-connect';
import { handleFailedLogin, passport } from '$server/passport';

const handler = connect<NextApiRequest, NextApiResponse>({
  onError: handleFailedLogin,
});

handler.use(
  passport.initialize(),
  passport.authenticate('github', {
    scope: ['user:email'],
  }),
);

export default handler;
