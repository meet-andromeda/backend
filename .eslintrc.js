module.exports = {
  env: {
    es2021: true,
    node: true,
    mocha: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'no-only-tests'],
  rules: {
    'import/extensions': ['warn', 'never', { json: 'always' }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'src/**/*.test.ts',
          'src/**/*.test.utils.ts',
          'src/**/*-factory.ts',
          'src/commons/tests/**/*.ts'
        ],
        packageDir: './',
      },
    ],
    'import/order': [
      'error',
      { groups: [['builtin', 'external']], 'newlines-between': 'never' },
    ],
    'import/prefer-default-export': 'off',
    'max-len': [
      'error',
      { code: 100, ignoreStrings: true, ignoreComments: true },
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ],
    '@typescript-eslint/no-shadow': ['error'],
    'no-only-tests/no-only-tests': 'error',
    'no-loss-of-precision': 'off',
    '@typescript-eslint/no-loss-of-precision': 'error',
    'space-before-blocks': 'error',
    '@typescript-eslint/space-before-blocks': 'error',
    'no-console': 'warn',
  },
  overrides: [
    {
      files: ['**/handlers/**/index.test.ts'],
      rules: {
        'global-require': 'off',
      },
    },
    {
      files: ['*.test.ts', '*.test.utils.ts'],
      rules: {
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: ['**/serverless.ts'],
      rules: {
        'import/no-import-module-exports': 'off',
        'no-template-curly-in-string': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
};
