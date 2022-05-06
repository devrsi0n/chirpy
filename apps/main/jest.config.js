const nextJest = require('next/jest');
const path = require('path');

const createJestConfig = nextJest({
  // Provide the path to load next.config.js and .env files in test environment
  dir: '.',
});

const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    require.resolve('./jest.setup.ts'),
    require.resolve('@chirpy/jest/set-env.js'),
  ],
  testMatch: ['**/src/**/*.test.ts?(x)'],
  // transformIgnorePatterns: [],
  moduleNameMapper: {
    '^\\$/(.*)$': '<rootDir>/src/$1',
  },
  moduleDirectories: ['node_modules', '<rootDir>/'],
  collectCoverageFrom: [
    '<rootDir>/**/*.{ts,tsx}',
    '<rootDir>/__tests__/',
    '!./**/*.stories.{ts,tsx}',
    '!./**/types/',
    '!./**/generated/',
  ],
};

module.exports = createJestConfig(customJestConfig);
