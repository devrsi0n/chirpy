import { NextApiRequest, NextApiResponse } from 'next';

import { badRequest } from '$/server/utilities/response';

export async function revalidateTheme(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const domain = req.query.domain;
  if (typeof domain !== 'string' || domain.length === 0) {
    badRequest(res, 'Invalid domain');
    return;
  }
  res.revalidate(`/theme/${domain}`);
  res.json({
    message: 'ok',
  });
}
