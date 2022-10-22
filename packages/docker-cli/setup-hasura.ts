import { $ } from 'zx';
import which from 'which';

export async function setupHasura() {
  if (!(await which('hasura'))) {
    await $`curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash`;
  }
  await $`hasura migrate apply --database-name "default"`;
  await $`hasura seed apply --database-name "default"`;
  await $`hasura metadata apply`;
}
