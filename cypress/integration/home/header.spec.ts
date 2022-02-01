import { testUser } from '../../fixtures/user';
import { waitSession } from '../../fixtures/utils';

describe('Header', () => {
  before(() => {
    cy.visit('/');
    waitSession();
  });

  it('should show user menu', () => {
    clickUserMenu();
    cy.get('header').findByText(testUser.name).should('be.visible');
    cy.get('header')
      .findByRole('menu')
      .findByRole('menuitem', { name: 'Dashboard' })
      .should('be.visible')
      .click();
    cy.url({ timeout: 60_000 }).should('include', '/dashboard');

    clickUserMenu();
    cy.get('header').findByRole('link', { name: 'Profile' }).click();
    cy.url().should('include', '/profile');

    clickUserMenu();
    cy.get('header').findByRole('menuitem', { name: 'Log out' }).should('be.visible').click();
    cy.get('header').findByText(testUser.name).should('not.exist');

    cy.visit('/');
    cy.wait('@session');
  });

  it('should show navigation links', () => {
    cy.get('header').findByRole('link', { name: 'Dashboard' }).click();
    cy.url({ timeout: 60_000 }).should('include', '/dashboard');

    cy.get('header').findByRole('link', { name: 'Docs' }).click();
    cy.url({ timeout: 60_000 }).should('include', '/docs');

    cy.get('header').findByRole('link', { name: 'Blog' }).click();
    cy.url({ timeout: 60_000 }).should('include', '/blog');

    cy.get('header')
      .findByRole('link', { name: /^logo of \S+/i })
      .click();
    cy.url({ timeout: 60_000 }).should('include', '/');
  });
});

function clickUserMenu() {
  cy.get('header')
    .findByRole('img', {
      name: `The avatar of ${testUser.name}`,
    })
    .click();
}
