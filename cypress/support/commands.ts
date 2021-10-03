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
import { Session } from 'next-auth';

import { jwtBody } from '../fixtures/user';

Cypress.Commands.add('login', () => {
  cy.intercept('/api/auth/session', (req) => {
    req.continue((res) => {
      res.send({
        body: {
          ...jwtBody,
          hasuraToken: Cypress.env('HASURA_TOKEN'),
        } as Session,
      });
    });
  }).as('session');

  cy.setCookie('next-auth.session-token', Cypress.env('SESSION_TOKEN'));
  Cypress.Cookies.preserveOnce('next-auth.session-token');
});
