# buildy-game-engine-platform

Professional monorepo foundation for the Buildy SaaS game engine platform.

## Workspace Layout

- `apps/api` API foundation (Express + middleware + route skeletons)
- `apps/web` React dashboard skeleton
- `apps/admin` admin console skeleton
- `apps/worker-generation` generation queue worker
- `apps/worker-build` build queue worker
- `packages/*` shared domain, contracts, auth, queue, storage, db, and testing modules
- `infrastructure/*` docker and kubernetes stubs
- `docs/*` architecture, API, DB, security, deployment, and development docs

## Quick Start

```bash
bash setup.sh
pnpm dev
```

## Quality Gates

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```
