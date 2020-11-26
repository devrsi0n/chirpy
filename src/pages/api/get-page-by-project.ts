import connect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

import { handleInternalLoginFailure } from '$server/services/passport';
import { handleGetPageByProject } from '$server/services/page';

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
