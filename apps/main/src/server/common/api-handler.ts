import { NextApiRequest, NextApiResponse } from 'next';
import { log } from 'next-axiom';
import connect, { ErrorHandler } from 'next-connect';

import { APIError } from './api-error';

export const handleInternalFailure: ErrorHandler<
  NextApiRequest,
  NextApiResponse
> = (error, req, res) => {
  log.error('internal error', error);
  log.error('query', req.query);
  log.error('body', req.body);

  if (error instanceof APIError) {
    return res.status(error.httpStatus).send(error.message);
  }

  res.status(500).end(`[Chirpy] error: ${error.toString()}`);
};

export const getAPIHandler = () =>
  connect<NextApiRequest, NextApiResponse>({
    onError: handleInternalFailure,
  });
