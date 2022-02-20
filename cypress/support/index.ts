// ***********************************************************
// This example support/index.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
/// <reference types="cypress" />
import '../fixtures/load-env';
import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      login(): void;
    }
  }
}

// This module executes in browser context
// NOTE: This hook only run once when clicking `Run x integration specs` button on Cypress GUI
// before(() => {
//   cy.login();
// });

Cypress.Cookies.defaults({
  preserve: ['next-auth.session-token', 'next-auth.callback-url', 'next-auth.csrf-token'],
});

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});
