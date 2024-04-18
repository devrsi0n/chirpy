import { prisma } from '@chirpy-dev/trpc';
import type { NextApiRequest, NextApiResponse } from 'next';

import { getAPIHandler } from '$/server/common/api-handler';

const handler = getAPIHandler();
handler.get(getPage);

export default handler;

async function getPage(req: NextApiRequest, res: NextApiResponse) {
  const auth = req.headers.authorization;
  const apiKey = auth?.split(' ')[1];
  if (!auth || !apiKey) {
    res.status(401).end('Unauthorized, missing API key');
    return;
  }
  const setting = await prisma.settings.findUnique({
    where: {
      sdkKey: apiKey,
    },
  });
  if (!setting) {
    res.status(401).end('Unauthorized, invalid API key');
    return;
  }
  const page = await prisma.page.findUnique({
    where: {
      url: req.query.url as string,
    },
    include: {
      // Used to count comments
      comments: true,
    },
  });
  res.status(200).json(page);
}
