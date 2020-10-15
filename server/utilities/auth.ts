import { AUTH_COOKIE_NAME } from '$server/constants';
import { AuthenticationError } from 'apollo-server-micro';
import { parse } from 'cookie';
import { IncomingMessage } from 'http';
import { JWT, JWE, JWK } from 'jose';
import { NextApiRequest } from 'next';

export type AuthUser = {
  userId: string;
};

function createToken(payload: AuthUser) {
  return JWT.sign(payload, process.env.HASH_KEY);
}

function verifyToken(token: string) {
  return JWT.verify(token, process.env.HASH_KEY) as AuthUser;
}

const JWK_KEY = JWK.asKey(Buffer.from(process.env.HASH_KEY));

export function createSecureToken(payload: AuthUser): string {
  const token = createToken(payload);
  return JWE.encrypt(token, JWK_KEY);
}

export function parseSecureToken(token: string): AuthUser | null {
  try {
    const jwtToken = JWE.decrypt(token, JWK_KEY);
    return verifyToken(jwtToken.toString());
  } catch (error) {
    console.error('auth error: ', error);
    return null;
  }
}

export function getUserId(req: NextApiRequest | IncomingMessage): string {
  const token = parse(req.headers.cookie || '')[AUTH_COOKIE_NAME];
  if (!token) {
    throw new AuthenticationError(`Authentication Error`);
  }

  const authUser = parseSecureToken(token);

  if (!authUser) {
    throw new AuthenticationError(`Authentication Error`);
  }

  return authUser.userId;
}
