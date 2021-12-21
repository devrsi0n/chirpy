import NextAuth from 'next-auth';

import { HASURA_TOKEN_MAX_AGE, SESSION_MAX_AGE } from '$/lib/constants';
import { getAdminApollo } from '$/server/common/admin-apollo';
import { UserProjectsDocument, UserProjectsQuery } from '$/server/graphql/generated/project';
import { nextAuthAdapter } from '$/server/services/auth-adapter';
import { authProviders } from '$/server/services/auth-providers';
import { fillUserFields } from '$/server/services/user';
import { createAuthToken } from '$/server/utilities/create-token';
import { isENVDev } from '$/server/utilities/env';

export default NextAuth({
  providers: authProviders,
  session: {
    strategy: 'jwt',
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
     * @param token Decrypted JSON Web Token
     * @param user User object (only available on sign in)
     * @param account Provider account (only available on sign in)
     * @param profile Provider profile (only available on sign in)
     * @param isNewUser True if new user (only available on sign in)
     * @return JSON Web Token that will be saved
     */
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        await fillUserFields(user as any, profile as any, account?.provider as any);
      }
      return {
        ...token,
        isNewUser: !!isNewUser,
      };
    },
    async session({ session, token }) {
      const adminClient = getAdminApollo();
      const userId = token.sub!;
      const { data } = await adminClient.query<UserProjectsQuery>({
        fetchPolicy: 'cache-first',
        query: UserProjectsDocument,
        variables: {
          userId,
        },
      });
      const editableProjectIds = data.projects.map(({ id }: { id: string }) => id);
      session.hasuraToken = createAuthToken(
        {
          userId: userId,
          name: token.name!,
          email: token.email!,
        },
        {
          maxAge: HASURA_TOKEN_MAX_AGE,
          allowedRoles: ['user'],
          defaultRole: 'user',
          role: 'user',
        },
      );
      if (session.user) {
        session.user.id = userId;
        session.user.editableProjectIds = editableProjectIds;
      }
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
  adapter: nextAuthAdapter(),
  secret: process.env.HASH_KEY,
  debug: isENVDev,
});
