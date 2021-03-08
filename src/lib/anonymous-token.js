const { createToken } = require('../../server/utilities/create-token');

/**
 * @type {function (): string}
 */
function getAnonymousToken() {
  const maxAge = 60 * 60 * 24 * 365;
  const authToken = createToken(
    {
      userId: 'anonymous',
      name: 'anonymous',
      email: 'anonymous',
    },
    { maxAge, allowedRoles: ['anonymous'], defaultRole: 'anonymous', role: 'anonymous' },
  );
  // console.log(authToken);
  return authToken;
}
module.exports = getAnonymousToken();
