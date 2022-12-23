const prettierRules = {
  singleQuote: true,
  endOfLine: 'auto',
  tabWidth: 2,
  printWidth: 160,
};

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    'prettier',
    '@typescript-eslint'
  ],
  parserOptions: {
    parser: 'typescript-eslint/parser',
  },
  ignorePatterns: [
    'node_modules',
    'build',
    'dist',
    'public',
    'server',
  ],
  rules: {
    eqeqeq: 'error',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    quotes: ['error', 'single'],
    'prettier/prettier': ['error', { ...prettierRules }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
