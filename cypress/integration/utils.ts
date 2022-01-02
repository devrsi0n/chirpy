export const waitGraphql = () =>
  cy.wait('@graphql', {
    timeout: 20_000,
  });
export const waitSession = () =>
  cy.wait('@session', {
    timeout: 20_000,
  });
