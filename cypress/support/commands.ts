// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import '@testing-library/cypress/add-commands';

Cypress.Commands.add('login', () => {
  cy.intercept('/v1/graphql').as('graphql');

  cy.visit('/auth/sign-in');
  cy.get('input[name=username]').type(Cypress.env('TEST_USER_ID'));
  cy.get('input[name=password]').type(`${Cypress.env('HASURA_EVENT_SECRET')}`);
  cy.get('button[type=submit]').click();
  cy.wait(3000);
});
