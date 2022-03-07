import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: async ({ token, req }) => {
      return token?.type === 'admin';
    },
  },
});
