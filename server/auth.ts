import { JWT, JWE, JWK } from 'jose';

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

export function createSecureToken(payload: AuthUser) {
  const token = createToken(payload);
  return JWE.encrypt(token, JWK_KEY);
}

export function parseSecureToken(token: string): AuthUser | null {
  try {
    const jwtToken = JWE.decrypt(token, JWK_KEY);
    return verifyToken(jwtToken.toString());
  } catch (error) {
    console.error('auth error', error);
    return null;
  }
}
