import NextAuth from 'next-auth';
import { log } from 'next-axiom';

import { getAdminGqlClient } from '$/lib/admin-gql-client';
import { HASURA_TOKEN_MAX_AGE, SESSION_MAX_AGE } from '$/lib/constants';
import { UserProjectsDocument } from '$/server/graphql/generated/project';
import { nextAuthAdapter } from '$/server/services/auth/auth-adapter';
import { authProviders } from '$/server/services/auth/auth-providers';
import { sendWelcomeLetter } from '$/server/services/email/send-emails';
import { createAuthToken } from '$/server/utilities/create-token';
import { defaultCookies } from '$/server/utilities/default-cookies';
import { isENVDev } from '$/server/utilities/env';

const client = getAdminGqlClient();

export default NextAuth({
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
      const { data, error } = await client
        .query(UserProjectsDocument, {
          userId,
        })
        .toPromise();
      if (!data || error) {
        throw new Error(`GQL query error, error: ${error}, data: ${data}`);
      }
      const editableProjectIds = data.projects.map(
        ({ id }: { id: string }) => id,
      );
      session.hasuraToken = createAuthToken(
        {
          userId: userId,
          name: token.name || '',
          email: token.email || '',
        },
        {
          maxAge: HASURA_TOKEN_MAX_AGE,
          allowedRoles: ['user'],
          defaultRole: 'user',
          role: 'user',
        },
      );
      // Extra properties should be added here, jwt only save a small set of data due to cookie size limitation
      session.user = {
        name: session.user.name || data.userByPk?.name || '',
        username: session.user.username || data.userByPk?.username || '',
        email: session.user.email || data.userByPk?.email || '',
        image: session.user.image || data.userByPk?.image || '',
        id: userId,
        editableProjectIds,
      };
      return session;
    },
    async signIn({ account, profile }) {
      // Restrict access to people with verified accounts
      if (account.provider === 'google' && profile.verified_email !== true) {
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
  adapter: nextAuthAdapter(),
  debug: isENVDev,
});
