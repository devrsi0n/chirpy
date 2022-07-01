import { testUser } from '../../fixtures/user';

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

  it('should show user menu', () => {
    cy.login();
    loadHomePage();
    cy.get('header').findByRole('link', { name: 'Dashboard' }).click();
    cy.url({ timeout: 60_000 }).should('include', '/dashboard');
    clickUserMenu();
    cy.get('header').findByText(testUser.name).should('be.visible');
    cy.get('header')
      .findByRole('menu')
      .findByRole('menuitem', { name: 'Dashboard' })
      .should('be.visible')
      .click({ force: true });
    cy.url({ timeout: 60_000 }).should('include', '/dashboard');

    clickUserMenu();
    cy.get('header')
      .findByRole('menuitem', { name: 'Profile' })
      .click({ force: true });
    cy.url({ timeout: 60_000 }).should('include', '/profile');

    clickUserMenu();
    cy.get('header')
      .findByRole('menuitem', { name: 'Log out' })
      .should('be.visible')
      .click();
    cy.get('header').findByText(testUser.name).should('not.exist');
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

function clickUserMenu() {
  const userImage = cy.get('header').findByRole('img', {
    name: `The avatar of ${testUser.name}`,
  });
  userImage.parent().then((elem) => {
    // Only click the menu if it's unexpanded
    if (elem.attr('aria-expanded') === 'false') {
      elem.trigger('click');
    }
  });
}
