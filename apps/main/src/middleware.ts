// import { withAuth } from '@chirpy-dev/trpc/src/middlerware';
import { NextRequest, NextResponse } from 'next/server';

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
     * 4. /examples (inside /public)
     * 5. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|fonts|images|videos|bootstrap|[\\w-]+\\.\\w+).*)',
  ],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname of request (e.g. chirpy.dev, demo.localhost:3000)
  const hostname = req.headers.get('host') || 'chirpy.dev';

  /*  You have to replace ".vercel.pub" with your own domain if you deploy this example under your domain.
      You can also use wildcard subdomains on .vercel.app links that are associated with your Vercel team slug
      in this case, our team slug is "platformize", thus *.platformize.vercel.app works. Do note that you'll
      still need to add "*.platformize.vercel.app" as a wildcard domain on your Vercel dashboard. */
  const currentHost =
    process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
      ? hostname
          .replace(`.chirpy.dev`, '')
          .replace(`.chirpy-dev.vercel.app`, '')
      : hostname.replace(`.localhost:3000`, '');
  // rewrites for app pages
  if (currentHost == 'app') {
    if (
      url.pathname === '/login' &&
      (req.cookies.get('next-auth.session-token') ||
        req.cookies.get('__Secure-next-auth.session-token'))
    ) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }

    url.pathname = `/app${url.pathname}`;
    return NextResponse.rewrite(url);
  } else if (currentHost === 'widget') {
    url.pathname = `/widget${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // rewrite root application to `/home` folder
  if (hostname === 'localhost:3000' || hostname === 'chirpy-dev.vercel.app') {
    url.pathname = `/home${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // rewrite everything else to `/_sites/[site] dynamic route
  url.pathname = `/_sites/${currentHost}${url.pathname}`;
  return NextResponse.rewrite(url);
}
