module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/tests/jest.setup.ts'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
  testMatch: ['**/src/**/*.spec.ts?(x)', '**/server/**/*.spec.ts?(x)'],
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/jest/fileTransformer.js',
  },
  moduleNameMapper: {
    '^\\$/(.*)': '<rootDir>/src/$1',
    '^\\$server/(.*)': '<rootDir>/server/$1',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  coveragePathIgnorePatterns: [
    'node_modules',
    '<rootDir>/src/tests/',
    '<rootDir>/src/types/',
    '<rootDir>/server/types/',
    '<rootDir>/src/graphql/generated/',
    '<rootDir>/server/graphql/generated/',
  ],
  moduleDirectories: ['node_modules', 'src', 'server'],
  collectCoverageFrom: ['<rootDir>/{src,server}/**/*.{ts,tsx}'],
};
