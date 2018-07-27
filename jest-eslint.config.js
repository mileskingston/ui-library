const path = require('path');

module.exports = {
  runner: 'jest-runner-eslint',
  displayName: 'lint',
  testMatch: [
    path.resolve('src/**/*.js')
  ]
};
