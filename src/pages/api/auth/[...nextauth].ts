import NextAuth from 'next-auth';

import { HASURA_TOKEN_MAX_AGE, SESSION_MAX_AGE } from '$/lib/constants';
import { getAuthUserByPk } from '$/server/gql/user';
import { nextAuthAdapter } from '$/server/services/auth-adapter';
import { authProviders } from '$/server/services/auth-providers';
import { fillUserFields } from '$/server/services/user';
import { createAuthToken } from '$/server/utilities/create-token';
import { defaultCookies } from '$/server/utilities/default-cookies';
import { isENVDev } from '$/server/utilities/env';

export default NextAuth({
  providers: authProviders,
  session: {
    strategy: 'jwt',
    maxAge: SESSION_MAX_AGE,
  },
  pages: {
    signIn: '/auth/sign-in',
    newUser: '/auth/welcome?isNewUser=true', // New users will be directed here on first sign in
    // error: '/auth/error', // Error code passed in query string as ?error=
  },
  callbacks: {
    /**
     * @param token Decrypted JSON Web Token
     * @param user User object (only available on sign in)
     * @param account Provider account (only available on sign in)
     * @param profile Provider profile (only available on sign in)
     * @return JSON Web Token that will be saved
     */
    async jwt({ token, user, account, profile }) {
      if (user) {
        await fillUserFields(user as any, profile as any, account?.provider as any);
      }
      const { projects, type } = await getAuthUserByPk(token.sub!);
      const editableProjectIds = projects.map(({ id }: { id: string }) => id);

      return {
        ...token,
        editableProjectIds,
        type,
      };
    },
    async session({ session, token }) {
      console.log('session', { session, token });
      const userId = token.sub!;
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
        session.user = {
          ...session.user,
          id: userId,
          ...token,
        };
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
  cookies: defaultCookies(process.env.NEXTAUTH_URL.startsWith('https://')),
  adapter: nextAuthAdapter(),
  debug: isENVDev,
});
