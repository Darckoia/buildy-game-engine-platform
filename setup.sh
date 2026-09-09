#!/usr/bin/env bash
set -euo pipefail
corepack enable
pnpm install
cp -n .env.example .env || true
docker compose up -d postgres redis minio
echo "Setup complete. Run: pnpm dev"
