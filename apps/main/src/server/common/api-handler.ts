import { NextApiRequest, NextApiResponse } from 'next';
import { log } from 'next-axiom';
import { createRouter } from 'next-connect';

import { APIError } from './api-error';

export const handleInternalFailure = (
  error: unknown,
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  log.error('internal error', { error: String(error) });
  log.error('query', req.query);
  log.error('body', req.body);

  if (error instanceof APIError) {
    return res.status(error.httpStatus).send(error.message);
  }

  res.status(500).end(`[Chirpy] error: ${String(error)}`);
};

export const getAPIHandler = () =>
  createRouter<NextApiRequest, NextApiResponse>();
