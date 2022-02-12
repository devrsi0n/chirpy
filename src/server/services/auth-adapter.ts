import { camelCase, isArray, transform, isObject } from 'lodash';
import { Adapter, AdapterSession, AdapterUser } from 'next-auth/adapters';

import { getAdminGqlClient } from '$/lib/admin-gql-client';

import { getUserByPk } from '../gql/user';
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
  CreateUserMutationVariables,
  DeleteUserDocument,
  UpdateUserProfileByEmailDocument,
  UpdateUserProfileByEmailMutationVariables,
  UpdateUserProfileByPkDocument,
  UserByAccountDocument,
  UserByEmailDocument,
} from '../graphql/generated/user';

// TODO: Extract all urql call to `server/gql`

export function nextAuthAdapter(): Adapter {
  const client = getAdminGqlClient();
  return {
    // @ts-expect-error
    async createUser(user: AdapterUser) {
      const result = await client
        .mutation<CreateUserMutation, CreateUserMutationVariables>(
          CreateUserDocument,
          translateAdapterUserToQueryVairables(user),
        )
        .toPromise();

      return translateUserToAdapterUser(result.data?.insertOneUser);
    },
    async getUser(id) {
      const data = await getUserByPk(id);

      return translateUserToAdapterUser(data);
    },
    async getUserByEmail(email) {
      const { data } = await client
        .query(UserByEmailDocument, {
          email,
        })
        .toPromise();
      return translateUserToAdapterUser(data?.users[0]);
    },
    async getUserByAccount({ provider, providerAccountId }) {
      const { data } = await client
        .query(UserByAccountDocument, {
          provider: provider,
          providerAccountId: providerAccountId,
        })
        .toPromise();

      return translateUserToAdapterUser(data?.users[0]);
    },
    async updateUser(user) {
      if (user.id) {
        const { data } = await client
          .mutation(
            UpdateUserProfileByPkDocument,
            translateAdapterUserToQueryVairables(user as AdapterUser),
          )
          .toPromise();
        return translateUserToAdapterUser(data?.updateUserByPk)!;
      } else if (user.email) {
        const { data } = await client
          .mutation(
            UpdateUserProfileByEmailDocument,
            translateAdapterUserToQueryVairables(
              user as AdapterUser,
            ) as UpdateUserProfileByEmailMutationVariables,
          )
          .toPromise();
        return translateUserToAdapterUser(data?.updateUsers?.returning[0])!;
      }
      throw new Error('User id or email is missing');
    },
    async deleteUser(userId) {
      const { data } = await client
        .mutation(DeleteUserDocument, {
          id: userId,
        })
        .toPromise();
      return translateUserToAdapterUser(data?.deleteUserByPk);
    },
    // @ts-expect-error
    async linkAccount(account) {
      const { data } = await client
        .mutation(CreateAccountDocument, {
          ...camelize(account),
          expiresAt: account.expires_at ? new Date(account.expires_at) : null,
        } as any)
        .toPromise();
      return data?.insertOneAccount!;
    },
    // @ts-expect-error
    async unlinkAccount({ provider, providerAccountId }) {
      const { data } = await client
        .mutation(DeleteAccountDocument, {
          provider: provider,
          providerAccountId,
        })
        .toPromise();
      return data?.deleteAccounts?.returning[0]!;
    },

    async createSession({ sessionToken, userId, expires }) {
      const { data } = await client
        .mutation(CreateSessionDocument, {
          sessionToken,
          userId,
          expires: expires.toISOString(),
        })
        .toPromise();
      return translateGQLSessionToAdapterSession(data?.insertOneSession!);
    },
    // @ts-expect-error
    async getSessionAndUser(sessionToken) {
      const { data } = await client
        .query(SessionAndUserDocument, {
          sessionToken,
        })
        .toPromise();
      return {
        session: translateGQLSessionToAdapterSession(data?.sessions[0]),
        user: data?.sessions[0].user,
      };
    },
    async updateSession(session) {
      const { data } = await client
        .mutation(UpdateSessionDocument, {
          ...session,
          expires: session.expires ? session.expires.toDateString() : undefined,
        })
        .toPromise();
      return translateGQLSessionToAdapterSession(data?.updateSessions?.returning[0]);
    },
    async deleteSession(sessionToken) {
      const { data } = await client
        .mutation(DeleteSessionDocument, {
          sessionToken,
        })
        .toPromise();
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
  const { image, ...rest } = adapterUser;
  return {
    ...rest,
    avatar: image,
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
