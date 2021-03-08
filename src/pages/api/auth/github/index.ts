import { NextApiRequest, NextApiResponse } from 'next';
import connect from 'next-connect';
import { passport } from '$server/services/passport';
import { handleInternalLoginFailure } from "$server/services/common";

const handler = connect<NextApiRequest, NextApiResponse>({
  onError: handleInternalLoginFailure,
});

handler.use(
  passport.initialize(),
  passport.authenticate('github', {
    scope: ['user:email'],
  }),
);

export default handler;
