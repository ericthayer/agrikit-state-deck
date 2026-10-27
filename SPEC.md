# Spec: Deck-Only Preview Release

## Objective

Publish a preview site that opens directly to the Agrikit presentation and contains only the deck and its required assets. Preserve the existing source pages and project files in the repository. Rewrite deck slides 14 and 15 as useful audience-facing tutorials rather than presenter run-of-show instructions.

## Capabilities

| Module | Responsibility |
|---|---|
| `deck-only-preview` | Build and deploy only the root redirect and deck page with referenced assets |
| `demo-tutorials` | Teach a consumer-app workflow and a product-app workflow on slides 14–15 |

## Tech Stack

Vite 8 multi-page build, TypeScript, authored HTML/CSS, Node.js test runner, Netlify static hosting.

## Commands

- Development: `npm run dev`
- Tests: `npm test`
- Full source build: `npm run build`
- Deck preview build: `npm run build:preview`
- Preview output check: `npm run test:preview`

## Project Structure

- `vite.config.ts`: Vite page inputs and build behavior
- `netlify.toml`: deployment build command and published directory
- `index.html`, `deck/index.html`, `deck/media/`: root route, deck, and its assets
- `tests/`: Node.js unit, build, and production assertions
- `src/deck/`: presentation behavior and styles

## Code Style

Keep the existing authored-HTML, CSS, Vite, and `node:test` patterns. Keep slides self-contained and use existing local deck assets. Example:

```html
<li>
  <h3>Connect the project</h3>
  <p>Configure the Agrikit MCP server so the assistant can look up real components.</p>
</li>
```

## Testing Strategy

- Add assertions that the preview output includes the deck and root route but omits non-deck HTML pages.
- Add content assertions that slides 14–15 teach the workflows and contain no presenter-only cues.
- Run focused tests, `npm test`, `npm run build:preview`, and `npm run test:preview`.
- Preserve the full source build for local development and existing project workflows.

## Boundaries

- Always: preserve repository source files; deploy only the explicitly selected preview output; use existing deck assets and documented behavior.
- Ask first: deleting source pages/files, changing unrelated hosting settings, or adding dependencies.
- Never: publish presenter-only fallback instructions as slide content, invent product capabilities, or deploy unrelated template pages.

## Success Criteria

1. Netlify builds a preview whose root opens `/deck/`.
2. The published output contains the deck and required assets, not concepts, brand-kit, or other template pages.
3. Slides 14 and 15 explain workflows for a viewer to learn from without presenter-directed demo cues.
4. The preview-specific output check and regular project tests pass.

## Open Questions

None. The user confirmed deck-only deployment while retaining source files.
