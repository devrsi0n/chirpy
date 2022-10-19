#!/usr/bin/env ts-node

import { chalk } from 'zx';
import { generateFiles } from './generate-files';
import { setupHasura } from './setup-hasura';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { isValidDomain } from './utilities';
import { logDebug, logError } from './log';

const parser = yargs(hideBin(process.argv))
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging',
  })
  .command(
    'init [chirpy-domain] [hasura-domain]',
    'initialize the Chirpy docker compose and configurations files',
    (yargs) => {
      return yargs
        .positional('chirpy-domain', {
          type: 'string',
          describe: 'domain of your Chirpy server instance',
        })
        .positional('hasura-domain', {
          type: 'string',
          describe: 'domain of your Hasura server instance',
        });
    },
    async (argv) => {
      let { chirpyDomain, hasuraDomain } = argv;
      if (!chirpyDomain || !hasuraDomain) {
        throw new Error(`chirpy-domain and hasura-domain are required`);
      }
      chirpyDomain = chirpyDomain.replace('https://', '').trim();
      hasuraDomain = hasuraDomain.replace('https://', '').trim();
      if (!isValidDomain(chirpyDomain) || !isValidDomain(hasuraDomain)) {
        throw new Error(
          `Invalid domains, chirpy-domain: ${chirpyDomain}, hasura-domain: ${hasuraDomain}.`,
        );
      }
      try {
        logDebug(
          argv.verbose,
          `Chirpy domain: ${chirpyDomain}, Hasura domain: ${hasuraDomain}`,
        );

        await generateFiles(chirpyDomain, hasuraDomain, {
          verbose: argv.verbose,
        });
        console.log(`✅ Generate files done`);
      } catch (error) {
        logError(`Generate files failed`, error);
        throw error;
      }
    },
  )
  .command(
    'migrate',
    'migrate the Hasura instance, including migrate and seen the Postgres database, apply Hasura metadata',
    () => {},
    async () => {
      try {
        await setupHasura();
        console.log(`✅ Hasura migrate done`);
      } catch (error) {
        console.log(chalk.red(`❌ Hasura migrate failed`, error));
        throw error;
      }
    },
  )

  .strict()
  .help();

(async () => {
  const argv = await parser.argv;
  argv.a;
})();
