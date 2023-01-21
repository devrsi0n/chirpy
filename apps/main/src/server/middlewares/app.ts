import { NextRequest, NextResponse } from 'next/server';

import { parseMiddlewareUrl } from './utils';

export function appMiddleware(req: NextRequest) {
  const { url } = parseMiddlewareUrl(req);
  const hasAuthCookie =
    req.cookies.get('__Secure-next-auth.session-token') ||
    req.cookies.get('next-auth.session-token');

  if (!url.pathname.startsWith('/auth/') && !hasAuthCookie) {
    // Redirect to sign-in page if not authenticated
    url.pathname = '/auth/sign-in';
    return NextResponse.redirect(url);
  }
  if (url.pathname === '/auth/sign-in' && hasAuthCookie) {
    // Redirect to home page if already authenticated
    url.pathname = '/';
    return NextResponse.redirect(url);
  }
  url.pathname = `/app${url.pathname}`;
  return NextResponse.rewrite(url);
}
