import { prisma } from '@chirpy-dev/trpc';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { getAPIHandler } from '$/server/common/api-handler';

const handler = getAPIHandler();
handler.post(createUser);

export default handler;

const schema = z.object({
  email: z.string().email(),
  name: z.string(),
});

async function createUser(req: NextApiRequest, res: NextApiResponse) {
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
  const result = schema.safeParse(JSON.parse(req.body));
  if (!result.success) {
    res.status(400).end(`Bad request, ${result.error}`);
    return;
  }
  try {
    const user = await prisma.user.create({
      data: {
        email: result.data.email,
        name: result.data.name,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.error('create user failed', error);
    res
      .status(400)
      .end(`Bad request, create user failed, double check your input`);
  }
}
