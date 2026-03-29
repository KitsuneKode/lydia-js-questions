# Content Pipeline

This project uses Lydia Hallie's `javascript-questions` repository as the canonical source for the
question corpus, then transforms that source into generated JSON for the app.

## Source Of Truth

- Upstream source snapshot: `content/source/README.upstream.md`
- Parser: `scripts/parse-readme.mjs`
- Sync script: `scripts/sync-upstream.mjs`
- Generated outputs:
  - `content/generated/questions.v1.json`
  - `content/generated/manifest.v1.json`

The app contract is the generated JSON, but the canonical input is the synced upstream README
snapshot.

## How The Flow Works

1. `bun run sync:upstream` fetches the latest upstream Lydia README into
   `content/source/README.upstream.md`
2. `bun run parse:questions` parses that source into generated JSON
3. `bun run content:refresh` runs both steps in sequence
4. The Next.js app reads the generated JSON from `content/generated/`

## What To Edit

- Edit `apps/web` for product and UI behavior
- Edit `scripts/` if the content pipeline itself needs to change
- Edit docs if contributor guidance or pipeline expectations change

## What Not To Edit

- Do not manually edit `content/generated/questions.v1.json`
- Do not manually edit `content/generated/manifest.v1.json`
- Do not treat `content/source/README.upstream.md` as product copy or a normal editable markdown
  file

If the upstream content needs correction, prefer contributing to Lydia Hallie's repository or
introducing a documented overlay strategy instead of editing the synced snapshot in place.

## Attribution

This project is based on [Lydia Hallie's `javascript-questions`](https://github.com/lydiahallie/javascript-questions).
The repo should continue to preserve clear attribution to the original source and avoid presenting
the question corpus as original project-authored content.

## Operational Notes

- The weekly sync workflow refreshes the upstream snapshot and regenerated JSON automatically
- Parser changes should preserve generated shape unless an intentional contract change is being made
- Any content contract change should be validated against the app before merging
