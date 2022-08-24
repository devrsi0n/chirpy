import { withAuth } from 'next-auth/middleware';
import { withAxiom } from 'next-axiom';

export default withAxiom(
  withAuth({
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname.includes('/api/mutation-event')) {
          // We add a custom secret to verify the hasura event callback requests
          return (
            req.headers.get('hasura_event_secret') ===
            process.env.HASURA_EVENT_SECRET
          );
        }
        // Anonymous user doesn't have an email address
        return !!(token?.email || token?.name);
      },
    },
  }),
);

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
    '/api/notification',
  ],
};
