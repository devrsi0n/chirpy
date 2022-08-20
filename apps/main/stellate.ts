import { Config } from 'stellate';

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
        description: 'Cache everything (default)',
      },
    ],
    name: 'hasura',
    originUrl: 'https://hasura.chirpy.dev/v1/graphql',
    schema: './scripts/graphql/schema.graphql',
    environments: {
      // Use a separate service for staging, that points to your staging
      // GraphQL API. To push configuration to that environment, use
      // stellate push --env staging
      staging: {
        name: 'hasura-staging',
        originUrl: 'https://hasura-staging.chirpy.dev/v1/graphql',
        schema: './scripts/graphql/schema.graphql',
      },
    },
  },
};

export default config;
