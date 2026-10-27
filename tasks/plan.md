# Plan: Deck-Only Preview Release

1. Add a preview-specific Vite build mode and configure Netlify to use it; retain the normal all-pages build.
2. Add regression tests for the emitted preview file set and its root route.
3. Rewrite slides 14 and 15 as audience tutorials using existing deck assets and remove presenter-only fallback cues from their visible content.
4. Verify focused tests, full tests, preview build, output contents, and regular source build.
