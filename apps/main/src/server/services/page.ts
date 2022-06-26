import { NextApiRequest, NextApiResponse } from 'next';

import { getAdminGqlClient } from '$/lib/admin-gql-client';
import {
  InsertOnePageDocument,
  InsertOnePageMutation,
  PageByUrlDocument,
  PageByUrlQuery,
  UpdatePagesDocument,
} from '$/server/graphql/generated/page';

import { ERR_UNMATCHED_DOMAIN } from '../common/error-code';
import { ProjectByDomainDocument } from '../graphql/generated/project';
import { GetPagByUrl } from '../types/page';

export async function getPage(
  req: NextApiRequest,
  res: NextApiResponse<GetPagByUrl>,
): Promise<void> {
  const { url, domain, title } = req.query as {
    [key: string]: string;
  };

  const refererDomain = new URL(url).hostname;
  if (
    !url ||
    !domain ||
    (!isLocalDomain(refererDomain) && domain !== refererDomain)
  ) {
    return res.status(400).json({
      error: `url(${url}) and domain(${domain}) must be matched`,
    });
  }
  const client = getAdminGqlClient();
  const projectResult = await client
    .query(ProjectByDomainDocument, {
      domain,
    })
    .toPromise();
  const projectId = projectResult.data?.projects[0]?.id;
  if (!projectId) {
    return res.status(500).json({
      code: ERR_UNMATCHED_DOMAIN,
      error: `Wrong domain(${domain}), you may need to create a project first, or your configuration is wrong`,
    });
  }
  const pageResult = await client
    .query<PageByUrlQuery>(PageByUrlDocument, {
      url,
      projectId,
    })
    .toPromise();
  const page = pageResult.data?.pages[0];

  if (!page?.id) {
    const createdPage = await client
      .mutation<InsertOnePageMutation>(InsertOnePageDocument, {
        projectId,
        url,
        title: title || '',
      })
      .toPromise();
    if (!createdPage.data?.insertOnePage?.id) {
      return res.status(500).json({
        error: 'Create page failed',
      });
    }
    return res.json(createdPage.data?.insertOnePage);
  } else if (page.title !== title) {
    const updatePage = await client
      .mutation(UpdatePagesDocument, {
        projectId,
        url,
        title: title || '',
      })
      .toPromise();
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

const isLocalDomain = (domain: string) =>
  ['localhost', '127.0.0.1'].includes(domain);
