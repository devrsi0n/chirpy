import { NextRequest, NextResponse } from 'next/server';

import { parseMiddlewareUrl } from './utils';

export function widgetMiddleware(req: NextRequest) {
  const { url } = parseMiddlewareUrl(req);
  url.pathname = `/widget${url.pathname}`;
  const rsp = NextResponse.rewrite(url);
  rsp.headers.set('Access-Control-Allow-Origin', '*');
  return rsp;
}
