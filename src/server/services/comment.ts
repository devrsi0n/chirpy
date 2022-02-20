import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { getComment } from '$/server/gql/comment';
import { unauthorized } from '$/server/utilities/response';

export async function getCommentData(req: NextApiRequest, res: NextApiResponse<{}>) {
  const session = await getSession({ req });
  if (!session?.user.id) {
    unauthorized(res);
    return;
  }
  const { limit, offset } = req.body;
  // console.log('saving subscription', subscription);
  const data = await getComment(limit, offset);
  res.json(data as {});
  res.end();
}
