const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/jest.setup.ts'],
  testMatch: ['**/src/**/*.test.ts?(x)'],
  moduleNameMapper: {
    '^\\$/(.*)$': '<rootDir>/src/$1',
  },
  moduleDirectories: ['node_modules', '<rootDir>/'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '<rootDir>/src/__tests__/',
    '!./**/*.stories.{ts,tsx}',
    '!./**/types/',
    '!./**/generated/',
  ],
};

module.exports = createJestConfig(customJestConfig);
