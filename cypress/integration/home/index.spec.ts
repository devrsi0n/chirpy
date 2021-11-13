describe('Index', () => {
  before(() => {
    cy.visit('/');
    cy.wait('@session');
  });

  it('main call to actions', () => {
    cy.findAllByRole('button', { name: 'Try It Free' }).should('have.length', 3);
    cy.findAllByRole('button', { name: 'Try It Free' }).first().click();
    cy.url({ timeout: 60_000 }).should('include', '/auth/sign-in');
    cy.visit('/');
  });

  it('learn more', () => {
    cy.findByRole('button', {
      name: /learn more/i,
    }).click();
    cy.url({ timeout: 60_000 }).should('include', '/docs/index');
  });
});
