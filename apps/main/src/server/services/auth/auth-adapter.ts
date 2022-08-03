import { camelCase, isArray, transform, isObject } from 'lodash';
import { Adapter, AdapterSession, AdapterUser } from 'next-auth/adapters';

import { gqlMutate, gqlQuery } from '$/server/common/gql';
import {
  CreateAccountDocument,
  CreateAccountMutationVariables,
  DeleteAccountDocument,
} from '$/server/graphql/generated/account';
import {
  CreateSessionDocument,
  CreateSessionMutation,
  DeleteSessionDocument,
  SessionAndUserDocument,
  UpdateSessionDocument,
} from '$/server/graphql/generated/session';
import {
  CreateUserDocument,
  CreateUserMutation,
  CreateUserMutationVariables,
  DeleteUserDocument,
  UpdateUserProfileByEmailDocument,
  UpdateUserProfileByEmailMutationVariables,
  UpdateUserProfileByPkDocument,
  UpdateUserProfileByPkMutationVariables,
  UserByAccountDocument,
  UserByEmailDocument,
  UserByPkBeforeUpdateDocument,
  UserByPkDocument,
} from '$/server/graphql/generated/user';
import {
  DeleteVerificationTokenDocument,
  InsertOneVerificationTokenDocument,
} from '$/server/graphql/generated/verification-token';

import { getUserByPk } from '../mutation-event/utilities';
import { generateUsername } from './utilities';

export async function createUser(user: Omit<AdapterUser, 'id'>) {
  // Fill missing username & name with email
  const username =
    (user.username as string | null) ??
    (user.email
      ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        generateUsername((user.email as string).split('@').shift() || '')
      : null);
  const name = (user.name as string | null) ?? username;
  const data = await gqlMutate(
    CreateUserDocument,
    translateAdapterUserToQueryVairables({
      ...user,
      username,
      name,
      type: user.email ? 'free' : 'anonymous',
    }) as CreateUserMutationVariables,
    'insertOneUser',
  );
  return data;
}

