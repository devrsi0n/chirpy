import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorHandler } from 'next-connect';

export const handleInternalLoginFailure: ErrorHandler<NextApiRequest, NextApiResponse> = (
  err,
  req,
  res,
) => {
  console.error(err);
  console.error(req.query);
  console.error(req.env);

  res.status(500).end(`${process.env.NEXT_PUBLIC_APP_NAME} error: ${err.toString()}`);
};
