#!/usr/bin/env zx
/* eslint-disable no-console */
import { $, path } from 'zx';

const serverCodeGen = path.resolve(__dirname, 'server-codegen.yml');
const clientCodeGen = path.resolve(__dirname, 'client-codegen.yml');
const extraFlags = process.env.GQL_WATCH ? '--watch' : '';

await $`graphql-codegen --config ${serverCodeGen} ${extraFlags}`;
console.log(chalk.blue('Generated sever graphql'));

await $`graphql-codegen --config ${clientCodeGen} ${extraFlags}`;
console.log(chalk.blue('Generated frontend graphql'));

const schemaPath = path.resolve(__dirname, 'schema.graphql');
// Generate schema for stellate
await $`gq http://127.0.0.1:8080/v1/graphql -H "X-Hasura-Admin-Secret: myadminsecretkey" --introspect > "${schemaPath}"`;
console.log(chalk.blue('Generated graphql schema'));
