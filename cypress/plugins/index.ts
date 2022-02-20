// ***********************************************************
// This example plugins/index.ts can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
import '../fixtures/load-env';

export default function Plugins(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
): void | Cypress.ConfigOptions | Promise<Cypress.ConfigOptions> {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  config.env.TEST_USER_ID = process.env.TEST_USER_ID;
  config.env.HASURA_EVENT_SECRET = process.env.HASURA_EVENT_SECRET;

  return config;
}
