# UI Quality Lab

UI Quality Lab is a production-style frontend quality automation lab built with React, TypeScript, Vite, Storybook, Playwright, axe, and Lighthouse CI.

It demonstrates how a team can model component states once, then reuse that catalog for Storybook documentation, visual regression testing, accessibility scanning, smoke checks, and E2E flows.

## Why this project exists

Most UI regressions are discovered late because teams manually spot-check screens across devices and themes. This project shows a maintainable automation approach that:

- Documents components in isolation.
- Keeps a typed inventory of meaningful UI states.
- Validates behavior and layout before merge.
- Produces CI artifacts (reports, traces, screenshots, Lighthouse output) for fast triage.

## Tech stack

Core:

- React 19
- TypeScript (strict)
- Vite
- CSS Modules + CSS custom properties

Component lab:

- Storybook (React + Vite)

Quality automation:

- Playwright Test
- Playwright visual snapshots
- @axe-core/playwright
- Lighthouse CI

CI:

- GitHub Actions
- `actions/checkout`
- `actions/setup-node`
- `actions/upload-artifact`
- pnpm cache via `setup-node`

Code quality:

- ESLint (flat config)
- Prettier

## Architecture

### 1) Component layer

Reusable components live in `src/components/*`, each with:

- Typed props interface
- CSS Module
- Storybook stories with multiple realistic states

Implemented components:

- Button
- Card
- Modal
- FormField
- Alert
- Tabs
- DataTable
- ProductTile

### 2) State catalog layer

`src/lab/state-catalog.ts` is the central source of truth for quality coverage.

It defines typed state metadata:

- `ThemeName`: `"light" | "dark"`
- `ViewportName`: `"mobile" | "tablet" | "desktop"`
- `CoverageTag`: `"visual" | "a11y" | "smoke" | "e2e" | "form" | "async"`
- `UiStateSpec<TArgs>` with IDs, args, viewport, theme, and tags

Exports:

- `allUiStates`
- `visualStates`
- `a11yStates`
- `smokeStates`

The catalog currently includes 50+ meaningful states across the 8 components.

### 3) App shell layer

`src/app/showcase-shell.tsx` provides:

- Dashboard route for manual exploratory testing
- Query-driven state route (`/?state=...`) for deterministic Playwright visual/a11y coverage
- Release readiness panel and interactive demo surfaces

### 4) Test layer

`tests/` includes:

- `e2e/` realistic user flows
- `smoke/` fast critical checks
- `visual/` snapshot regression tests driven by state catalog
- `a11y/` axe scans + semantic assertions
- `perf/` Lighthouse CI assertions
- `fixtures/` shared Playwright helpers

## Folder structure

```text
ui-quality-lab/
├── .github/
│   └── workflows/
│       ├── ui-quality.yml
│       └── ui-quality-nightly.yml
├── .storybook/
│   ├── main.ts
│   └── preview.ts
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── App.module.css
│   │   ├── routes.tsx
│   │   └── showcase-shell.tsx
│   ├── components/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Modal/
│   │   ├── FormField/
│   │   ├── Alert/
│   │   ├── Tabs/
│   │   ├── DataTable/
│   │   └── ProductTile/
│   ├── lab/
│   │   ├── state-catalog.ts
│   │   ├── themes.ts
│   │   ├── viewports.ts
│   │   └── test-ids.ts
│   ├── tokens/
│   │   ├── colors.css
│   │   ├── spacing.css
│   │   ├── radius.css
│   │   └── typography.css
│   ├── styles/
│   │   ├── reset.css
│   │   └── globals.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── tests/
│   ├── e2e/
│   │   └── showcase-flow.spec.ts
│   ├── smoke/
│   │   └── critical-components.spec.ts
│   ├── visual/
│   │   ├── ui-states.visual.spec.ts
│   │   └── snapshot.css
│   ├── a11y/
│   │   └── accessibility.spec.ts
│   ├── perf/
│   │   └── lighthouserc.cjs
│   └── fixtures/
│       └── ui-fixture.ts
├── playwright.config.ts
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── eslint.config.js
├── package.json
├── README.md
└── .gitignore
```

## Local setup

```bash
pnpm install
pnpm dev
```

If `pnpm` is unavailable, use npm equivalents (`npm install`, `npm run <script>`).

## Storybook

```bash
pnpm storybook
pnpm build:storybook
```

Storybook includes theme toolbar support (light/dark), responsive viewport controls, and a11y addon integration.

## Running tests

```bash
pnpm test
pnpm test:e2e
pnpm test:smoke
pnpm test:visual
pnpm test:a11y
```

## Visual snapshot workflow

First baseline generation (manual one-time step per environment):

```bash
pnpm test:visual:update
```

Regular CI/local validation afterward:

```bash
pnpm test:visual
```

Snapshots are intentionally not auto-updated in CI.

Note: Playwright snapshot filenames are platform-specific. The nightly visual workflow runs on macOS so the committed baseline snapshots (`-darwin`) match CI.

## Accessibility checks

`tests/a11y/accessibility.spec.ts` uses `@axe-core/playwright` and fails on serious/critical violations, plus semantic assertions for:

- accessible button names
- labelled form fields
- modal dialog role/name
- tablist/tab/tabpanel roles

## Lighthouse CI performance checks

Config: `tests/perf/lighthouserc.cjs`

Thresholds:

- Performance >= 0.80
- Accessibility >= 0.90
- Best Practices >= 0.90
- SEO >= 0.80

Run with:

```bash
pnpm test:perf
# or
pnpm lhci
```

Reports are written to `.lighthouseci/`.

## GitHub Actions CI

### `.github/workflows/ui-quality.yml`

On pull requests and pushes to `main`, runs:

1. `validate`
   - install
   - lint
   - typecheck
   - app build
   - Storybook build
2. `playwright`
   - chromium e2e/smoke
   - upload Playwright artifacts
3. `a11y`
   - axe + semantic tests
   - upload test artifacts
4. `performance`
   - app build + Lighthouse CI
   - upload Lighthouse artifacts

### `.github/workflows/ui-quality-nightly.yml`

Scheduled + manual workflow with broader coverage:

- Chromium e2e/smoke
- Firefox smoke
- WebKit smoke
- Visual regression suite
- Accessibility suite
- Lighthouse CI

## Reports and artifacts

Generated outputs include:

- Playwright HTML/blob/JUnit data
- failure screenshots/videos/traces
- Lighthouse HTML/JSON reports

These are uploaded as workflow artifacts for triage.

## How this reduces manual QA

A practical way to estimate impact in a controlled project setting:

1. Define a repeatable manual checklist (e.g., 45 UI states across 3 viewports).
2. Measure baseline manual execution time and missed defects over several runs.
3. Run the same checklist through automated tests.
4. Compare:
   - checklist execution time
   - escaped visual/layout defects
   - flaky defect discovery frequency

This supports resume metrics such as manual QA time reduction and improved pre-merge detection when measured in a controlled benchmark. It does not claim company-wide production impact unless validated in that real environment.

## Recommended daily commands

```bash
pnpm install
pnpm dev
pnpm storybook
pnpm test
pnpm test:visual
pnpm test:a11y
pnpm test:perf
```
