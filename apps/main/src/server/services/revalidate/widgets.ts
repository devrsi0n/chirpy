import { PageUrLsOfProjectDocument } from '@chirpy-dev/graphql';
import { NextApiRequest, NextApiResponse } from 'next';

import { query } from '$/server/common/gql';
import { badRequest } from '$/server/utilities/response';
import { revalidateCommentWidgets } from '$/server/utilities/revalidate';

export async function revalidateWidgets(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const projectId = req.query.projectId;
  if (typeof projectId !== 'string' || projectId.length === 0) {
    badRequest(res, 'Invalid projectId');
    return;
  }
  const project = await query(
    PageUrLsOfProjectDocument,
    {
      id: projectId,
    },
    'projectByPk',
  );
  const pageURLs = project.pages.map((p) => p.url);
  await revalidateCommentWidgets(pageURLs, res);
  res.json({
    message: 'ok',
  });
}
