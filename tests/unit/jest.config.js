module.exports = {
  rootDir: process.cwd(),
  moduleFileExtensions: ['js', 'ts', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  testMatch: ['**/tests/unit/**/*.spec.ts'],
  testURL: 'http://localhost/',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      diagnostics: {},
      tsConfig: './tests/tsconfig.json',
    },
  },
};
