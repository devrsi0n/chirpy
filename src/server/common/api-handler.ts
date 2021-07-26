import { NextApiRequest, NextApiResponse } from 'next';
import connect, { ErrorHandler } from 'next-connect';

import { ApiError } from './error';

export const handleInternalFailure: ErrorHandler<NextApiRequest, NextApiResponse> = (
  error,
  req,
  res,
) => {
  console.error('internal error', error);
  console.error('query', req.query);
  // console.error('request env', req.env);

  if (error instanceof ApiError) {
    return res.status(error.httpStatus).send(error.message);
  }

  res.status(500).end(`${process.env.NEXT_PUBLIC_APP_NAME} error: ${error.toString()}`);
};

export const apiHandler = connect<NextApiRequest, NextApiResponse>({
  onError: handleInternalFailure,
});
