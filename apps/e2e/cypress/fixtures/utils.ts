export const waitTrpc = () =>
  cy.wait('@trpc', {
    timeout: 20_000,
  });
