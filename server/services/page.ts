import { NextApiRequest, NextApiResponse } from 'next';

import { getAdminApollo } from '$server/common/admin-apollo';
import {
  InsertOnePageDocument,
  PageByUrlDocument,
  PageByUrlQuery,
} from '$server/graphql/generated/page';

export async function handleGetPageByProject(
  req: NextApiRequest,
  res: NextApiResponse<PageByUrlQuery['pages'][number] | { error: string } | null>,
): Promise<void> {
  const { url, projectId, title } = req.query;
  if (typeof url !== 'string' || typeof projectId !== 'string') {
    return res.status(400).json({
      error: 'Expect valid url and projectId',
    });
  }
  const adminApollo = getAdminApollo();
  const pageResult = await adminApollo.query({
    query: PageByUrlDocument,
    variables: {
      url,
      projectId,
    },
  });
  const page = pageResult.data.pages[0];
  if (!page?.id) {
    const createdPage = await adminApollo.mutate({
      mutation: InsertOnePageDocument,
      variables: {
        projectId,
        url,
        title: title || '',
      },
    });
    if (!createdPage.data?.insertOnePage) {
      return res.status(400).json({
        error: 'Create page failed',
      });
    }

    res.json(createdPage.data?.insertOnePage);
  }
  // TODO: Update title?
  res.json(page);
}
