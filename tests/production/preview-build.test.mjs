import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { test } from 'node:test';
import { DIST, filesUnder, htmlUrls, localFile, tags } from '../lib/site-files.mjs';

const read = file => readFileSync(file, 'utf8');

test('deck preview publishes only the root redirect and deck page', () => {
  const files = filesUnder(DIST).map(file => relative(DIST, file).split(sep).join('/'));
  const htmlPages = files.filter(file => file.endsWith('.html')).sort();

  assert.deepEqual(htmlPages, ['deck/index.html', 'index.html']);
  assert.ok(files.some(file => file.startsWith('assets/')), 'Deck assets must be emitted');
  assert.ok(!files.some(file => /^(?:concepts|brandkit)\//.test(file)), 'Other page families must not be published');

  const root = read(join(DIST, 'index.html'));
  const refresh = tags(root).find(tag => tag.name === 'meta' && tag.attrs['http-equiv']?.toLowerCase() === 'refresh');
  assert.equal(refresh?.attrs.content, '0; url=/deck/');
  assert.match(root, /<a\b[^>]*href="\/deck\/"[^>]*>[^<]*\S[^<]*<\/a>/i);
});

test('deck preview local assets resolve from the published output', () => {
  const owner = join(DIST, 'deck/index.html');
  const html = read(owner);
  const resources = htmlUrls(html);

  assert.ok(resources.length > 0, 'Deck must reference emitted local media');
  for (const url of resources) localFile(url, owner, DIST);
});
