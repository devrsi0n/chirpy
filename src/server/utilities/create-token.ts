import * as jwt from 'jsonwebtoken';

type Payload = { userId: string; name: string; email: string };
type Options = {
  maxAge: number | string;
  allowedRoles: string[];
  defaultRole: string;
  role: string;
  hasuraClaims?: Record<string, string>;
};

function createAuthToken(payload: Payload, options: Options): string {
  const { maxAge, allowedRoles, defaultRole, role, hasuraClaims } = options;
  const jwtClaims = {
    sub: payload.userId,
    name: payload.name,
    email: payload.email,
    'https://hasura.io/jwt/claims': {
      // https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt.html#the-spec
      'x-hasura-allowed-roles': allowedRoles,
      'x-hasura-default-role': defaultRole,
      'x-hasura-role': role,
      'x-hasura-user-id': payload.userId,
      ...hasuraClaims,
    },
  };
  const encodedToken = createToken(jwtClaims, {
    maxAge,
  });
  return encodedToken;
}

function createToken(payload: string | object | Buffer, { maxAge }: { maxAge: string | number }) {
  const encodedToken = jwt.sign(payload, process.env.HASH_KEY, {
    algorithm: 'HS256',
    expiresIn: maxAge,
  });
  // console.log({ payload, key: process.env.HASH_KEY });
  return encodedToken;
}

export { createAuthToken, createToken };
