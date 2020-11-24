import { AuthenticationError } from 'apollo-server-micro';
import { parse } from 'cookie';
import Iron from '@hapi/iron';
import { NextApiRequest } from 'next';

import { AUTH_COOKIE_NAME } from '$server/constants';

export type AuthUser = {
  userId: string;
};

export function createSecureToken(payload: AuthUser): Promise<string> {
  console.log({ hashKey: process.env.HASH_KEY });
  const token = Iron.seal(payload, process.env.HASH_KEY, Iron.defaults);
  return token;
}

export function parseSecureToken(token: string): Promise<AuthUser | null> {
  try {
    return Iron.unseal(token, process.env.HASH_KEY, Iron.defaults);
  } catch (error) {
    console.error('auth error: ', error);
    return Promise.resolve(null);
  }
}

export async function getUserId(req: NextApiRequest): Promise<string> {
  const token = parse(req.headers.cookie || '')[AUTH_COOKIE_NAME];
  if (!token) {
    throw new AuthenticationError(`Authentication Error`);
  }

  const authUser = await parseSecureToken(token);

  if (!authUser) {
    throw new AuthenticationError(`Authentication Error`);
  }

  return authUser.userId;
}
