// import { withAuth } from '@chirpy-dev/trpc/src/middlerware';
import { HOME_DOMAINS } from '@chirpy-dev/utils';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

import { parseMiddlewareUrl, sitesMiddlewares } from './server/middlewares';

// TODO: Add auth for app pages
// const auth = withAuth({
//   callbacks: {
//     authorized: ({ token }) => {
//       // Anonymous user doesn't have an email address
//       return !!(token?.email || token?.name);
//     },
//   },
// });

export const authMatcher = [
  '/dashboard',
  '/auth/delete-confirmation',
  '/auth/redirecting',
  '/auth/welcome',
  '/analytics/:path*',
  '/profile/:path*',
  '/theme/:path*',

  // Don't add /api/content-classifier/toxic-text here,
  // it's used by the comment-widget-preview,
  // so it should be public
  // '/api/content-classifier/toxic-text',
];

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|fonts|images|videos|bootstrap|[\\w-]+\\.\\w+).*)',
  ],
};

export default function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { url, host, currentHost } = parseMiddlewareUrl(req);

  // rewrites for app pages
  if (currentHost == 'app') {
    url.pathname = `/app${url.pathname}`;
    return NextResponse.rewrite(url);
  } else if (currentHost === 'widget') {
    url.pathname = `/widget${url.pathname}`;
    const rsp = NextResponse.rewrite(url);
    rsp.headers.set('Access-Control-Allow-Origin', '*');
    return rsp;
  }

  // rewrite root application to `/home` folder
  if (HOME_DOMAINS.includes(host)) {
    url.pathname = `/home${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // Rewrite all other requests to the `sites` folder
  return sitesMiddlewares(req, ev);
}
