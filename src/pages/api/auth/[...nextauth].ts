import NextAuth, { CookieOption, CookiesOptions } from 'next-auth';

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
  cookies: defaultCookies(process.env.NEXTAUTH_URL.startsWith('https://')),
  adapter: nextAuthAdapter(),
  secret: process.env.HASH_KEY,
  debug: isENVDev,
});

/**
 * Copy from 'https://github.com/nextauthjs/next-auth/blob/227ff2259f/src/core/lib/cookie.ts' as we can't import it directly
 *
 * Use secure cookies if the site uses HTTPS
 * This being conditional allows cookies to work non-HTTPS development URLs
 * Honour secure cookie option, which sets 'secure' and also adds '__Secure-'
 * prefix, but enable them by default if the site URL is HTTPS; but not for
 * non-HTTPS URLs like http://localhost which are used in development).
 * For more on prefixes see https://googlechrome.github.io/samples/cookie-prefixes/
 *
 */
export function defaultCookies(useSecureCookies: boolean): CookiesOptions {
  const cookiePrefix = useSecureCookies ? '__Secure-' : '';
  // To enable cookies on widgets,
  // https://stackoverflow.com/questions/45094712/iframe-not-reading-cookies-in-chrome
  // But we need to set it as `lax` in development
  const sameSite = isENVDev ? 'lax' : 'none';
  return {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,

        sameSite,
        path: '/',
        secure: useSecureCookies,
      },
    },
    callbackUrl: {
      name: `${cookiePrefix}next-auth.callback-url`,
      options: {
        sameSite,
        path: '/',
        secure: useSecureCookies,
      },
    },
    csrfToken: {
      // Default to __Host- for CSRF token for additional protection if using useSecureCookies
      // NB: The `__Host-` prefix is stricter than the `__Secure-` prefix.
      name: `${useSecureCookies ? '__Host-' : ''}next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite,
        path: '/',
        secure: useSecureCookies,
      },
    },
    pkceCodeVerifier: {
      name: `${cookiePrefix}next-auth.pkce.code_verifier`,
      options: {
        httpOnly: true,
        sameSite,
        path: '/',
        secure: useSecureCookies,
      },
    },
    state: {
      name: `${cookiePrefix}next-auth.state`,
      options: {
        httpOnly: true,
        sameSite,
        path: '/',
        secure: useSecureCookies,
      },
    },
  };
}
