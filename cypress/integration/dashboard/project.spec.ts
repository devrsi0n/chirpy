import { waitGraphql } from '../../fixtures/utils';

describe('Project', () => {
  before(() => {
    cy.login();

    waitForSpinnerToDisappear();
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
        waitGraphql();
      }
    });

    // Create project
    cy.findByRole('button', {
      name: /create project/i,
    }).click();
    cy.findByRole('textbox', {
      name: /name of this project/i,
    }).type('Foo');
    cy.findByRole('textbox', {
      name: /associate a domain with this project/i,
    }).type('foobar.com');
    cy.findByRole('button', {
      name: /^create$/i,
    }).click();
    waitForSpinnerToDisappear();
  });

  it('should show integration doc', () => {
    cy.findByRole('button', {
      name: /integrate guide/i,
    }).click();
    cy.findByRole('dialog', { name: /get started with \S+ comment/i }).should('be.visible');
    cy.findByRole('button', { name: /dismiss/i }).click();
    cy.findByRole('dialog', { name: /get started with \S+ comment/i }).should('not.exist');
  });

  it('should active theme', () => {
    cy.findByRole('link', { name: /theme/i }).click();
    cy.url({ timeout: 60_000 }).should('include', '/theme/foobar.com');
    cy.findByLabelText(/primary color selector/i).click();
    cy.findByRole('button', { name: /color green/i }).click();
    cy.findByRole('button', { name: /post/i }).should(
      'have.css',
      'background-color',
      'rgb(48, 164, 108)',
    );

    cy.visit('/dashboard');
  });
});

const waitForSpinnerToDisappear = () =>
  cy.get(`[aria-label="Loading data"]`, { timeout: 10_000 }).should('not.exist');
