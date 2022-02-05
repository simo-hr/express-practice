module.exports = {
  env: {
    browser: true,
    jquery: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-console': 'off',
    semi: [2, 'never'],
    'no-undef': 'off',
    // quotes: [1, "single", { avoidEscape: true }],
    'comma-dangle': ['error', {
      arrays: 'never',
      objects: 'always',
      imports: 'always',
      exports: 'always',
      functions: 'never',
    }],
    'vue/max-attributes-per-line': 'off',
    'no-unused-vars': 'off', // 使っていない変数を許可
    'vue/html-self-closing': 'off', // 空タグを許可する
  },
}
