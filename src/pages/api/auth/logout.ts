import connect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { handleLogout } from '$server/services/passport';
import { handleInternalLoginFailure } from "$server/services/common";

const handler = connect<NextApiRequest, NextApiResponse>({
  onError: handleInternalLoginFailure,
});

handler.get(handleLogout);

export default handler;
