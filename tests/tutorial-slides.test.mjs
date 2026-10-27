import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const html = readFileSync(new URL('../deck/index.html', import.meta.url), 'utf8');

function slide(number) {
  const marker = `<!-- ============================================================ ${number} ·`;
  const start = html.indexOf(marker);
  assert.notEqual(start, -1, `Slide ${number} must exist`);
  const next = html.indexOf('<!-- ============================================================', start + marker.length);
  return html.slice(start, next === -1 ? html.length : next);
}

for (const [number, required] of [
  [14, ['Tutorial:', 'Customer Portal', 'Agrikit MCP', 'review gate', 'CbPage']],
  [15, ['Tutorial:', 'AGENTS.md', 'get_component', 'validate_accessibility', 'Agrikit issue']],
]) {
  test(`slide ${number} teaches an audience workflow`, () => {
    const content = slide(number);
    for (const phrase of required) assert.ok(content.includes(phrase), `Slide ${number} must include "${phrase}"`);
    assert.doesNotMatch(content, /Demo \d of 2|switch windows|Fallback screenshot|Before the talk|Rehearsed prompt|press →|class="tpl-slot"/i);
    assert.doesNotMatch(content, /class="deck-notes"/);
  });
}
