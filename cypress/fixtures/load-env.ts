import * as DotEnv from 'dotenv';

DotEnv.config({
  path: '.env.test',
});

DotEnv.config({
  path: '.env.test.local',
  debug: true,
});
