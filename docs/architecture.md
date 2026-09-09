# Architecture

The platform is organized as a pnpm monorepo with apps and shared packages.
Core services: API, dashboard, generation worker, and build worker.
Shared packages define domain contracts, auth, queue, storage, and database access.
