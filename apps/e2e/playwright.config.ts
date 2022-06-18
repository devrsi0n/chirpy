import { PlaywrightTestConfig, devices } from '@playwright/test';
import * as DotEnv from 'dotenv';
import * as path from 'path';

DotEnv.config({
  // eslint-disable-next-line unicorn/prefer-module
  path: path.resolve(__dirname, '../main/.env.local'),
});

const config: PlaywrightTestConfig = {
  globalSetup: require.resolve('./global-setup'),
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  testDir: 'tests',
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
    // Tell all tests to load signed-in state from 'storageState.json'.
    storageState: 'storageState.json',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  reporter: process.env.CI ? 'github' : 'list',
};
export default config;
