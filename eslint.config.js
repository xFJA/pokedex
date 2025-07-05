import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

export default tseslint.config(
  [
    globalIgnores(['dist', 'node_modules', 'coverage']),
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      extends: [
        js.configs.recommended,
        tseslint.configs.recommended,
        tseslint.configs.stylisticTypeChecked,
        ...compat.extends('plugin:react/recommended'),
        ...compat.extends('plugin:react-hooks/recommended'),
      ],
      languageOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        globals: {
          ...globals.browser,
          ...globals.node,
        },
        parser: tseslint.parser,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
    },
    {
      files: ['**/*.{ts,tsx}'],
      languageOptions: {
        parserOptions: {
          project: './tsconfig.eslint.json',
        },
      },

      plugins: {
        prettier: prettier,
        react: reactPlugin,
      },
      rules: {
        'prettier/prettier': 'error',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-uses-react': 'off',
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
  ],
  {
    ignores: ['eslint.config.js', 'tailwind.config.js', 'vite.config.ts', 'prettier.config.js'],
  },
);
