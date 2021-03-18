// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createToken } = require('../../server/utilities/create-token');

/**
 * @type {function (): string}
 */
function getAnonymousToken() {
  const maxAge = '30d';
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
