context('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show navigation links', () => {
    cy.findByRole('banner')
      .findByRole('navigation')
      .findAllByRole('link')
      .its('length')
      .should('be.gte', 4);
  });
});
