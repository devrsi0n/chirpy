#!/usr/bin/env ts-node

import { $, chalk, question } from 'zx';
import { generateFiles } from './generate-files';
import { setupHasura } from './setup-hasura';

void (async function (): Promise<void> {
  const domain = await question(`What's your domain of this host? `);
  try {
    await generateFiles(domain);
    console.log(`✅ Generate files done`);
  } catch (error) {
    console.log(chalk.red(`❌ Generate files failed`, error));
    process.exit(1);
  }
  try {
    await $`docker-compose up -d`;
    console.log(`✅ Start docker containers done`);
  } catch (error) {
    console.log(chalk.red(`❌ Start docker containers failed`, error));
    process.exit(1);
  }
  try {
    await setupHasura();
    console.log(`✅ Setup hasura done`);
  } catch (error) {
    console.log(chalk.red(`❌ Setup hasura failed`, error));
    process.exit(1);
  }
})();
