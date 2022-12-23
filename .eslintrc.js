module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['prettier', '@typescript-eslint'],
  parserOptions: {
    parser: 'typescript-eslint/parser',
  },
  ignorePatterns: ['node_modules', 'build', 'dist', 'public'],
  rules: {
    eqeqeq: 'error',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-console': 'warn',
    'no-debugger': 'warn',
    quotes: ['error', 'single'],
    'prettier/prettier': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};