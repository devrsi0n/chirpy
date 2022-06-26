import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ req }) => {
      // We add a custom secret to verify the hasura event callback requests
      return (
        req.headers.get('hasura_event_secret') ===
        process.env.HASURA_EVENT_SECRET
      );
    },
  },
});
