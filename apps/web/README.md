# JS Questions Lab Web App

This package contains the Next.js app for JS Questions Lab.

For repository-wide setup, commands, and contribution guidance, start at the root:

- `README.md`
- `CONTRIBUTING.md`
- `docs/content-pipeline.md`

## Run The App

From the repository root:

```bash
bun install
bun run dev
```

## Build

From the repository root:

```bash
bun run build
bun run start
```

## Data Source

The app reads generated content from the repository root:

- `content/generated/questions.v1.json`
- `content/generated/manifest.v1.json`

Refresh content from the repository root when needed:

```bash
bun run parse:questions
# or
bun run content:refresh
```
