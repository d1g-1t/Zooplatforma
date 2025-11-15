/** @type {import("eslint").Linter.Config} */

module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:storybook/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint', 'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};

/**
 * Types for rules:
 *
 * type Severity = 'off' | 'warn' | 'error'; or 0 | 1 | 2 tells old docs
 * type RuleConfig =
 *   | Severity
 *   | [Severity]
 *   | [
 *       Severity,
 *       ...Options,  // Options is the object from the rule docs
 *     ];
 */
