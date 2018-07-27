module.exports = {
  parser: "babel-eslint",
  extends: '@dc/eslint-config/es6',
  rules: {
    'compat/compat': 'error'
  },
  plugins: [
    'codeceptjs',
    'compat'
  ],
  env: {
    jest: true,
    'codeceptjs/codeceptjs': true
  },
  globals: {
    COUNTRY: true,
    THEME: true
  },
  settings: {
    polyfills: [
      'fetch',
      'promises'
    ]
  }
};
