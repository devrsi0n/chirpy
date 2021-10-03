import { testUser } from '../../fixtures/user';

describe('Header', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait('@session');
  });

  it('should show user drop down', () => {
    clickUserDropDown();
    cy.get('header').findByText(testUser.name).should('be.visible');
    cy.get('header')
      .findByRole('menu')
      .findByRole('link', { name: 'Dashboard' })
      .should('be.visible')
      .click();
    cy.url().should('include', '/dashboard');

    clickUserDropDown();
    cy.get('header').findByRole('link', { name: 'Profile' }).click();
    cy.url().should('include', '/profile');

    clickUserDropDown();
    cy.get('header').findByRole('menuitem', { name: 'Log out' }).should('be.visible').click();
    cy.get('header').findByText(testUser.name).should('not.exist');
  });

  it('should show navigation links', () => {
    cy.get('header').findByRole('link', { name: 'Dashboard' }).click();
    cy.url().should('include', '/dashboard');

    cy.get('header').findByRole('link', { name: 'Docs' }).click();
    cy.url().should('include', '/docs');

    cy.get('header').findByRole('link', { name: 'Blog' }).click();
    cy.url().should('include', '/blog');
  });
});

function clickUserDropDown() {
  cy.get('header')
    .findByRole('img', {
      name: `The avatar of ${testUser.name}`,
    })
    .click();
}
