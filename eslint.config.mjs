import neostandard, { resolveIgnoresFromGitignore } from 'neostandard'

export default [
  ...neostandard({
    ts: true,
    ignores: resolveIgnoresFromGitignore(),
  }),
  {
    rules: {
      '@stylistic/operator-linebreak': ['error', 'before']
    }
  }
]
