import * as DotEnv from 'dotenv';
import * as path from 'path';

DotEnv.config({
  // eslint-disable-next-line unicorn/prefer-module
  path: path.resolve(__dirname, '../../../main/.env.local'),
  debug: true,
});
