import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import connect from 'next-connect';

import { handleInternalLoginFailure } from '$/server/services/common';
import { handleGetPageByProject } from '$/server/services/page';

const cors = Cors({
  // Only allow requests with GET, POST and OPTIONS
  methods: ['GET', 'POST', 'OPTIONS'],
});

const handler = connect<NextApiRequest, NextApiResponse>({
  onError: handleInternalLoginFailure,
});

handler.use(cors);

handler.get(handleGetPageByProject);

export default handler;
