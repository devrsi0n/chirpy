import * as eta from 'eta';
import dotenv from 'dotenv';
import {
  generateSecreats,
  readRelativeFile,
  writeRelativeFile,
} from './utilities';
import Yaml from 'yaml';
import { logDebug } from './log';
import { cd, $, sleep } from 'zx';
import { setupHasura } from './setup-hasura';

eta.configure({
  autoTrim: false,
});

const chirpyURL = 'http://localhost:3000';
const hasuraURL = 'http://localhost:8080';

(async function generateDevFiles() {
  const { hasuraAdminSecret, hasuraEventSecret, hasuraJwtSecret, vapidKeys } =
    generateSecreats();
  const hasuraDCFile = await readRelativeFile(
    '../../services/hasura/docker-compose.eta',
  );
  const hasuraDCResult = await eta.render(hasuraDCFile, {
    HASURA_GRAPHQL_ADMIN_SECRET: hasuraAdminSecret,
    HASURA_GRAPHQL_JWT_SECRET: hasuraJwtSecret,
    HASURA_EVENT_SECRET: hasuraEventSecret,
    HASURA_GRAPHQL_EVENT_URL: chirpyURL,
  })!;
  // logDebug(true, `Hasura docker compose: ${hasuraDCResult}`);
  const hasuraYaml = Yaml.parse(hasuraDCResult);
  // Run hausra locally, we don't need a web server
  delete hasuraYaml.services.caddy;
  delete hasuraYaml.volumes.caddy_certs;
  await writeRelativeFile(
    '../../services/hasura/docker-compose.yml',
    Yaml.stringify(hasuraYaml),
  );

  const hasuraConfig = await readRelativeFile(
    '../../services/hasura/config.eta',
  );
  await writeRelativeFile(
    '../../services/hasura/config.yaml',
    await eta.render(hasuraConfig, {
      admin_secret: hasuraAdminSecret,
      endpoint: hasuraURL,
    }),
  );

  // Generate chirpy local .env
  const env = dotenv.parse(await readRelativeFile('../../apps/main/.env-tmpl'));
  env.HASURA_ADMIN_SECRET = hasuraAdminSecret;
  env.HASURA_EVENT_SECRET = hasuraEventSecret;
  env.NEXTAUTH_SECRET = hasuraJwtSecret;
  env.NEXT_PUBLIC_VAPID = vapidKeys.publicKey;
  env.PRIVATE_VAPID = vapidKeys.privateKey;
  const envString = Object.entries(env)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
  await writeRelativeFile('../../apps/main/.env.local', envString);
  logDebug(true, '✅ Generated dev files');

  // Run and setup hasura docker container
  cd(`../../services/hasura/`);
  await $`docker-compose up -d`;
  logDebug(true, '⌛️ Waiting for Hasura server');
  await sleep(5000);
  await setupHasura();
})();
