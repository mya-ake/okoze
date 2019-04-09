module.exports = {
  rootDir: process.cwd(),
  moduleFileExtensions: ['js', 'ts', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/tests/e2e/**/*.spec.ts'],
  testURL: 'http://localhost/',
  testEnvironment: process.env.TEST_TARGET === 'node' ? 'node' : 'jsdom',
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: ['TS2307'],
      },
      tsConfig: './tests/tsconfig.json',
    },
  },
};
