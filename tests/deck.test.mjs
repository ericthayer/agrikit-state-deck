import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const css = readFileSync(new URL('../src/deck/deck.css', import.meta.url), 'utf8');
const html = readFileSync(new URL('../deck/index.html', import.meta.url), 'utf8');

test('presenter deck has no unfilled edit markers', () => {
  assert.doesNotMatch(html, /\[EDIT\]/);
});

test('fullscreen toolbar shows section, clock, slide count, navigation and top progress', () => {
  assert.match(css, /:fullscreen\s+\.deck-bar__hint\s*,\s*:fullscreen\s+\.deck-bar\s+\[data-deck-notes\]\s*\{\s*display:\s*none\s*;\s*\}/);
  assert.match(css, /:fullscreen\s+\.deck-progress\s*\{\s*inset:\s*0\s+0\s+auto\s*;\s*\}/);
  assert.match(css, /:fullscreen\s+\.deck-bar\s*\{\s*inset:\s*auto\s+0\s+0\s*;/);
  assert.match(html, /class="deck-bar__section"/);
  assert.match(html, /class="deck-bar__clock"/);
  assert.match(html, /class="deck-bar__count"/);
  assert.match(html, /data-deck-prev/);
  assert.match(html, /data-deck-next/);
});

test('slide 2 agenda items have expanded spacing', () => {
  const agenda = /\.deck-agenda\s*\{([^}]+)\}/.exec(css)?.[1] ?? '';
  assert.match(agenda, /gap:\s*clamp\(1\.75rem,\s*3vw,\s*4rem\)\s*;/);
});
