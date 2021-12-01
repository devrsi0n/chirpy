import NextAuth, { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import pg from 'pg';

import { HASURA_TOKEN_MAX_AGE, SESSION_MAX_AGE } from '$/lib/constants';
import { getAdminApollo } from '$/server/common/admin-apollo';
import { UserProjectsDocument } from '$/server/graphql/generated/project';
import { authProviders } from '$/server/services/auth';
import { fillUserFields } from '$/server/services/user';
import { createAuthToken } from '$/server/utilities/create-token';
import { isENVDev, isENVProd } from '$/server/utilities/env';
import { getPGArray } from '$/server/utilities/get-pgarray';

if (isENVProd) {
  pg.defaults.ssl = {
    rejectUnauthorized: false,
  };
}

export default NextAuth({
  providers: authProviders,
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
      if (user) {
        await fillUserFields(user as any, profile as any, account?.provider as any);
      }
      return {
        ...decodedToken,
        isNewUser: !!isNewUser,
      };
    },
    async session(session: Session, jwtPayload: JWT) {
      const adminClient = getAdminApollo();
      const userId = +jwtPayload.sub!;
      const { data } = await adminClient.query({
        fetchPolicy: 'cache-first',
        query: UserProjectsDocument,
        variables: {
          userId,
        },
      });
      const editableProjectIds = data.projects.map(({ id }: { id: string }) => id);
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
          hasuraClaims: {
            // Projects with edit permission of the user
            'X-Hasura-Editable-Project-Ids': getPGArray(editableProjectIds),
            // 'X-Hasura-Editable-Project-Ids': editableProjectIds,
          },
        },
      );
      if (session.user) {
        session.user.id = userId;
        session.user.editableProjectIds = editableProjectIds;
      }
      return session;
    },
    async signIn(user, account, profile) {
      // Restrict access to people with verified accounts
      if (account.provider === 'google' && profile.verified_email !== true) {
        return false;
      } else if (account.provider === 'github' && !user.email) {
        // Fetch user's hidden email.
        const res = await fetch('https://api.github.com/user/emails', {
          headers: {
            Authorization: `token ${account.accessToken}`,
          },
        });
        const emails: { email: string; primary: number; verified: number }[] = await res.json();
        if (!emails || emails.length === 0) {
          return true;
        }
        const sortedEmails = emails.sort(
          (a, b) => b.primary - a.primary || b.verified - a.verified,
        );
        user.email = sortedEmails[0].email;
      }
      return true;
    },
  },
  database: process.env.DATABASE_URL,
  secret: process.env.HASH_KEY,
  debug: isENVDev,
});
