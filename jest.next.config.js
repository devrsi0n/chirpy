const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/jest.setup.ts'],
  // moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
  // testMatch: ['**/src/**/*.test.ts?(x)'],
  // transform: {
  //   // '\\.[jt]sx?$': 'babel-jest',
  //   '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/scripts/jest/fileTransformer.js',
  // },
  moduleNameMapper: {
    // '^\\$/(.*)$': '<rootDir>/src/$1',
    // '^\\$/blocks/(.*)': '<rootDir>/src/blocks/$1',
    // '^\\$/components/(.*)': '<rootDir>/src/components/$1',
    // '^\\$/contexts/(.*)': '<rootDir>/src/contexts/$1',
    // '^\\$/external/(.*)': '<rootDir>/src/external/$1',
    // '^\\$/graphql/(.*)': '<rootDir>/src/graphql/$1',
    // '^\\$/hooks/(.*)': '<rootDir>/src/hooks/$1',
    // '^\\$/lib/(.*)': '<rootDir>/src/lib/$1',
    // '^\\$/pages/(.*)': '<rootDir>/src/pages/$1',
    // '^\\$/server/(.*)': '<rootDir>/src/server/$1',
    // '^\\$/strings/(.*)': '<rootDir>/src/strings/$1',
    // '^\\$/styles/(.*)': '<rootDir>/src/styles/$1',
    // '^\\$/types/(.*)': '<rootDir>/src/types/$1',
    // '^\\$/utilities/(.*)': '<rootDir>/src/utilities/$1',
    // '\\.(css|less|sass|scss|svg)$': 'identity-obj-proxy',
  },
  // coveragePathIgnorePatterns: [
  //   'node_modules',
  //   '<rootDir>/src/__tests__/',
  //   '<rootDir>/src/types/',
  //   '<rootDir>/src/server/types/',
  //   '<rootDir>/src/graphql/generated/',
  //   '<rootDir>/src/server/graphql/generated/',
  // ],
  // moduleDirectories: ['node_modules', 'src'],
  // collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}', '!./**/*.stories.{ts,tsx}'],
};

module.exports = createJestConfig(customJestConfig);
