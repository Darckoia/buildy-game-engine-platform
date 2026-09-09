# buildy-game-engine-platform

Production-ready Phase 1 bootstrap for a SaaS game generation engine targeting Android, iOS, and Web.

## Tech Stack

- Node.js 18+
- TypeScript (strict)
- Vite + esbuild
- Jest
- ESLint + Prettier
- GitHub Actions CI

## Project Structure

```text
buildy-game-engine-platform/
├── src/
│   ├── core/
│   ├── generators/
│   ├── platforms/
│   ├── services/
│   ├── api/
│   ├── utils/
│   └── types/
├── tests/
├── docs/
├── scripts/
├── config/
└── .github/workflows/
```

## Quick Start

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

## Available Scripts

- `npm run dev` - run Vite in dev mode
- `npm run build` - typecheck + build library output
- `npm run typecheck` - TypeScript checks only
- `npm run lint` - ESLint checks
- `npm test` - Jest tests with coverage

## Documentation

- [Architecture](docs/architecture.md)
- [Setup](docs/setup.md)
- [Contributing](docs/contributing.md)
- [Security](docs/security.md)
