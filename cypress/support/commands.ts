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

import { defaultCookies } from '../../src/server/utilities/default-cookies';
import { jwtBody } from '../fixtures/user';

const cookieOptions = defaultCookies(Cypress.config().baseUrl.startsWith('https')).sessionToken;
const cookieName = cookieOptions.name;

Cypress.Commands.add('login', () => {
  cy.intercept(`/api/auth/session`, (req) => {
    // Just return the response from test, not need to reach the server
    req.reply({
      ...jwtBody,
      hasuraToken: Cypress.env('HASURA_TOKEN'),
    } as Session);
  }).as('session');

  cy.intercept('/v1/graphql').as('graphql');

  cy.setCookie(cookieName, Cypress.env('SESSION_TOKEN'), {
    httpOnly: cookieOptions.options.httpOnly,
    secure: cookieOptions.options.secure,
    sameSite: cookieOptions.options.sameSite as 'lax',
  });
  Cypress.Cookies.preserveOnce(cookieName);
});
