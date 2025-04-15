const { defineConfig } = require('eslint-define-config')
const tsEslint = require('@typescript-eslint/eslint-plugin')
const tsParser = require('@typescript-eslint/parser')
const tsNode = require('eslint-plugin-node')

module.exports = defineConfig([
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tsEslint,
      node: tsNode,
    },

    rules: {
      // ESLint recommended rules
      'no-console': 'off',
      'no-debugger': 'warn',

      // @typescript-eslint rules
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],

      // eslint-plugin-node rules
      'node/no-unsupported-features/es-syntax': 'off',

      // Custom rules
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
  },
])
