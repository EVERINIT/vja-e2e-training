# VJA E2E Training Store

An educational **Mini Online Store QA App**. You (the student) write Playwright end-to-end
tests against it. The app ships a working UI with stable `data-testid`s and granular
per-test seed scripts so each test starts from a known database state.

## What it does

Register, log in, browse a product catalog (categories, price range, search), manage a cart
and favorites, and check out. See `CONTRACT.md` for the full spec (routes, testids, API
shapes, schema, seeds).

## Prerequisites

- Node.js 20+ (built and verified on Node 24).
- npm.

## Setup

```bash
npm install                    # install dependencies
npx playwright install chromium # one-time: download the test browser
npm run db:reset               # create ./data/app.db, tables, and the base catalog
npm run dev                    # start the app on http://localhost:3000
```

## Running e2e tests

```bash
npm run e2e       # run Playwright tests (headless) — auto-starts the app on port 3100
npm run e2e:ui    # Playwright UI mode
```

The Playwright config starts the app on port 3100 for tests (reuses a running one if present).
Each spec resets its data through a granular seed before it runs — see `SEED-MAP.md`.

## How seeds work

Each test starts from a known DB state produced by a **seed**. Seeds live in
`backend/seeds/scripts/` (one concern each) and are registered in
`backend/seeds/registry.ts`. Run one from the CLI:

```bash
npm run db:seed              # runs the "base" seed
tsx backend/seeds/run.ts base
```

In tests, a fixture posts to `POST /api/test/seed` (dev/test only) to run a named seed before
each spec. The base catalog (4 categories, 24 products) is the source of truth in
`backend/seeds/catalog.ts` and is guaranteed by `ensureCatalog()`. See `SEED-MAP.md` for the
test-to-seed mapping.

## Deviations from vja-fed conventions

This app is standalone (no monorepo, no workspace deps), so it deliberately deviates from the
vja-fed reference stack. Documented deviations:

- **Local UI kit** in `src/components/ui/` instead of `@vja-start/ui` (can't exist standalone).
- **Route handlers + server components** instead of TanStack Query / TanStack Form.
- **SQLite + Drizzle ORM** (`better-sqlite3`, single file `./data/app.db`) instead of Prisma.
- Password hashing via Node `crypto.scrypt`; session via a signed httpOnly cookie.

Otherwise it keeps vja-fed spirit: kebab-case files, singular feature-prefixed naming,
function-declaration components, named exports, and a local UI kit so feature code avoids raw
HTML.
