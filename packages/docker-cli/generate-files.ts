import { $ } from 'zx';
import * as webPush from 'web-push';
import Yaml from 'yaml';
import * as eta from 'eta';
import {
  parseYaml,
  getRandomString,
  getCWDPath,
  readCWDFile,
  moveCWDFile,
  writeCWDFile,
  removeCWDFile,
} from './utilities';
import { logDebug } from './log';

type Options = {
  verbose?: boolean;
};

eta.configure({
  autoTrim: false,
});

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
  const chirpyDCFile = await readCWDFile('./chirpy/docker-compose.eta');
  logDebug(verbose, 'Chirpy docker compose file: ', chirpyDCFile);

  const chirpyURL = `https://${chirpyDomain}`;
  const hasuraAdminSecret = getRandomString(32);
  const hasuraConfig = await parseYaml(getCWDPath('./hasura/config.yaml'));
  hasuraConfig.admin_secret = hasuraAdminSecret;
  hasuraConfig.endpoint = `https://${hasuraDomain}`;
  await writeCWDFile('./hasura/config.yaml', Yaml.stringify(hasuraConfig));

  const hasuraDCFile = await readCWDFile('./hasura/docker-compose.eta');

  const hasuraJwtSecret = getRandomString(129);
  const hasuraEventSecret = getRandomString(32);
  const vapidKeys = webPush.generateVAPIDKeys();

  let chirpyCaddy = await readCWDFile('./chirpy/Caddyfile.eta');
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

  let hasuraCaddy = await readCWDFile('./hasura/Caddyfile.eta');
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
}
