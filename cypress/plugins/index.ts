// ***********************************************************
// This example plugins/index.ts can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
import { createAuthToken, createToken } from '../../src/server/utilities/create-token';
import '../fixtures/load-env';
import { jwtBody, testUser } from '../fixtures/user';

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
      userId: testUser.id,
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
  config.env.TEST_USER_ID = process.env.TEST_USER_ID;
  config.env.NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL;
  config.env.NEXT_PUBLIC_HASURA_HTTP_ORIGIN = process.env.NEXT_PUBLIC_HASURA_HTTP_ORIGIN;

  return config;
}
