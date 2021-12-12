export const testUser = {
  id: 8,
  name: 'CypressTest',
  email: 'cypress.test@localhost',
  image: 'https://www.cypress.io/icons/icon-72x72.png',
};

export const jwtBody = {
  user: testUser,
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
};
