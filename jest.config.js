module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/jest.setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
  testMatch: ['**/src/**/*.test.ts?(x)'],
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/jest/fileTransformer.js',
  },
  moduleNameMapper: {
    '^\\$/(.*)': '<rootDir>/src/$1',
    '\\.(css|less|sass|scss|svg)$': 'identity-obj-proxy',
  },
  coveragePathIgnorePatterns: [
    'node_modules',
    '<rootDir>/src/__tests__/',
    '<rootDir>/src/types/',
    '<rootDir>/src/server/types/',
    '<rootDir>/src/graphql/generated/',
    '<rootDir>/src/server/graphql/generated/',
  ],
  moduleDirectories: ['node_modules', 'src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}', '!./**/*.stories.{ts,tsx}'],
};
