/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  testTimeout: 60000,
  testRegex: '.*\\.test\\.(ts|tsx)$',
  coverageDirectory: './coverage',
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  coverageReporters: ['text', 'text-summary', 'lcov'],
  collectCoverageFrom: ['src/**/*.js'],

  coverageThreshold: {
    global: {
      statements: 84,
      branches: 71,
      functions: 85,
      lines: 84,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
}
