import { $ } from 'zx';
import * as webPush from 'web-push';
import {
  parseYaml,
  getRandomString,
  getCWDPath,
  readCWDFile,
  moveCWDFile,
  writeCWDFile,
  removeCWDFile,
  isValidDomain,
} from './utilities';

export async function generateFiles(
  chirpyDomain: string,
  hasuraDomain: string,
): Promise<void> {
  // Download the repo and rename it to chirpy
  await $`curl -L https://github.com/devrsi0n/chirpy/archive/main.tar.gz | tar -xz`;

  await moveCWDFile('./chirpy/services/hasura', './hasura');
  await moveCWDFile('./chirpy/services/chirpy', './chirpy');
  await removeCWDFile('./chirpy-main');
  const chirpyDCFile = await readCWDFile('./chirpy/docker-compose.tmpl.yml');

  const chirpyURL = `https://${chirpyDomain}`;
  chirpyDCFile.replaceAll('${NEXT_PUBLIC_APP_URL}', chirpyURL);
  chirpyDCFile.replaceAll('${NEXTAUTH_URL}', `https://${chirpyDomain}`);
  chirpyDCFile.replaceAll(
    '${NEXT_PUBLIC_HASURA_HTTP_ORIGIN}',
    `https://${hasuraDomain}:8000/v1/graphql`,
  );
  chirpyDCFile.replaceAll(
    '${NEXT_PUBLIC_HASURA_WS_ORIGIN}',
    `wss://${hasuraDomain}:8000/v1/graphql`,
  );

  // Setup hasura admin secret
  const hasuraAdminSecret = getRandomString(32);
  chirpyDCFile.replaceAll('${HASURA_GRAPHQL_ADMIN_SECRET}', hasuraAdminSecret);
  chirpyDCFile.replaceAll('${HASURA_ADMIN_SECRET}', hasuraAdminSecret);
  const hasuraConfig = await parseYaml(getCWDPath('./hasura/config.yaml'));
  hasuraConfig.admin_secret = hasuraAdminSecret;
  hasuraConfig.endpoint = `https://${hasuraDomain}:8000`;
  await writeCWDFile('./hasura/config.yaml', hasuraConfig);

  const hasuraDCFile = await readCWDFile('./hasura/docker-compose.example.yml');
  // Setup hasura jwt secret
  const hasuraJwtSecret = getRandomString(129);
  hasuraDCFile.replaceAll('${HASURA_GRAPHQL_JWT_SECRET}', hasuraJwtSecret);
  chirpyDCFile.replaceAll('${NEXTAUTH_SECRET}', hasuraJwtSecret);

  // Setup hasura event secret
  const hasuraEventSecret = getRandomString(32);
  chirpyDCFile.replaceAll('${HASURA_EVENT_SECRET}', hasuraEventSecret);
  hasuraDCFile.replaceAll('${HASURA_EVENT_SECRET}', hasuraEventSecret);

  // Setup web-push keys
  const vapidKeys = webPush.generateVAPIDKeys();
  chirpyDCFile.replaceAll('${NEXT_PUBLIC_VAPID}', vapidKeys.publicKey);
  chirpyDCFile.replaceAll('${PRIVATE_VAPID}', vapidKeys.privateKey);

  // Setup Caddy
  let caddy = await readCWDFile('./chirpy/Caddyfile.tmpl');
  caddy = caddy.replaceAll('<your-domain>', chirpyDomain);
  await writeCWDFile('./chirpy/Caddyfile', caddy);

  await writeCWDFile('./chirpy/docker-compose.yml', chirpyDCFile);
  await writeCWDFile('./hasura/docker-compose.yml', hasuraDCFile);
}
