import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  prettier,
  {
    plugins: {
      prettier: eslintPluginPrettier
    },
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      'prettier/prettier': 'error'
    }
  },
  {
    ignores: ['dist/**', 'node_modules/**', 'playwright.config.ts']
  }
];
