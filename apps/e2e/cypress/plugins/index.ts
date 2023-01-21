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
  if (!process.env.TEST_USER_ID?.length) {
    throw new Error(`Expect env variable: TEST_USER_ID`);
  }
  config.env.TEST_USER_ID = process.env.TEST_USER_ID.replace(/-/g, '').slice(
    0,
    23,
  );
  if (!process.env.CYPRESS_BASE_URL) {
    throw new Error(`Expect env variable: CYPRESS_BASE_URL`);
  }
  const CYPRESS_BASE_URL = process.env.CYPRESS_BASE_URL;
  const homeUrl = new URL(CYPRESS_BASE_URL);
  const protocol = homeUrl.protocol;
  // TODO: Need to run local dev server to make app domain work on CI
  config.env.APP_ORIGIN = `${protocol}//app.${homeUrl.host}`;
  return config;
}