export function nextAuthAdapter(): Adapter {
  return {
    async createUser(user) {
      const data = await createUser(user);
      return translateUserToAdapterUser(data);
    },
    async getUser(id) {
      const data = await getUserByPk(id);

      return translateUserToAdapterUser(data);
    },
    async getUserByEmail(email) {
      const data = await gqlQuery(
        UserByEmailDocument,
        {
          email,
        },
        'users',
      );
      return translateUserToAdapterUser(data[0]);
    },
    async getUserByAccount({ provider, providerAccountId }) {
      const users = await gqlQuery(
        UserByAccountDocument,
        {
          provider: provider,
          providerAccountId: providerAccountId,
        },
        'users',
      );
      return translateUserToAdapterUser(users[0]);
    },
    async updateUser(user) {
      if (user.id) {
        const { __typename, ...existsUer } = await gqlQuery(
          UserByPkBeforeUpdateDocument,
          {
            id: user.id,
          },
          'userByPk',
        );
        const data = await gqlMutate(
          UpdateUserProfileByPkDocument,
          {
            // Add the existing user data to the update,
            // or it'll reset empty fields
            ...existsUer,
            ...translateAdapterUserToQueryVairables(user),
          } as UpdateUserProfileByPkMutationVariables,
          'updateUserByPk',
        );
        return translateUserToAdapterUser(data);
      } else if (user.email) {
        const data = await gqlMutate(
          UpdateUserProfileByEmailDocument,
          translateAdapterUserToQueryVairables(
            user,
          ) as UpdateUserProfileByEmailMutationVariables,
          'updateUsers',
        );
        return translateUserToAdapterUser(data.returning[0]);
      }
      throw new Error('User id or email is missing');
    },
    async deleteUser(userId) {
      const data = await gqlMutate(
        DeleteUserDocument,
        {
          id: userId,
        },
        'deleteUserByPk',
      );
      return translateUserToAdapterUser(data);
    },
    async linkAccount(account) {
      await gqlMutate(
        CreateAccountDocument,
        {
          ...camelize(account),
          expiresAt: account.expires_at ? new Date(account.expires_at) : null,
        } as CreateAccountMutationVariables,
        'insertOneAccount',
      );
    },
    async unlinkAccount({ provider, providerAccountId }) {
      await gqlMutate(
        DeleteAccountDocument,
        {
          provider: provider,
          providerAccountId,
        },
        'deleteAccounts',
      );
    },
    async createSession({ sessionToken, userId, expires }) {
      const data = await gqlMutate(
        CreateSessionDocument,
        {
          sessionToken,
          userId,
          expires: expires.toISOString(),
        },
        'insertOneSession',
      );
      return translateGQLSessionToAdapterSession(data);
    },
    async getSessionAndUser(sessionToken) {
      const data = await gqlQuery(
        SessionAndUserDocument,
        {
          sessionToken,
        },
        'sessions',
      );
      const { user, ...session } = data[0];
      return {
        session: {
          ...session,
          expires: new Date(session.expires),
        },
        user: {
          ...user,
          emailVerified: user.emailVerified
            ? new Date(user.emailVerified)
            : null,
        },
      };
    },
    async updateSession(session) {
      const data = await gqlMutate(
        UpdateSessionDocument,
        {
          ...session,
          expires: session.expires ? session.expires.toDateString() : undefined,
        },
        'updateSessions',
      );
      return translateGQLSessionToAdapterSession(data.returning[0]);
    },
    async deleteSession(sessionToken) {
      const data = await gqlMutate(
        DeleteSessionDocument,
        {
          sessionToken,
        },
        'deleteSessions',
      );
      return translateGQLSessionToAdapterSession(data.returning[0]);
    },
    async createVerificationToken({ identifier, expires, token }) {
      const { id: _, ...verificationToken } = await gqlMutate(
        InsertOneVerificationTokenDocument,
        {
          identifier,
          expires: expires.toDateString(),
          token,
        },
        'insertOneVerificationToken',
      );
      return {
        ...verificationToken,
        expires: new Date(verificationToken.expires),
      };
    },
    async useVerificationToken({ identifier, token }) {
      const { returning } = await gqlMutate(
        DeleteVerificationTokenDocument,
        { identifier, token },
        'deleteVerificationTokens',
      );
      if (!returning[0]) {
        // The token has been used/deleted
        return null;
      }
      const { id: _, ...verificationToken } = returning[0];
      return {
        ...verificationToken,
        expires: new Date(verificationToken.expires),
      };
    },
  };
}

function translateUserToAdapterUser(user: null | undefined): null;
function translateUserToAdapterUser(
  user: NonNullable<CreateUserMutation['insertOneUser']>,
): AdapterUser;
function translateUserToAdapterUser(
  user: CreateUserMutation['insertOneUser'],
): AdapterUser | null {
  if (!user) {
    return null;
  }
  return {
    ...user,
    image: user?.avatar,
    emailVerified: user?.emailVerified ? new Date(user?.emailVerified) : null,
  };
}

function translateAdapterUserToQueryVairables<U extends Partial<AdapterUser>>(
  user: U,
): Omit<U, 'image'> & {
  avatar?: U['image'];
  emailVerified?: string;
} {
  const { image, emailVerified, ...rest } = user;
  return {
    ...rest,
    ...(typeof image === 'string' && {
      avatar: image,
    }),
    ...(emailVerified && {
      emailVerified: emailVerified.toISOString(),
    }),
  } as Omit<U, 'image'> & {
    avatar?: U['image'];
    emailVerified?: string;
  };
}

function camelize(obj: Record<string, unknown>) {
  return transform(
    obj,
    (result: Record<string, unknown>, value: unknown, key: string, target) => {
      const camelKey = isArray(target) ? key : camelCase(key);
      result[camelKey] = isObject(value)
        ? camelize(value as Record<string, unknown>)
        : value;
    },
  );
}

function translateGQLSessionToAdapterSession(
  session: CreateSessionMutation['insertOneSession'],
): AdapterSession {
  if (!session?.id) {
    throw new Error('Session id is missing');
  }
  return {
    ...session,
    expires: new Date(session.expires),
  };
}
