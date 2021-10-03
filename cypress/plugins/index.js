/// <reference types="cypress" />
/* eslint-disable unicorn/prefer-module */
// ***********************************************************
// This example plugins/index.ts can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
require('dotenv').config();
const { createAuthToken, createToken } = require('../../src/server/utilities/create-token');

const { testUser, jwtBody } = require('../fixtures/user');

// Must use commonjs in this file or it will not work
/**
 * @type {Cypress.PluginConfig}
 */
module.exports = function Plugins(on, config) {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  config.env.HASH_KEY = process.env.HASH_KEY;
  const maxAge = 60 * 60;
  config.env.HASURA_TOKEN = createAuthToken(
    {
      userId: String(testUser.id),
      name: testUser.name,
      email: testUser.email,
    },
    {
      maxAge,
      allowedRoles: ['user'],
      defaultRole: 'user',
      role: 'user',
      hasuraClaims: {
        // Projects with edit permission of the user
        // 'X-Hasura-Editable-Project-Ids': getPGArray(editableProjectIds),
        // 'X-Hasura-Editable-Project-Ids': editableProjectIds,
      },
    },
  );
  config.env.SESSION_TOKEN = createToken(jwtBody, { maxAge });

  return config;
};
