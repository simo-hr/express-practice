module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jQuery: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    semi: ['error', 'none'],
    quotes: ['error', 'single'],
    'no-console': ['on'],
  },
}
