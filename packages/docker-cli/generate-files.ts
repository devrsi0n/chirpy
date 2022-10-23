import { $ } from 'zx';

import * as eta from 'eta';
import {
  readCWDFile,
  moveCWDFile,
  writeCWDFile,
  removeCWDFile,
  generateSecreats,
} from './utilities';
import { logDebug } from './log';

type Options = {
  verbose?: boolean;
};

eta.configure({
  autoTrim: false,
});

const CHIRPY_DC_TMPL_PATH = './chirpy/docker-compose.eta';
const CHIRPY_CADDY_TMPL_PATH = './chirpy/Caddyfile.eta';
const HASURA_DC_TMPL_PATH = './hasura/docker-compose.eta';
const HASURA_CADDY_TMPL_PATH = './hasura/Caddyfile.eta';
const HASURA_CONFIG_TMPL_PATH = './hasura/config.eta';

export async function generateFiles(
  chirpyDomain: string,
  hasuraDomain: string,
  { verbose }: Options,
): Promise<void> {
  // Download the repo
  await $`curl -L https://github.com/devrsi0n/chirpy/archive/main.tar.gz | tar -xz`;

  await moveCWDFile('./chirpy-main/services/hasura', './hasura');
  await moveCWDFile('./chirpy-main/services/chirpy', './chirpy');
  await removeCWDFile('./chirpy-main');
  const chirpyDCFile = await readCWDFile(CHIRPY_DC_TMPL_PATH);
  logDebug(verbose, 'Chirpy docker compose file: ', chirpyDCFile);

  const chirpyURL = `https://${chirpyDomain}`;
  const { hasuraAdminSecret, hasuraEventSecret, hasuraJwtSecret, vapidKeys } =
    generateSecreats();
  const hasuraConfig = await readCWDFile(HASURA_CONFIG_TMPL_PATH);
  await writeCWDFile(
    './hasura/config.yaml',
    await eta.render(hasuraConfig, {
      admin_secret: hasuraAdminSecret,
      endpoint: `https://${hasuraDomain}`,
    }),
  );

  const hasuraDCFile = await readCWDFile(HASURA_DC_TMPL_PATH);

  const chirpyCaddy = await readCWDFile(CHIRPY_CADDY_TMPL_PATH);
  const chirpyCaddyResult = await eta.render(chirpyCaddy, {
    domain: chirpyDomain,
  });
  await writeCWDFile('./chirpy/Caddyfile', chirpyCaddyResult);
  const chirpyDCResult = await eta.render(chirpyDCFile, {
    NEXT_PUBLIC_HASURA_HTTP_ORIGIN: `https://${hasuraDomain}/v1/graphql`,
    NEXT_PUBLIC_HASURA_WS_ORIGIN: `wss://${hasuraDomain}/v1/graphql`,
    NEXT_PUBLIC_APP_URL: chirpyURL,
    NEXT_PUBLIC_VAPID: vapidKeys.publicKey,
    PRIVATE_VAPID: vapidKeys.privateKey,
    NEXTAUTH_URL: chirpyURL,
    HASURA_ADMIN_SECRET: hasuraAdminSecret,
    NEXTAUTH_SECRET: hasuraJwtSecret,
    HASURA_EVENT_SECRET: hasuraEventSecret,
  });
  logDebug(verbose, 'Chirpy docker compose content', chirpyDCResult);
  await writeCWDFile('./chirpy/docker-compose.yml', chirpyDCResult);

  const hasuraCaddy = await readCWDFile(HASURA_CADDY_TMPL_PATH);
  const hasuraCaddyResult = eta.render(hasuraCaddy, {
    domain: hasuraDomain,
  });
  const hasuraDCResult = await eta.render(hasuraDCFile, {
    HASURA_GRAPHQL_ADMIN_SECRET: hasuraAdminSecret,
    HASURA_GRAPHQL_JWT_SECRET: hasuraJwtSecret,
    HASURA_EVENT_SECRET: hasuraEventSecret,
    HASURA_GRAPHQL_EVENT_URL: chirpyURL,
  });
  await writeCWDFile('./hasura/Caddyfile', hasuraCaddyResult);
  logDebug(verbose, 'Hasura docker compose content', hasuraDCResult);
  await writeCWDFile('./hasura/docker-compose.yml', hasuraDCResult);

  await Promise.all(
    [
      CHIRPY_DC_TMPL_PATH,
      CHIRPY_CADDY_TMPL_PATH,
      HASURA_DC_TMPL_PATH,
      HASURA_CADDY_TMPL_PATH,
      HASURA_CONFIG_TMPL_PATH,
    ].map((_path) => removeCWDFile(_path)),
  );
}
