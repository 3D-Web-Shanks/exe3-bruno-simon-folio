import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import prettier from 'eslint-plugin-prettier'

export default [
  {
    ignores: [
      'logs',
      '*.log',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      'pnpm-debug.log*',
      'lerna-debug.log*',
      'node_modules',
      'dist',
      'dist-ssr',
      '*.local',
      '.vscode/*',
      '!.vscode/extensions.json',
      '.idea',
      '.DS_Store',
      '*.suo',
      '*.ntvs*',
      '*.njsproj',
      '*.sln',
      '*.sw?',
      'src/folio',
      '.eslintrc',
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
      globals: {
        browser: true,
      },
    },
    plugins: {
      react,
      prettier,
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...tseslint.configs.recommended.rules,
      ...prettier.configs.recommended.rules, // 加上这一行
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    env: {
      browser: true,
    },
  },
]
