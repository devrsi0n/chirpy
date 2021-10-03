/* eslint-disable unicorn/prefer-module */
const testUser = {
  id: 8,
  name: 'CypressTest',
  email: 'cypress.test@totalk.dev',
  image: 'https://www.cypress.io/icons/icon-72x72.png',
};

exports.testUser = testUser;
exports.jwtBody = {
  user: testUser,
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
};
