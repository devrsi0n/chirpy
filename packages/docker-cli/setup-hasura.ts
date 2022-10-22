import { $ } from 'zx';
import which from 'which';
import { logError } from './log';

export async function setupHasura() {
  if (!(await which('hasura'))) {
    await $`curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash`;
  }
  try {
    await $`hasura migrate apply --database-name "default" --skip-update-check`;
  } catch (error) {
    logError(`Migrate Hasura database failed`, error);
  }
  try {
    await $`hasura seed apply --database-name "default" --skip-update-check`;
  } catch (error) {
    logError(`Seed hasura database failed`, error);
  }
  try {
    await $`hasura metadata apply --skip-update-check`;
  } catch (error) {
    logError(`Apply Hasura metadata failed`, error);
  }
}
