module.exports = {
  client: {
    includes: ['./server/**/*.ts', './src/**/*.ts', './shared/**/*.ts'],
    service: {
      name: 'totalk',
      localSchemaFile: './docs/graphql-schema.json',
    },
  },
};
