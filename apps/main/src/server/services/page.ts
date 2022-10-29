import {
  InsertOnePageDocument,
  PageByUrlDocument,
  UpdatePagesDocument,
  ProjectByDomainDocument,
} from '@chirpy-dev/graphql';
import { NextApiRequest, NextApiResponse } from 'next';

import { ERR_UNMATCHED_DOMAIN } from '../common/error-code';
import { mutate, query } from '../common/gql';
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
  const projects = await query(
    ProjectByDomainDocument,
    {
      domain,
    },
    'projects',
  );
  const projectId = projects[0]?.id;
  if (!projectId) {
    return res.status(500).json({
      code: ERR_UNMATCHED_DOMAIN,
      error: `Wrong domain(${domain}), you may need to create a project first, or your configuration is wrong`,
    });
  }
  const pages = await query(
    PageByUrlDocument,
    {
      url,
      projectId,
    },
    'pages',
  );
  const page = pages[0];

  if (!page?.id) {
    const insertOnePage = await mutate(
      InsertOnePageDocument,
      {
        projectId,
        url,
        title: title || '',
      },
      'insertOnePage',
    );

    if (!insertOnePage?.id) {
      // TODO: Handle duplicated pages
      return res.status(500).json({
        error: 'Create page failed',
      });
    }
    return res.json(insertOnePage);
  } else if (page.title !== title) {
    const updatePages = await mutate(
      UpdatePagesDocument,
      {
        projectId,
        url,
        title: title || '',
      },
      'updatePages',
    );

    if (updatePages?.affected_rows !== 1 || !updatePages?.returning[0].id) {
      return res.status(500).json({
        error: 'Update page error',
      });
    }
  }

  res.json(page);
}

const isLocalDomain = (domain: string) =>
  ['localhost', '127.0.0.1'].includes(domain);
