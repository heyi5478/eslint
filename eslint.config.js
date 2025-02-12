// import js from '@eslint/js';
import globals from 'globals';
import path from 'path';
import { fileURLToPath } from 'url';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
// import importResolverAlias from 'eslint-import-resolver-alias';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { FlatCompat } from '@eslint/eslintrc';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  eslintPluginPrettierRecommended,
  // mimic ESLintRC-style extends
  ...compat.extends('airbnb'),

  { ignores: ['dist', 'build', 'node_modules', 'public'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        alias: {
          map: [['@', path.resolve(__dirname, 'src')]],
          extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },
      },
      react: { version: '18.3' },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // 設定 prettier 規則，錯誤級別為 "error"
      'prettier/prettier': [
        'error',
        {
          semi: true,
          trailingComma: 'all',
          singleQuote: true,
          printWidth: 90,
          tabWidth: 2,
        },
      ],
      // ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'import/no-extraneous-dependencies': 'off',
      'import/no-import-module-exports': 'off',
      'import/prefer-default-export': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'no-console': 'off',
      'no-restricted-exports': 'off',
      'no-use-before-define': 'off',
      'no-underscore-dangle': 'off',
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': 'warn',
    },
  },
];
