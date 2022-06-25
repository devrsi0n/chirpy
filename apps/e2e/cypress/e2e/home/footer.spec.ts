describe('Footer', () => {
  before(() => {
    cy.visit('/');
  });

  it('navigation links', () => {
    cy.get('footer').findByRole('link', { name: 'Docs' }).click({ force: true });
    cy.url({ timeout: 60_000 }).should('include', '/docs');

    cy.get('footer').findByRole('link', { name: 'Blog' }).click({ force: true });
    cy.url({ timeout: 60_000 }).should('include', '/blog');

    cy.get('footer').findByRole('link', { name: 'Pricing' }).click({ force: true });
    cy.url({ timeout: 60_000 }).should('include', '/#pricing');

    cy.get('footer').findByRole('link', { name: 'Terms' }).click({ force: true });
    cy.url({ timeout: 60_000 }).should('include', '/terms-of-service');

    cy.get('footer').findByRole('link', { name: 'Privacy' }).click({ force: true });
    cy.url({ timeout: 60_000 }).should('include', '/privacy-policy');
  });
});
