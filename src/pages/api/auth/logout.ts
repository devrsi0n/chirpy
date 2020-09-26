import connect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { handleInternalLoginFailure, handleLogout } from '$server/passport';

const handler = connect<NextApiRequest, NextApiResponse>({
  onError: handleInternalLoginFailure,
});

handler.get(handleLogout);

export default handler;
