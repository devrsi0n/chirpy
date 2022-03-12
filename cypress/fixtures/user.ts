export const testUser = {
  // Used in node and browser contexts
  id:
    process.env.TEST_USER_ID ||
    // @ts-ignore
    ('Cypress' in global ? global.Cypress.env('TEST_USER_ID') : 'invalid-id'),
  name: 'CypressTest',
  email: 'cypress.test@localhost',
  avatar: 'https://www.cypress.io/icons/icon-72x72.png',
};
