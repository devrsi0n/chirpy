/* eslint-disable @typescript-eslint/no-var-requires, unicorn/prefer-module */
const { createAuthToken } = require('../../server/utilities/create-token');

/**
 * @type {function (): string}
 */
function getAnonymousToken() {
  const maxAge = '30d';
  const authToken = createAuthToken(
    {
      userId: 'anonymous',
      name: 'anonymous',
      email: 'anonymous',
    },
    { maxAge, allowedRoles: ['anonymous'], defaultRole: 'anonymous', role: 'anonymous' },
  );
  console.log({ authToken });
  return authToken;
}
module.exports = getAnonymousToken();
module.exports.getAnonymousToken = getAnonymousToken;