import { withAuth } from '@chirpy-dev/trpc/src/middlerware';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      // Anonymous user doesn't have an email address
      return !!(token?.email || token?.name);
    },
  },
});

export const config = {
  matcher: [
    '/dashboard',
    '/auth/delete-confirmation',
    '/auth/redirecting',
    '/auth/welcome',
    '/analytics/:path*',
    '/profile/:path*',
    '/theme/:path*',
    '/api/content-classifier/toxic-text',
  ],
};
