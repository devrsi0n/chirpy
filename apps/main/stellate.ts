import { Config } from 'stellate';

// @ts-ignore
const schema = require.resolve('@chirpy-dev/graphql/scripts/schema.graphql');
const config: Config = {
  config: {
    enablePlayground: true,
    // Not enable cache by default
    passThroughOnly: true,
    rules: [
      {
        types: ['Page', 'Project', 'User'],
        maxAge: 900,
        swr: 900,
        scope: 'AUTHENTICATED',
        description: 'Cache everything (default)',
      },
    ],
    name: 'hasura',
    originUrl: 'https://hasura.chirpy.dev/v1/graphql',
    schema,
    scopes: {
      AUTHENTICATED: 'header:authorization|header:x-hasura-admin-secret',
    },
    environments: {
      // Use a separate service for staging, that points to your staging
      // GraphQL API. To push configuration to that environment, use
      // stellate push --env staging
      staging: {
        name: 'hasura-staging',
        originUrl: 'https://hasura-staging.chirpy.dev/v1/graphql',
        schema,
      },
    },
  },
};

export default config;
