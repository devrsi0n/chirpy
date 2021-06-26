import jwt from 'jsonwebtoken';

export function parseToken(token: string) {
  const decodedPayload = jwt.verify(token, process.env.HASH_KEY, {
    algorithms: ['HS256'],
  });
  return decodedPayload;
}
