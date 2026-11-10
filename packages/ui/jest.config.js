const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to load next.config.js and .env files in your test environment
  dir: './',
});

const customJestConfig = {
  testTimeout: 10000,
  setupFilesAfterEnv: [
    '<rootDir>/src/__tests__/jest.setup.ts',
    '<rootDir>/scripts/jest/set-env.js',
  ],
  testMatch: ['<rootDir>/src/**/*.test.ts?(x)'],
  moduleNameMapper: {
    '^\\$/(.*)$': '<rootDir>/src/$1',
  },
  moduleDirectories: ['node_modules', '<rootDir>/'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '<rootDir>/src/__tests__/',
    '!./**/*.stories.{ts,tsx}',
    '!./**/typings/',
    '!./**/generated/',
  ],
  testEnvironment: '<rootDir>/jest-environment.js',
};

module.exports = createJestConfig(customJestConfig);
