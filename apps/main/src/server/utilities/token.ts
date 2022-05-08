import jwt from 'jsonwebtoken';

export function parseToken(token: string) {
  const decodedPayload = jwt.verify(token, process.env.NEXTAUTH_SECRET, {
    algorithms: ['HS256'],
  });
  return decodedPayload;
}
