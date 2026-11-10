import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config = {
  framework: {
    name: '@storybook/nextjs',
    options: { nextConfigPath: path.resolve(dirname, '../next.config.js') },
  },
  staticDirs: ['../../../apps/main/public', '../public'],
  stories: ['../src/**/*.stories.@(ts|tsx)'],
};

export default config;
