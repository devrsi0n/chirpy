import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import Providers from 'next-auth/providers';
import pg from 'pg';

import { HASURA_TOKEN_MAX_AGE, SESSION_MAX_AGE } from '$/lib/constants';
import { fillUserFields } from '$/server/services/user';
import { createAuthToken } from '$/server/utilities/create-token';
import { isENVDev } from '$/server/utilities/env';

pg.defaults.ssl = {
  rejectUnauthorized: false,
};

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'user:email',
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.Twitter({
      clientId: process.env.TWITTER_CONSUMER_KEY,
      clientSecret: process.env.TWITTER_CONSUMER_SECRET,
    }),
  ],
  session: {
    jwt: true,
    maxAge: SESSION_MAX_AGE,
  },
  jwt: {
    secret: process.env.HASH_KEY,
  },
  pages: {
    signIn: '/auth/sign-in',
  },
  callbacks: {
    /**
     * @param decodedToken Decrypted JSON Web Token
     * @param user User object (only available on sign in)
     * @param account Provider account (only available on sign in)
     * @param profile Provider profile (only available on sign in)
     * @param isNewUser True if new user (only available on sign in)
     * @return JSON Web Token that will be saved
     */
    async jwt(decodedToken, user, account, profile, isNewUser) {
      console.log('jwt', { decodedToken, user, account, profile, isNewUser });

      if (user) {
        await fillUserFields(user as any, profile as any, account?.provider as any);
      }
      return decodedToken;
    },
    async session(session, jwtPayload: JWT) {
      console.log({ session, jwtPayload });
      session.hasuraToken = createAuthToken(
        {
          userId: jwtPayload.sub!,
          name: jwtPayload.name!,
          email: jwtPayload.email!,
        },
        {
          maxAge: HASURA_TOKEN_MAX_AGE,
          allowedRoles: ['user'],
          defaultRole: 'user',
          role: 'user',
        },
      );
      if (session.user) {
        session.user.id = +jwtPayload.sub!;
      }
      return session;
    },
    async signIn(user, account, profile) {
      // Restrict access to people with verified accounts
      if (account.provider === 'google' && profile.verified_email !== true) {
        return false;
      }
      return true;
    },
  },
  database: process.env.DATABASE_URL,
  secret: process.env.HASH_KEY,
  debug: isENVDev,
});
