import { cd, $ } from 'zx';
import { getCWDPath } from './utilities';

export async function setupHasura() {
  cd(getCWDPath('./hasura'));
  await $`curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash`;
  await $`hasura migrate apply --database-name "default"`;
  await $`hasura seed apply --database-name "default"`;
  await $`hasura metadata apply`;
}
