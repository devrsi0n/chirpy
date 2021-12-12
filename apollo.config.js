module.exports = {
  client: {
    includes: ['./src/**/*.ts'],
    service: {
      name: 'Chirpy',
      localSchemaFile: './scripts/graphql-codegen/graphql-schema.json',
    },
  },
};
