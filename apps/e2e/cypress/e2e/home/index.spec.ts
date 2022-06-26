describe('Index', () => {
  before(() => {
    cy.visit('/');
  });

  it('main call to actions', () => {
    cy.findAllByRole('button', { name: 'Try It Free' }).should(
      'have.length',
      2,
    );
    cy.findByRole('button', { name: 'Get Early Access' }).click();
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
