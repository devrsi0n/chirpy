describe('Footer', () => {
  before(() => {
    cy.visit('/');
    cy.wait('@session');
  });

  it('navigation links', () => {
    cy.get('footer').findByRole('link', { name: 'Docs' }).click();
    cy.url({ timeout: 60_000 }).should('include', '/docs');

    cy.get('footer').findByRole('link', { name: 'Blog' }).click();
    cy.url({ timeout: 60_000 }).should('include', '/blog');

    cy.get('footer').findByRole('link', { name: 'Pricing' }).click();
    cy.url({ timeout: 60_000 }).should('include', '/#pricing');

    cy.get('footer').findByRole('link', { name: 'Terms' }).click();
    cy.url({ timeout: 60_000 }).should('include', '/terms-of-service');

    cy.get('footer').findByRole('link', { name: 'Privacy' }).click();
    cy.url({ timeout: 60_000 }).should('include', '/privacy-policy');
  });
});
