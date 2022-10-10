import { $, fs, path } from 'zx';
import * as webPush from 'web-push';
import YAML from 'yaml';
import { parseYaml, getRandomString, getCWDPath } from './utilities';

export async function generateFiles(domain: string) {
  const dc = await parseYaml('./docker-compose.tmpl.yml');
  dc.services.chirpy.environment.NEXT_PUBLIC_APP_URL = `https://${domain}`;
  dc.services.chirpy.environment.NEXTAUTH_URL = `https://${domain}`;
  dc.services.chirpy.environment.NEXT_PUBLIC_HASURA_HTTP_ORIGIN = `https://${domain}:8000/v1/graphql`;
  dc.services.chirpy.environment.NEXT_PUBLIC_HASURA_WS_ORIGIN = `wss://${domain}:8000/v1/graphql`;

  // Download the repo and rename it to chirpy
  await $`curl -L https://github.com/devrsi0n/chirpy/archive/main.tar.gz | tar -xz && mv chirpy-main chirpy`;

  await fs.move(
    getCWDPath('./chirpy/services/hasura'),
    getCWDPath('./hasura'),
    {
      overwrite: true,
    },
  );
  await fs.remove(getCWDPath('./chirpy'));
  const hasuraDc = await parseYaml(
    getCWDPath('./hasura/docker-compose.example.yml'),
  );
  dc.services = { ...hasuraDc.services, ...dc.services };
  dc.volumes = { ...hasuraDc.volumes, ...dc.volumes };

  // Setup hasura admin secret
  const hasuraAdminSecret = getRandomString(32);
  dc.services['graphql-engine'].environment.HASURA_GRAPHQL_ADMIN_SECRET =
    hasuraAdminSecret;
  dc.services.chirpy.environment.HASURA_ADMIN_SECRET = hasuraAdminSecret;
  const hasuraConfig = await parseYaml(getCWDPath('./hasura/config.yaml'));
  hasuraConfig.admin_secret = hasuraAdminSecret;
  hasuraConfig.endpoint = `https://${domain}:8000`;
  await fs.writeFile(
    getCWDPath('./hasura/config.yaml'),
    YAML.stringify(hasuraConfig),
  );

  // Setup hasura jwt secret
  const hasuraJwtSecret = getRandomString(129);
  dc.services[
    'graphql-engine'
  ].environment.HASURA_GRAPHQL_JWT_SECRET = `{"type":"HS512","key":"${hasuraJwtSecret}"}`;
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
    'utf8'
  );
  caddy = caddy.replaceAll('<your-domain>', domain);
  await fs.writeFile(getCWDPath('./Caddyfile'), caddy);

  await fs.writeFile(getCWDPath('./docker-compose.yml'), YAML.stringify(dc));
}
