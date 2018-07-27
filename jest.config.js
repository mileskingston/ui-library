const path = require('path');

module.exports = {
  transform: {
    '.*': 'jest-css-modules'
  },
  testMatch: [
    path.resolve('src/**/*.spec.js')
  ],
  setupTestFrameworkScriptFile: 'mock-local-storage',
  setupFiles: [
    path.resolve('tests/jest.setup.js')
  ],
  moduleNameMapper: {
    '\\.(css|jpg|png)$': '<rootDir>/tests/empty-module.js'
  },
  globals: {
    COUNTRY: 'GB'
  }
};
