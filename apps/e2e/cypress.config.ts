import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: '2p3w5f',
  chromeWebSecurity: false,
  videoCompression: false,
  e2e: {
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.ts').default(on, config);
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
  retries: {
    runMode: 2,
  },
});
