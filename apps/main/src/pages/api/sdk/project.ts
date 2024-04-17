import { prisma } from '@chirpy-dev/trpc';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

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

const SCHEMA = z.object({
  domain: z.string(),
  name: z.string(),
});

async function createProject(req: NextApiRequest, res: NextApiResponse) {
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
    include: {
      user: {
        include: {
          projects: {
            select: {
              id: true,
            },
          },
        },
        select: {
          plan: true,
        },
      },
    },
  });
  if (!setting) {
    res.status(401).end('Unauthorized, invalid API key');
    return;
  }
  if (setting.user.plan === 'PRO' && setting.user.projects.length >= 10) {
    res
      .status(403)
      .end('Forbidden, too many projects. Please upgrade to Enterprise plan');
    return;
  }
  const result = SCHEMA.safeParse(JSON.parse(req.body));
  if (!result.success) {
    res.status(400).end(`Bad request, ${result.error}`);
    return;
  }
  try {
    const proj = await prisma.project.create({
      data: {
        name: result.data.name,
        domain: result.data.domain,
        userId: setting.user.id,
      },
    });
    res.status(200).json(proj);
  } catch (error) {
    console.error('create project failed', error);
    res
      .status(400)
      .end(`Bad request, create project failed, double check your input`);
  }
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
  if (!setting.user.projects[0]) {
    res
      .status(401)
      .end(
        'Unauthorized, cannot delete a project that does not belong to the caller',
      );
    return;
  }
  await prisma.project.delete({
    where: {
      domain,
    },
  });
  res.status(200).end('ok');
}
