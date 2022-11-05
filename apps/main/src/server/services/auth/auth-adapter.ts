import {
  CreateAccountDocument,
  CreateAccountMutationVariables,
  DeleteAccountDocument,
  CreateSessionDocument,
  CreateSessionMutation,
  DeleteSessionDocument,
  SessionAndUserDocument,
  UpdateSessionDocument,
  CreateUserDocument,
  CreateUserMutation,
  CreateUserMutationVariables,
  DeleteUserDocument,
  UpdateUserProfileByEmailDocument,
  UpdateUserProfileByEmailMutationVariables,
  UpdateUserProfileByPkDocument,
  UpdateUserProfileByPkMutationVariables,
  UserByAccountDocument,
  UserByEmailBeforeUpdateDocument,
  UserByEmailDocument,
  UserByPkBeforeUpdateDocument,
  DeleteVerificationTokenDocument,
  InsertOneVerificationTokenDocument,
} from '@chirpy-dev/graphql';
import { camelCase, isArray, transform, isObject } from 'lodash';
import { Adapter, AdapterSession, AdapterUser } from 'next-auth/adapters';

import { mutate, query } from '$/server/common/gql';
import { pick } from '$/server/utilities/object';

import { getUserByPk } from '../mutation-event/utilities';
import { generateUsername } from './utilities';

export async function createUser(user: Omit<AdapterUser, 'id'>) {
  // Fill missing username & name with email
  const username =
    user.username ??
    (user.email
      ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        generateUsername((user.email as string).split('@').shift() || '')
      : null);
  const name = (user.name as string | null) ?? username;
  const data = await mutate(
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
      const data = await query(
        UserByEmailDocument,
        {
          email,
        },
        'users',
      );
      return translateUserToAdapterUser(data[0]);
    },
    async getUserByAccount({ provider, providerAccountId }) {
      const users = await query(
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
        const { __typename, ...existsUer } = await query(
          UserByPkBeforeUpdateDocument,
          {
            id: user.id,
          },
          'userByPk',
        );
        const data = await mutate(
          UpdateUserProfileByPkDocument,
          {
            // Add the existing user data to the update,
            // or it'll reset non-existing fields
            ...pick(existsUer, 'email', 'name', 'image', 'emailVerified'),
            ...translateAdapterUserToQueryVairables(user),
          } as UpdateUserProfileByPkMutationVariables,
          'updateUserByPk',
        );
        return translateUserToAdapterUser(data);
      } else if (user.email) {
        const [{ __typename, ...existsUer }] = await query(
          UserByEmailBeforeUpdateDocument,
          {
            email: user.email,
          },
          'users',
        );
        const data = await mutate(
          UpdateUserProfileByEmailDocument,
          {
            // Add the existing user data to the update,
            // or it'll reset non-existing fields
            ...pick(existsUer, 'email', 'name', 'image', 'emailVerified'),
            ...translateAdapterUserToQueryVairables(user),
          } as UpdateUserProfileByEmailMutationVariables,
          'updateUsers',
        );
        return translateUserToAdapterUser(data.returning[0]);
      }
      throw new Error('User id or email is missing');
    },
    async deleteUser(userId) {
      const data = await mutate(
        DeleteUserDocument,
        {
          id: userId,
        },
        'deleteUserByPk',
      );
      return translateUserToAdapterUser(data);
    },
    async linkAccount(account) {
      await mutate(
        CreateAccountDocument,
        {
          ...camelize(account),
          expiresAt: account.expires_at ? new Date(account.expires_at) : null,
        } as CreateAccountMutationVariables,
        'insertOneAccount',
      );
    },
    async unlinkAccount({ provider, providerAccountId }) {
      await mutate(
        DeleteAccountDocument,
        {
          provider: provider,
          providerAccountId,
        },
        'deleteAccounts',
      );
    },
    async createSession({ sessionToken, userId, expires }) {
      const data = await mutate(
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
      const data = await query(
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
          email: user.email || '',
          emailVerified: user.emailVerified
            ? new Date(user.emailVerified)
            : null,
        },
      };
    },
    async updateSession(session) {
      const { userId, sessionToken, expires } = session;
      if (!userId || !expires) {
        throw new Error(
          `Session expires or userId is missing, session: ${JSON.stringify(
            session,
          )}`,
        );
      }
      const data = await mutate(
        UpdateSessionDocument,
        {
          userId,
          sessionToken,
          expires: expires.toDateString(),
        },
        'updateSessions',
      );
      return translateGQLSessionToAdapterSession(data.returning[0]);
    },
    async deleteSession(sessionToken) {
      const data = await mutate(
        DeleteSessionDocument,
        {
          sessionToken,
        },
        'deleteSessions',
      );
      return translateGQLSessionToAdapterSession(data.returning[0]);
    },
    async createVerificationToken({ identifier, expires, token }) {
      const { id: _, ...verificationToken } = await mutate(
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
      const { returning } = await mutate(
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
    email: user.email || '',
    emailVerified: user?.emailVerified ? new Date(user?.emailVerified) : null,
  };
}

function translateAdapterUserToQueryVairables<U extends Partial<AdapterUser>>(
  user: U,
): Omit<U, 'emailVerified'> & {
  emailVerified?: string;
} {
  const { emailVerified, ...rest } = user;
  return {
    ...rest,
    ...(emailVerified && {
      emailVerified: emailVerified.toISOString(),
    }),
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
