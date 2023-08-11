import { sendWelcomeLetter } from '@chirpy-dev/emails';
import { isENVDev, SESSION_MAX_AGE } from '@chirpy-dev/utils';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import { GoogleProfile } from 'next-auth/providers/google';
import { log } from 'next-axiom';

import { prisma } from '../common/db-client';
import { authProviders } from './auth-providers';
import { defaultCookies } from './default-cookies';
// Fix build TS error
import '../../typings/next-auth.d';

export const nextAuthOptions: NextAuthOptions = {
  providers: authProviders,
  session: {
    strategy: 'jwt',
    maxAge: SESSION_MAX_AGE,
  },
  pages: {
    signIn: '/auth/sign-in',
    newUser: '/auth/welcome?isNewUser=true', // New users will be directed here on first sign in
    error: '/auth/sign-in', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request',
  },
  callbacks: {
    /**
     * @param token Decrypted JSON Web Token
     * @param user User object (only available on sign in)
     * @param account Provider account (only available on sign in)
     * @param profile Provider profile (only available on sign in)
     * @return JSON Web Token that will be saved
     */
    async jwt({ token /* user  account, profile */ }) {
      // TODO: Ask user to fill these fields, don't fill them automatically
      //if (user) {
      // await fillUserFields(
      //   user as any,
      //   profile as any,
      //   account?.provider as any,
      // );
      //}
      return {
        ...token,
      };
    },
    async session({ session, token }) {
      const userId = token.sub;
      if (!userId) {
        throw new Error(`Expect valid user id`);
      }
      const userData = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          name: true,
          username: true,
          email: true,
          image: true,
          plan: true,
          projects: {
            select: {
              id: true,
            },
          },
        },
      });
      if (!userData) {
        throw new Error(`Can't find the user for id: ${userId}`);
      }
      const editableProjectIds = userData?.projects.map(({ id }) => id);
      // Extra properties should be added here, jwt only save a small set of data due to cookie size limitation
      session.user = {
        id: userId,
        name: userData.name || session.user?.name || '',
        username: userData.username || '',
        email: userData.email || session.user?.email || '',
        image: userData.image || session.user?.image || '',
        plan: userData.plan || 'HOBBY',
        editableProjectIds,
      };
      return session;
    },
    // Link multiple accounts https://github.com/nextauthjs/next-auth/issues/296
    async signIn({ account, profile }) {
      // Restrict access to people with verified accounts
      if (
        account?.provider === 'google' &&
        (profile as GoogleProfile).email_verified !== true
      ) {
        return false;
      }
      return true;
    },
  },
  events: {
    async createUser({ user }) {
      if (!user.email) {
        return log.info('Create an anonymous user');
      }
      await sendWelcomeLetter({
        to: {
          name: user.name || user.email,
          email: user.email,
        },
      });
    },
  },
  cookies: defaultCookies(process.env.NEXTAUTH_URL.startsWith('https://')),
  adapter: PrismaAdapter(prisma),
  debug: isENVDev,
};
