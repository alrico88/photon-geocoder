import { defineConfig } from 'vite-plus';

export default defineConfig({
  fmt: { singleQuote: true, printWidth: 100 },
  lint: {
    jsPlugins: [
      { name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' },
      { name: '@stylistic', specifier: '@stylistic/eslint-plugin' },
    ],
    rules: {
      'vite-plus/prefer-vite-plus-imports': 'error',
      curly: ['error', 'all'],
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let'], next: '*' },
        { blankLine: 'any', prev: ['const', 'let'], next: ['const', 'let'] },
        { blankLine: 'always', prev: '*', next: 'multiline-block-like' },
        { blankLine: 'always', prev: 'multiline-block-like', next: '*' },
      ],
    },
    options: { typeAware: true, typeCheck: true },
  },
  pack: {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    publint: true,
    attw: { profile: 'strict' },
  },
});
