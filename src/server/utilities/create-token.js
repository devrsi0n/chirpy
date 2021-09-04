/* eslint-disable unicorn/prefer-module */

/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-ignore
const jwt = require('jsonwebtoken');

/**
 * @type {function({ userId: string; name: string; email: string }, { maxAge: number | string; allowedRoles: string[]; defaultRole: string; role: string; hasuraClaims?: Record<string, string>}): string}
 */
function createAuthToken(payload, options) {
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

/**
 * @type {function (string | object | Buffer, { maxAge: string | number; }): string}
 */
function createToken(payload, { maxAge }) {
  const encodedToken = jwt.sign(payload, process.env.HASH_KEY, {
    algorithm: 'HS256',
    expiresIn: maxAge,
  });
  // console.log({ payload, key: process.env.HASH_KEY });
  return encodedToken;
}

module.exports.createAuthToken = createAuthToken;
module.exports.createToken = createToken;
