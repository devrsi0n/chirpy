import { prisma, revalidateCommentWidgets } from '@chirpy-dev/trpc';
import { NextApiRequest, NextApiResponse } from 'next';

import { badRequest } from '$/server/utilities/response';

export async function revalidateWidgets(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const projectId = req.query.projectId;
  if (typeof projectId !== 'string' || projectId.length === 0) {
    badRequest(res, 'Invalid projectId');
    return;
  }
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    select: {
      pages: {
        select: {
          url: true,
        },
      },
    },
  });
  const pageURLs = project?.pages.map((p) => p.url) || [];
  await revalidateCommentWidgets(pageURLs, res);
  res.json({
    message: 'ok',
  });
}
