import connect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { passport } from '$server/services/passport';
import { handleInternalLoginFailure } from "$server/services/common";

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
