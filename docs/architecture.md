# Architecture Overview

## Layers

- **core/**: orchestration and domain logic for game generation.
- **generators/**: reusable generation engines per genre/template.
- **platforms/**: export adapters for Android, iOS, and Web.
- **services/**: SaaS concerns (auth, users, projects, billing hooks).
- **api/**: HTTP/API transport layer.
- **utils/**: shared helpers and utilities.
- **types/**: shared contract types.

## Runtime Flow

1. API receives a project generation request.
2. Core validates request and selects generator strategy.
3. Generator composes game assets and metadata.
4. Platform adapters package outputs for target runtimes.
5. Services persist state and expose build/job status.
