# Tasks: Deck-Only Preview Release

- [x] Task: Publish only deck preview
  - Acceptance: Netlify runs the preview build; output contains the deck/root entry and required assets, not the other presentation pages.
  - Verify: `npm run build:preview && npm run test:preview`
  - Files: `vite.config.ts`, `netlify.toml`, `package.json`, `tests/`
- [x] Task: Teach workflows on demo slides
  - Acceptance: Slides 14–15 are audience-facing tutorials with explanatory steps and no presenter-only cues or empty fallback slots.
  - Verify: focused slide-content test and browser preview if available.
  - Files: `deck/index.html`, `tests/`
