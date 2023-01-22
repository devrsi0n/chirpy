import { sendWelcomeLetter } from '@chirpy-dev/emails';
import {
  APP_ORIGIN,
  HOME_ORIGIN,
  isENVDev,
  SESSION_MAX_AGE,
} from '@chirpy-dev/utils';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import { GithubProfile } from 'next-auth/providers/github';
import { GoogleProfile } from 'next-auth/providers/google';
import { log } from 'next-axiom';

import { prisma } from '../db/client';
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
    signIn: `${APP_ORIGIN}/auth/sign-in`,
    newUser: `${APP_ORIGIN}/welcome?isNewUser=true`, // New users will be directed here on first sign in
    error: `${APP_ORIGIN}/auth/sign-in`, // Error code passed in query string as ?error=
    verifyRequest: `${APP_ORIGIN}/auth/verify-request`,
  },
  callbacks: {
    /**
     * @param token Decrypted JSON Web Token
     * @param user User object (only available on sign in)
     * @param account Provider account (only available on sign in)
     * @param profile Provider profile (only available on sign in)
     * @return JSON Web Token that will be saved
     */
    async jwt({ token, isNewUser /* user  account, profile */ }) {
      // TODO: Ask user to fill these fields, don't fill them automatically
      //if (user) {
      // await fillUserFields(
      //   user as any,
      //   profile as any,
      //   account?.provider as any,
      // );
      //}
      if (isNewUser) {
        // Auto fill name and username when user signed in with email only
        const user = await prisma.user.findUnique({
          where: {
            id: token.sub || '',
          },
        });
        if (user?.email) {
          let name: string | undefined;
          const alias = user.email.split('@')[0];
          if (!user.name) {
            name = alias;
          }
          let username: string | undefined;
          if (!user.username) {
            username = alias;
          }
          if (name || username) {
            await prisma.user.update({
              where: {
                id: user.id,
              },
              data: {
                ...(username && { username }),
                ...(name && { name }),
              },
            });
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      const userId = token.sub;
      if (!userId) {
        throw new Error(`Expect valid user id`);
      }

      // Extra properties should be added here, jwt only save a small set of data due to cookie size limitation
      session.user.id = userId;
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
      if (
        account?.provider === 'github' &&
        !(profile as GithubProfile)?.email
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
  cookies: defaultCookies(HOME_ORIGIN.startsWith('https')),
  adapter: PrismaAdapter(prisma),
  debug: isENVDev,
};
