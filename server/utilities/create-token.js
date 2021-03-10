const jwt = require('jsonwebtoken');

/**
 * @type {function({ userId: string; name: string; email: string }, { maxAge: number | string; allowedRoles: string[]; defaultRole: string; role: string}): string}
 */
function createToken(payload, options) {
  const { maxAge, allowedRoles, defaultRole, role } = options;
  const jwtClaims = {
    sub: payload.userId,
    name: payload.name,
    email: payload.email,
    "https://hasura.io/jwt/claims": {
      // https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt.html#the-spec
      "x-hasura-allowed-roles": allowedRoles,
      "x-hasura-default-role": defaultRole,
      "x-hasura-role": role,
      "x-hasura-user-id": payload.userId,
    },
  };
  const encodedToken = jwt.sign(
    jwtClaims,
    process.env.HASH_KEY,
    {
      algorithm: 'HS256',
      expiresIn: maxAge
    }
  );
  console.log({ jwtClaims, key: process.env.HASH_KEY });
  return encodedToken;
}

module.exports.createToken = createToken;
