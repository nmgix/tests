import eslint from '@eslint/js';
import node from 'eslint-plugin-node';
import jsdoc from 'eslint-plugin-jsdoc';
import prettier from 'eslint-plugin-prettier';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';

export default [
  eslint.configs.recommended,
  // prettier.configs.recommended,
  {
    files: ['src/**/*.js', 'src/**/*.d.js', 'src/**/*.dto.js', 'src/**/*.cjs'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.node,
        atob: 'readonly',
        structuredClone: 'readonly',
      },
    },
    plugins: {
      node,
      prettier,
      jsdoc,
      unusedImports,
    },
    rules: {
      'no-async-promise-executor': 'off',
      'jsdoc/check-param-names': 'error',
      'jsdoc/check-types': 'error',
      'jsdoc/require-param-type': 'error',
      'jsdoc/require-returns-type': 'error',
      'jsdoc/check-syntax': 'error',
      'jsdoc/valid-types': 'warn',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
      ...prettier.configs.recommended.rules,
    },
  },
  { ignores: ['node_modules', '.dev', '.devsrc', '.local', '**/*.test.ts', '**/*.test.js', 'src/global.d.ts'] },
];