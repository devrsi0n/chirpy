module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest/jest.setup.ts'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
  testMatch: [
    '**/src/**/*.spec.ts?(x)',
    '**/server/**/*.spec.ts?(x)',
    '**/shared/**/*.spec.ts?(x)',
  ],
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/jest/fileTransformer.js',
  },
  moduleNameMapper: {
    '^\\$/(.*)': '<rootDir>/src/$1',
    '^\\$server/(.*)': '<rootDir>/server/$1',
    '^\\$shared/(.*)': '<rootDir>/shared/$1',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  moduleDirectories: ['node_modules', 'src', 'shared', 'server'],
  collectCoverageFrom: ['<rootDir>/{src,server,shared}/**/*.{ts,tsx}'],
};
