module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'scope-case': [0, 'always', 'pascal-case'],
    'header-max-length': [2, 'always', 100]
  }
};
