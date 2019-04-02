module.exports = {
  rootDir: process.cwd(),
  moduleFileExtensions: ['js', 'ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/tests/e2e/**/*.spec.ts'],
  testURL: 'http://localhost/',
  // testEnvironment: 'node',
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: ['TS2307'],
      },
    },
  },
};
