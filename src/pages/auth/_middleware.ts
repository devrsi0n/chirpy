import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      // Only allow access /auth/sign-in without authorized
      if (req.url.includes('auth/sign-in')) {
        return true;
      }
      return !!token?.email;
    },
  },
});
