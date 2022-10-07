#!/usr/bin/env ts-node

import { $, question, fs, path } from 'zx';
import * as webPush from 'web-push';
import YAML from 'yaml';
import { parseYaml, getRandomString } from './utilities';

const cwd = process.cwd();

void (async function (): Promise<void> {
  const domain = await question(`What's your domain of this host?`);

  const dc = await parseYaml('docker-compose.tmpl.yml');

  // Download the repo and rename it to chirpy
  await $`curl -L https://github.com/devrsi0n/chirpy/archive/main.tar.gz | tar -xz && mv chirpy-main chirpy`;

  await fs.move(path.resolve(cwd, './chirpy/services/hasura'), cwd, {
    overwrite: true,
  });
  await fs.remove(path.resolve(cwd, './chirpy'));
  const hasuraDc = await parseYaml('./hasura/docker-compose.example.yml');
  dc.services = { ...dc.services, ...hasuraDc.services };
  dc.volumes = { ...dc.volumes, ...hasuraDc.volumes };

  // Setup hasura admin secret
  const hasuraAdminSecret = getRandomString(32);
  dc.services['graphql-engine'].environment.HASURA_GRAPHQL_ADMIN_SECRET =
    hasuraAdminSecret;
  dc.services.chirpy.environment.HASURA_ADMIN_SECRET = hasuraAdminSecret;
  const hasuraConfig = await parseYaml('./hasura/config.yml');
  hasuraConfig.admin_secret = hasuraAdminSecret;
  await $`echo '${JSON.stringify(hasuraConfig)}' > ./hasura/config.yml`;

  // Setup hasura jwt secret
  const hasuraJwtSecret = getRandomString(129);
  dc.services[
    'graphql-engine'
  ].environment.HASURA_GRAPHQL_JWT_SECRET = `'{"type":"HS512","key":"${hasuraJwtSecret}"}'`;
  dc.services.chirpy.environment.NEXTAUTH_SECRET = hasuraJwtSecret;

  // Setup hasura event secret
  const hasuraEventSecret = getRandomString(32);
  dc.services['graphql-engine'].environment.HASURA_EVENT_SECRET =
    hasuraEventSecret;
  dc.services.chirpy.environment.HASURA_EVENT_SECRET = hasuraEventSecret;

  // Setup web-push keys
  const vapidKeys = webPush.generateVAPIDKeys();
  dc.services.chirpy.environment.NEXT_PUBLIC_VAPID = vapidKeys.publicKey;
  dc.services.chirpy.environment.PRIVATE_VAPID = vapidKeys.privateKey;

  // Setup Caddy
  let caddy = await fs.readFile(
    path.resolve(__dirname, './Caddyfile.tmpl'),
    'utf8',
  );
  caddy = caddy.replace('<your-domain>', domain);
  await $`echo '${caddy}' > ./Caddyfile`;

  await $`echo '${YAML.stringify(dc)}' > docker-compose.yml`;
})();
