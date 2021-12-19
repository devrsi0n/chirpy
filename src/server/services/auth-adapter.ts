import { camelCase, isArray, transform, isObject } from 'lodash';
import { Adapter, AdapterSession, AdapterUser } from 'next-auth/adapters';

import { getAdminApollo } from '../common/admin-apollo';
import { CreateAccountDocument, DeleteAccountDocument } from '../graphql/generated/account';
import {
  CreateSessionDocument,
  CreateSessionMutation,
  DeleteSessionDocument,
  SessionAndUserDocument,
  UpdateSessionDocument,
} from '../graphql/generated/session';
import {
  CreateUserDocument,
  CreateUserMutation,
  DeleteUserDocument,
  UpdateUserProfileByEmailDocument,
  UpdateUserProfileByEmailMutationVariables,
  UpdateUserProfileByPkDocument,
  UserByAccountDocument,
  UserByEmailDocument,
  UserByPkDocument,
} from '../graphql/generated/user';

export function nextAuthAdapter(): Adapter {
  const client = getAdminApollo();
  return {
    // @ts-expect-error
    async createUser(user: AdapterUser) {
      const { data } = await client.mutate({
        mutation: CreateUserDocument,
        variables: translateAdapterUserToQueryVairables(user),
      });

      return translateUserToAdapterUser(data?.insertOneUser);
    },
    async getUser(id) {
      const { data } = await client.query({
        query: UserByPkDocument,
        variables: {
          id,
        },
      });

      return translateUserToAdapterUser(data?.userByPk);
    },
    async getUserByEmail(email) {
      const { data } = await client.query({
        query: UserByEmailDocument,
        variables: {
          email,
        },
      });
      return translateUserToAdapterUser(data?.users[0]);
    },
    async getUserByAccount({ provider, providerAccountId }) {
      const { data } = await client.query({
        query: UserByAccountDocument,
        variables: {
          provider: provider,
          providerAccountId: providerAccountId,
        },
      });

      return translateUserToAdapterUser(data?.users[0]);
    },
    async updateUser(user) {
      if (user.id) {
        const { data } = await client.mutate({
          mutation: UpdateUserProfileByPkDocument,
          variables: translateAdapterUserToQueryVairables(user as AdapterUser),
        });
        return translateUserToAdapterUser(data?.updateUserByPk)!;
      } else if (user.email) {
        const { data } = await client.mutate({
          mutation: UpdateUserProfileByEmailDocument,
          variables: translateAdapterUserToQueryVairables(
            user as AdapterUser,
          ) as UpdateUserProfileByEmailMutationVariables,
        });
        return translateUserToAdapterUser(data?.updateUsers?.returning[0])!;
      }
      throw new Error('User id or email is missing');
    },
    async deleteUser(userId) {
      const { data } = await client.mutate({
        mutation: DeleteUserDocument,
        variables: {
          id: userId,
        },
      });
      return translateUserToAdapterUser(data?.deleteUserByPk);
    },
    // @ts-expect-error
    async linkAccount(account) {
      const { data } = await client.mutate({
        mutation: CreateAccountDocument,
        variables: {
          ...camelize(account),
          expiresAt: account.expires_at ? new Date(account.expires_at) : null,
        } as any,
      });
      return data?.insertOneAccount!;
    },
    // @ts-expect-error
    async unlinkAccount({ provider, providerAccountId }) {
      const { data } = await client.mutate({
        mutation: DeleteAccountDocument,
        variables: {
          provider: provider,
          providerAccountId,
        },
      });
      return data?.deleteAccounts?.returning[0]!;
    },

    async createSession({ sessionToken, userId, expires }) {
      const { data } = await client.mutate({
        mutation: CreateSessionDocument,
        variables: {
          sessionToken,
          userId,
          expires: expires.toISOString(),
        },
      });
      return translateGQLSessionToAdapterSession(data?.insertOneSession!);
    },
    // @ts-expect-error
    async getSessionAndUser(sessionToken) {
      const {
        data: {
          sessions: [session],
        },
      } = await client.query({
        query: SessionAndUserDocument,
        variables: {
          sessionToken,
        },
      });
      return {
        session: translateGQLSessionToAdapterSession(session),
        user: session.user,
      };
    },
    async updateSession(session) {
      const { data } = await client.mutate({
        mutation: UpdateSessionDocument,
        variables: {
          ...session,
          expires: session.expires ? session.expires.toDateString() : undefined,
        },
      });
      return translateGQLSessionToAdapterSession(data?.updateSessions?.returning[0]);
    },
    async deleteSession(sessionToken) {
      const { data } = await client.mutate({
        mutation: DeleteSessionDocument,
        variables: {
          sessionToken,
        },
      });
      return translateGQLSessionToAdapterSession(data?.deleteSessions?.returning[0]);
    },
    // async createVerificationToken({ identifier, expires, token }) {
    //   return;
    // },
    // async useVerificationToken({ identifier, token }) {
    //   return;
    // },
  };
}

function translateUserToAdapterUser(user: CreateUserMutation['insertOneUser']): AdapterUser | null {
  if (!user?.id) {
    return null;
  }
  return {
    ...user,
    image: user.avatar,
    emailVerified: user?.emailVerified ? new Date(user?.emailVerified) : null,
  };
}

function translateAdapterUserToQueryVairables(
  adapterUser: AdapterUser,
): NonNullable<CreateUserMutation['insertOneUser']> {
  return {
    ...adapterUser,
    avatar: adapterUser.image,
    emailVerified: adapterUser.emailVerified?.toISOString(),
  };
}

function camelize(obj: Record<string, unknown>) {
  return transform(obj, (result: Record<string, unknown>, value: unknown, key: string, target) => {
    const camelKey = isArray(target) ? key : camelCase(key);
    result[camelKey] = isObject(value) ? camelize(value as Record<string, unknown>) : value;
  });
}

function translateGQLSessionToAdapterSession(
  session: CreateSessionMutation['insertOneSession'],
): AdapterSession {
  if (!session?.id) {
    throw new Error('Session id is missing');
  }
  return {
    ...session,
    // @ts-expect-error
    expires: session.expires ? new Date(session.expires) : null,
  };
}
