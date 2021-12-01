module.exports = {
  client: {
    includes: ['./src/**/*.ts'],
    service: {
      name: 'Chirpy',
      localSchemaFile: './docs/graphql-schema.json',
    },
  },
};
