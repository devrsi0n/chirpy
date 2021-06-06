import { NextApiRequest, NextApiResponse } from 'next';
import connect from 'next-connect';

import { sessionMiddleware } from '$server/middlewares/session';
import { handleInternalLoginFailure } from '$server/services/common';
import { handleRecordEvent } from '$server/services/event';

const handler = connect<NextApiRequest, NextApiResponse>({
  onError: handleInternalLoginFailure,
});

handler.use(sessionMiddleware);
handler.post(handleRecordEvent);

export default handler;
