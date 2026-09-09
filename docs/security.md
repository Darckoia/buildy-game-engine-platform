# Security Baseline

- Secrets must be provided through environment variables and GitHub repository/environment secrets.
- `.env` files are ignored by Git; use `.env.example` as the safe template.
- Require branch protection on the default branch with mandatory passing CI checks (`lint`, `typecheck`, `test`, `build`).
- Require pull request reviews before merge.
