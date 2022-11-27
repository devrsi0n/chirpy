import { withAuth } from '@chirpy-dev/trpc';

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
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
    '/api/mutation-event',
    '/api/revalidate/widgets',
  ],
};
