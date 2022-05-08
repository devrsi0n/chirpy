export const waitGraphql = () =>
  cy.wait('@graphql', {
    timeout: 20_000,
  });
