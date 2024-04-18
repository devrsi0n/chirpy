import { prisma } from '@chirpy-dev/trpc';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { getAPIHandler } from '$/server/common/api-handler';

const handler = getAPIHandler();
handler.post(linkAuthor);

export default handler;

const SCHEMA = z.object({
  pageUrl: z.string().url(),
  email: z.string().email(),
  name: z.string(),
});

async function linkAuthor(req: NextApiRequest, res: NextApiResponse) {
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
  const result = SCHEMA.safeParse(JSON.parse(req.body));
  if (!result.success) {
    res.status(400).end('Bad request, expect pageURL, email and name');
    return;
  }
  const [author, proj] = await Promise.all([
    prisma.user.upsert({
      where: {
        email: result.data.email,
      },
      create: {
        email: result.data.email,
        name: result.data.name,
      },
      update: {
        name: result.data.name,
      },
    }),
    // Don'r upsert here, need to check user plan limitation first
    prisma.project.findUnique({
      where: {
        domain: new URL(result.data.pageUrl).hostname,
      },
    }),
  ]);
  if (!proj) {
    res
      .status(400)
      .end('Bad request, invalid page URL, please create a project first');
    return;
  }
  await prisma.page.upsert({
    where: {
      url: result.data.pageUrl,
    },
    create: {
      url: result.data.pageUrl,
      projectId: proj.id,
      authorId: author.id,
    },
    update: {
      authorId: author.id,
    },
  });
  res.status(200).end('ok');
}
