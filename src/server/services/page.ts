import { NextApiRequest, NextApiResponse } from 'next';

import { getAdminApollo } from '$/server/common/admin-apollo';
import {
  InsertOnePageDocument,
  PageByUrlDocument,
  UpdatePagesDocument,
} from '$/server/graphql/generated/page';

import { ERR_UNMATCHED_DOMAIN } from '../common/error-code';
import { GetPagByUrl } from '../types/page';

export async function handleGetPage(
  req: NextApiRequest,
  res: NextApiResponse<GetPagByUrl>,
): Promise<void> {
  const { url, projectId, title } = req.query;
  if (!url || !projectId) {
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
  const domain = new URL(url as string).hostname;
  if (domain !== page?.project.domain && !isLocalDomain(domain)) {
    return res.status(500).json({
      code: ERR_UNMATCHED_DOMAIN,
      error: `Wrong domain(${domain}), expected domain(${page.project.domain}), please contact your site administrator`,
    });
  }
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
      return res.status(500).json({
        error: 'Create page failed',
      });
    }
    return res.json(createdPage.data?.insertOnePage);
  } else if (page.title !== title) {
    const updatePage = await adminApollo.mutate({
      mutation: UpdatePagesDocument,
      variables: {
        projectId,
        url,
        title: title || '',
      },
    });
    if (
      updatePage.data?.updatePages?.affected_rows !== 1 ||
      !updatePage.data.updatePages?.returning[0].id
    ) {
      return res.status(500).json({
        error: 'Update page error',
      });
    }
  }

  res.json(page);
}

const isLocalDomain = (domain: string) => ['localhost', '127.0.0.1'].includes(domain);
