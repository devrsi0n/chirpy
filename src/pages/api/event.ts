import { NextApiRequest, NextApiResponse } from 'next';
import connect from 'next-connect';

import { telemetrySessionMiddleware } from '$/server/middlewares/telemetry-session';
import { handleInternalLoginFailure } from '$/server/services/common';
import { handleRecordEvent } from '$/server/services/event';

const handler = connect<NextApiRequest, NextApiResponse>({
  onError: handleInternalLoginFailure,
});

handler.use(telemetrySessionMiddleware);
handler.post(handleRecordEvent);

export default handler;
