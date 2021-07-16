import { NextApiRequest, NextApiResponse } from 'next';
import connect from 'next-connect';

import { handleInternalLoginFailure } from '../services/common';

export const apiHandler = connect<NextApiRequest, NextApiResponse>({
  onError: handleInternalLoginFailure,
});
