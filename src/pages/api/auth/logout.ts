import { NextApiRequest, NextApiResponse } from 'next';
import connect from 'next-connect';

import { handleInternalLoginFailure } from '$/server/services/common';
import { handleLogout } from '$/server/services/passport';

const handler = connect<NextApiRequest, NextApiResponse>({
  onError: handleInternalLoginFailure,
});

handler.get(handleLogout);

export default handler;
