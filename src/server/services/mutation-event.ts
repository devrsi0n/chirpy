import { NextApiRequest, NextApiResponse } from 'next';

// Handle mutation event trigger by hasura
export function handleMutationEvent(req: NextApiRequest, res: NextApiResponse<{}>) {
  console.log('handleMutationEvent body', req.body);
  console.log('handleMutationEvent get', req.query);
  res.end();
}
