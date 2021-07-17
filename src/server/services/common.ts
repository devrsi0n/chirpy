import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorHandler } from 'next-connect';

export const handleInternalLoginFailure: ErrorHandler<NextApiRequest, NextApiResponse> = (
  err,
  req,
  res,
) => {
  console.error('internal error', err);
  console.error('query', req.query);
  // console.error('request env', req.env);

  res.status(500).end(`${process.env.NEXT_PUBLIC_APP_NAME} error: ${err.toString()}`);
};
