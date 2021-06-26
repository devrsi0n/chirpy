module.exports = {
  client: {
    includes: ['./src/**/*.ts'],
    service: {
      name: 'totalk',
      localSchemaFile: './docs/graphql-schema.json',
    },
  },
};
