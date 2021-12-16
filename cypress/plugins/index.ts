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
import * as DotEnv from 'dotenv';

import { createAuthToken, createToken } from '../../src/server/utilities/create-token';
import { testUser, jwtBody } from '../fixtures/user';

DotEnv.config({
  path: '.env',
});

DotEnv.config({
  path: '.env.test',
});

DotEnv.config({
  path: '.env.test.local',
});

export default function Plugins(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
): void | Cypress.ConfigOptions | Promise<Cypress.ConfigOptions> {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  config.env.HASH_KEY = process.env.HASH_KEY;
  const maxAge = 24 * 60 * 60;
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
        'X-Hasura-Editable-Project-Ids': '{}',
        // 'X-Hasura-Editable-Project-Ids': editableProjectIds,
      },
    },
  );
  config.env.SESSION_TOKEN = createToken(jwtBody, { maxAge });

  return config;
}
