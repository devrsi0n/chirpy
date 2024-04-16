import { prisma } from '@chirpy-dev/trpc';
import type { NextApiRequest, NextApiResponse } from 'next';

import { getAPIHandler } from '$/server/common/api-handler';

const handler = getAPIHandler();
handler.get(getProject);
handler.post(createProject);
handler.delete(deleteProject);

export default handler;

async function getProject(req: NextApiRequest, res: NextApiResponse) {
  const auth = req.headers.authorization;
  const apiKey = auth?.split(' ')[1];
  if (!auth || !apiKey) {
    res.status(401).end('Unauthorized, missing API key');
    return;
  }
  const domain = req.query.domain as string;
  if (!domain) {
    res.status(400).end('Bad request, missing domain');
    return;
  }
  const setting = await prisma.settings.findUnique({
    where: {
      sdkKey: apiKey,
    },
    include: {
      user: {
        include: {
          projects: {
            where: {
              domain,
            },
          },
        },
      },
    },
  });
  if (!setting) {
    res.status(401).end('Unauthorized, invalid API key');
    return;
  }
  // console.log('setting', setting);
  res.status(200).json(setting.user.projects[0] || null);
}

async function createProject(req: NextApiRequest, res: NextApiResponse) {
  const auth = req.headers.authorization;
  const apiKey = auth?.split(' ')[1];
  if (!auth || !apiKey) {
    res.status(401).end('Unauthorized, missing API key');
    return;
  }
  const domain = req.query.domain as string;
  if (!domain) {
    res.status(400).end('Bad request, missing domain');
    return;
  }
  const setting = await prisma.settings.findUnique({
    where: {
      sdkKey: apiKey,
    },
    include: {
      user: true,
    },
  });
  if (!setting) {
    res.status(401).end('Unauthorized, invalid API key');
    return;
  }
  const proj = await prisma.project.create({
    data: {
      name: req.query.name as string,
      domain,
      userId: setting.user.id,
    },
  });
  res.status(200).json(proj);
}

async function deleteProject(req: NextApiRequest, res: NextApiResponse) {
  const auth = req.headers.authorization;
  const apiKey = auth?.split(' ')[1];
  if (!auth || !apiKey) {
    res.status(401).end('Unauthorized, missing API key');
    return;
  }
  const domain = req.query.domain as string;
  if (!domain) {
    res.status(400).end('Bad request, missing domain');
    return;
  }
  const setting = await prisma.settings.findUnique({
    where: {
      sdkKey: apiKey,
    },
    include: {
      user: true,
    },
  });
  if (!setting) {
    res.status(401).end('Unauthorized, invalid API key');
    return;
  }
  await prisma.project.delete({
    where: {
      domain,
    },
  });
  res.status(200).end('ok');
}
