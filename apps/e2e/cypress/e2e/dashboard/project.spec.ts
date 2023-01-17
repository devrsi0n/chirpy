import { testUser } from '../../fixtures/user';
import { waitTrpc } from '../../fixtures/utils';

describe('Project', () => {
  before(() => {
    cy.login();
    Cypress.config('baseUrl', Cypress.env('APP_ORIGIN'));
    cy.visit(`${Cypress.env('APP_ORIGIN')}/`);
    // Wait for spinner dismiss
    cy.get(`[aria-label="Loading data"]`, { timeout: 10_000 }).should(
      'not.exist',
    );
    cy.get('body').then(($body) => {
      // Delete duplicated project if exist
      if ($body.find(`[aria-label='Project list']`).length > 0) {
        cy.findByLabelText(/project list/i)
          .first()
          .first()
          .findByRole('button', { name: /show more project options/i })
          .click();
        cy.findByLabelText(/project list/i)
          .first()
          .first()
          .findByRole('menuitem', { name: /delete/i })
          .click();
        cy.findByRole('dialog')
          .findByRole('button', { name: /delete/i })
          .click();
        waitTrpc();
      }
    });

    // Create project
    cy.findByRole('button', {
      name: /create project/i,
    }).click({ force: true });
    cy.findByRole('textbox', {
      name: /name/i,
    }).type('Foo');
    cy.findByRole('textbox', {
      name: /domain/i,
    }).type('foobar.com');
    cy.findByRole('button', {
      name: /^create$/i,
    }).click();
    waitForProjectCardAppear();
  });

  it('should show integration doc', () => {
    cy.findByRole('button', {
      name: /integrate guide/i,
    }).click();
    cy.findByRole('dialog', { name: /get started with \S+ comment/i }).should(
      'be.visible',
    );
    cy.findByRole('button', { name: /dismiss/i }).click();
    cy.findByRole('dialog', { name: /get started with \S+ comment/i }).should(
      'not.exist',
    );
  });

  it('should active theme', () => {
    cy.findByRole('link', { name: /theme/i }).click();
    cy.url({ timeout: 60_000 }).should('include', '/theme/foobar.com');
    cy.findByLabelText(/primary color picker/i).click();
    cy.findByRole('button', { name: /color green/i }).click({ force: true });
    cy.findByRole('button', { name: /post/i }).should(
      'have.css',
      'background-color',
      'rgb(48, 164, 108)',
    );

    cy.visit(`${Cypress.env('APP_ORIGIN')}/`);
  });

  it('should show user menu', () => {
    cy.login();
    cy.get('header').findByRole('link', { name: 'Dashboard' }).click();
    cy.url({ timeout: 60_000 }).should('include', '/');
    clickUserMenu();
    cy.get('header').findByText(testUser.name).should('be.visible');
    cy.get('header')
      .findByRole('menu')
      .findByRole('menuitem', { name: 'Dashboard' })
      .should('be.visible')
      .click({ force: true });
    cy.url({ timeout: 60_000 }).should('include', '/');

    clickUserMenu();
    cy.get('header')
      .findByRole('menuitem', { name: 'Profile' })
      .click({ force: true });
    cy.url({ timeout: 60_000 }).should('include', '/profile');

    clickUserMenu();
    cy.get('header')
      .findByRole('menuitem', { name: 'Log out' })
      .should('be.visible')
      .click({ force: true });
    cy.get('header').findByText(testUser.name).should('not.exist');
  });
});

const waitForProjectCardAppear = () =>
  cy
    .findByRole('button', { name: /theme/i, timeout: 10_000 })
    .should('be.visible');

function clickUserMenu() {
  const userImage = cy.get('header').findByRole('img', {
    name: new RegExp(`${testUser.name}'s avatar`, 'i'),
  });
  userImage.parent().then((elem) => {
    // Only click the menu if it's unexpanded
    if (elem.attr('aria-expanded') === 'false') {
      elem.trigger('click');
    }
  });
}
