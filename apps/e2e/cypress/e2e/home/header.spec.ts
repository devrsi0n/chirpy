
describe('Header', () => {
  it('should show navigation links', () => {
    loadHomePage();

    cy.get('header').findByRole('link', { name: 'Docs' }).click();
    cy.url({ timeout: 60_000 }).should('include', '/docs');

    cy.get('header').findByRole('link', { name: 'Blog' }).click();
    cy.url({ timeout: 60_000 }).should('include', '/blog');

    cy.get('header')
      .findByRole('link', { name: /^logo of \S+/i })
      .click({ force: true });
    cy.url({ timeout: 60_000 }).should('include', '/');
  });
});

function loadHomePage() {
  cy.visit('/', {
    timeout: 60_000,
  });
  cy.get('[aria-label="Logo of Chirpy"]', { timeout: 60_000 }).should(
    'be.visible',
  );
}
