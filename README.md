# JS Mastery Atlas

JS Mastery Atlas is an interactive JavaScript interview practice app built from Lydia Hallie's
`javascript-questions` dataset. It turns the original question bank into a focused practice product
with runnable code, explanation-first learning, event-loop visualization, and progress tracking.

## What It Offers

- Fast question browsing and focused detail pages
- Quiz and practice flows built around explanation, retry, and review
- Client-side worker sandbox for runnable JavaScript snippets
- Event-loop visualization for async questions
- Local-first progress tracking, with optional auth and sync layers

## Repo Shape

- `apps/web`: Next.js 16 app for the product experience
- `content/source`: canonical upstream source snapshot from Lydia Hallie's repo
- `content/generated`: parsed JSON consumed by the app
- `scripts`: sync and parsing scripts for the content pipeline
- `docs`: handoff notes, roadmap documents, and implementation references

## Getting Started

### Prerequisites

- Bun `1.3.9`
- Node.js `18+`

### Local Setup

```bash
bun install
```

Guest mode is the default experience. If you want to test auth or sync features, copy
`.env.example` to `.env.local` and fill in the Clerk and Supabase values.

### Run The App

```bash
bun run dev
```

Open `http://localhost:3000`.

## Core Commands

```bash
bun run dev
bun run build
bun run start
bun run lint
bun run typecheck
bun run parse:questions
bun run sync:upstream
bun run content:refresh
```

## Documentation Map

- `CONTRIBUTING.md`: contributor workflow, validation, and PR expectations
- `docs/content-pipeline.md`: source-of-truth, sync, parsing, and generated artifact rules
- `docs/agent-handoff.md`: current repo state and guardrails for future engineering work
- `docs/rebuild-roadmap.md`: completed V1 rebuild milestones and operating constraints
- `docs/v2-roadmap-mastery.md`: next major product direction

## Current Focus

- Active recall practice modes that move beyond passive multiple choice
- Stronger review loops and spaced repetition for retention
- Curated paths and better recommendation flows
- Deeper visual explanations for runtime-heavy concepts

## Future Improvements

- Richer explanation context and related-reference linking
- Offline or PWA-friendly workflows
- Multi-source content ingestion beyond the Lydia dataset

## Source Content And Attribution

The canonical source snapshot lives in `content/source/README.upstream.md`, synced from
[Lydia Hallie's `javascript-questions`](https://github.com/lydiahallie/javascript-questions).
Generated app data lives in `content/generated/` and is derived from that upstream snapshot.

Do not edit generated files directly. If the source material itself needs correction, prefer the
upstream repository or a documented local overlay approach rather than hand-editing the synced
snapshot.

## Contributing

Contributions are welcome across the app, documentation, tooling, and product polish. Start with
`CONTRIBUTING.md` for setup, workflow, validation, and PR expectations.
