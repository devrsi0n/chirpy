import { isHomeHost } from '@chirpy-dev/utils';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

import {
  appMiddleware,
  parseMiddlewareUrl,
  sitesMiddlewares,
  widgetMiddleware,
} from './server/middlewares';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts|images|videos|bootstrap (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|fonts|images|videos|bootstrap|[\\w-]+\\.\\w+).*)',
  ],
};

export default function middleware(
  req: NextRequest,
  ev: NextFetchEvent,
): NextResponse {
  const { url, host, currentHost } = parseMiddlewareUrl(req);
  // console.log({ url, host, currentHost });
  // Rewrites for app pages
  if (currentHost == 'app') {
    return appMiddleware(req);
  } else if (currentHost === 'widget') {
    return widgetMiddleware(req);
  }

  // Rewrite root application to `/home` folder
  if (isHomeHost(host)) {
    url.pathname = `/home${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // Rewrite all other requests to the `sites` folder
  return sitesMiddlewares(req, ev);
}
