import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

import { parseMiddlewareUrl } from './utils';

export function sitesMiddlewares(
  req: NextRequest,
  _ev: NextFetchEvent,
): NextResponse {
  const { url, currentHost } = parseMiddlewareUrl(req);
  // rewrite everything else to `/_sites/[site] dynamic route
  url.pathname = `/_sites/${currentHost}${url.pathname}`;
  return NextResponse.rewrite(url);
}
