// Generates the deck's Swiss-style artwork as flat SVG (decorative, alt="").
// Palette: CoBank blue #005288, green #4caf50, plus navy, light blue and paper.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUT = join(import.meta.dirname, '..', 'deck', 'media', 'art');
const C = { B: '#005288', G: '#4caf50', N: '#0b2a44', L: '#7fb8e0', W: '#ffffff', P: '#f5f4f2', S: '#dad9d6' };

const r = n => Math.round(n * 100) / 100;
const pt = (cx, cy, rad, deg) => [r(cx + rad * Math.cos((deg * Math.PI) / 180)), r(cy + rad * Math.sin((deg * Math.PI) / 180))];
const sector = (cx, cy, rad, a0, fill) => {
  const [x0, y0] = pt(cx, cy, rad, a0);
  const [x1, y1] = pt(cx, cy, rad, a0 + 90);
  return `<path d="M${cx} ${cy}L${x0} ${y0}A${rad} ${rad} 0 0 1 ${x1} ${y1}Z" fill="${fill}"/>`;
};
const half = (cx, cy, rad, a0, fill) => {
  const [x0, y0] = pt(cx, cy, rad, a0);
  const [x1, y1] = pt(cx, cy, rad, a0 + 180);
  return `<path d="M${x0} ${y0}A${rad} ${rad} 0 0 1 ${x1} ${y1}Z" fill="${fill}"/>`;
};
const circle = (cx, cy, rad, fill) => `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="${fill}"/>`;
const rect = (x, y, w, h, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"${extra}/>`;

// Tile vocabulary on an s×s cell: quarter circles centred on a corner, half circles on an edge, circle, square.
function tile(col, row, s, kind, where, fill) {
  const x = col * s, y = row * s;
  if (kind === 's') return rect(x, y, s, s, fill);
  if (kind === 'c') return circle(x + s / 2, y + s / 2, s / 2, fill);
  if (kind === 'q') {
    const corner = { tl: [x, y, 0], tr: [x + s, y, 90], br: [x + s, y + s, 180], bl: [x, y + s, 270] }[where];
    return sector(corner[0], corner[1], s, corner[2], fill);
  }
  const edge = { T: [x + s / 2, y + s, 180], B: [x + s / 2, y, 0], L: [x + s, y + s / 2, 90], R: [x, y + s / 2, 270] }[where];
  return half(edge[0], edge[1], s / 2, edge[2], fill);
}

const svg = (w, h, body, bg) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true">${bg ? rect(0, 0, w, h, bg) : ''}${body}</svg>\n`;

// Cover: a tonal grid of squares, light CoBank blue at top-left stepping to near-black navy at
// bottom-right (one step per diagonal), after the Swiss poster grids. CoBank blue #005288 sits mid-ramp.
function cover() {
  const s = 270, cols = 3, rows = 4;
  const ramp = ['#3f8bc9', '#2873b2', '#16629d', '#005288', '#0b3d66', '#0b2a44', '#061726'];
  let body = '';
  for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) body += rect(col * s, row * s, s, s, ramp[col + row]);
  return svg(cols * s, rows * s, body);
}

// Card strips (600×260, paper ground) for slides 16 and 18; they sit flush on the card's bottom edge.
const W = 600, H = 260;
function drift() {
  const bw = 132, bh = 34, gx = 14, gy = 18;
  let b = '';
  for (let row = 0; row < 5; row++) for (let col = 0; col < 4; col++) {
    const x = 18 + col * (bw + gx), y = 18 + row * (bh + gy);
    const id = row * 4 + col;
    if (id === 6) b += rect(x + 30, y + 10, bw, bh, C.B, ` transform="rotate(-9 ${x + bw / 2} ${y + bh / 2})"`);
    else if (id === 13) b += rect(x - 10, y + 18, bw, bh, C.G, ` transform="rotate(14 ${x + bw / 2} ${y + bh / 2})"`);
    else if (id === 15) b += rect(x + 8, y - 6, bw, bh, C.N, ` transform="rotate(-22 ${x + bw / 2} ${y + bh / 2})"`);
    else b += rect(x, y, bw, bh, id % 5 === 2 ? C.L : C.S);
  }
  return svg(W, H, b, C.P);
}
// Prototype-first, "fast, then stuck": chevrons gather speed and hit a wall short of production.
function prototype() {
  let b = '';
  const cy = 130;
  const sizes = [44, 62, 82, 104, 128];
  let x = 10;
  sizes.forEach((h, i) => {
    const w = h * 0.8;
    b += `<path d="M${r(x)} ${r(cy - h)}L${r(x + w)} ${cy}L${r(x)} ${r(cy + h)}L${r(x + w * 0.45)} ${cy}Z" fill="${i < 2 ? C.L : C.B}"/>`;
    x += w * 0.78;
  });
  b += rect(420, 0, 46, H, C.N);
  b += circle(545, cy, 42, C.G);
  return svg(W, H, b, C.P);
}
// Component-first: standard blocks assemble into a product frame (header, navigation, cards, action, table).
function component() {
  let b = '';
  const g = 12;
  b += rect(0, 0, W, 46, C.N);
  b += rect(0, 46 + g, 118, H, C.B);
  const cx = 118 + g, cw = (W - cx - 2 * g) / 3;
  for (let i = 0; i < 3; i++) b += rect(r(cx + i * (cw + g)), 46 + g, r(cw), 92, i === 0 ? C.L : C.W);
  b += rect(r(cx + 14), 46 + g + 58, 64, 20, C.G);
  const ty = 46 + g + 92 + g;
  for (let row = 0; row < 4; row++) b += rect(cx, ty + row * 26, W - cx, 20, row === 0 ? C.L : C.W);
  return svg(W, H, b, C.S);
}
function stripes() {
  let b = '';
  for (let i = 0; i < 9; i++) {
    const h = 6 + i * 2.2, y = 20 + i * 26;
    b += rect(0, r(y), W, r(h), i > 5 ? C.N : C.B);
  }
  b += rect(400, 0, 200, H, C.G) + rect(400, 0, 200, 60, C.W);
  return svg(W, H, b, C.P);
}
function overlap() {
  // Blend modes do not apply inside <img>, so the overlap is drawn: B clipped to A.
  const b = `<defs><clipPath id="a">${circle(230, 150, 150, '#000')}</clipPath></defs>${circle(230, 150, 150, C.L)}${circle(380, 150, 150, C.G)}<g clip-path="url(#a)">${circle(380, 150, 150, C.B)}</g>${circle(305, 150, 40, C.W)}`;
  return svg(W, H, b, C.P);
}
function target() {
  let b = rect(0, 0, W, H, C.N);
  b += circle(300, 260, 230, C.B) + sector(300, 260, 230, 180, C.G) + circle(300, 260, 150, C.N) + circle(300, 260, 92, C.L) + sector(300, 260, 92, 270, C.W) + circle(300, 260, 34, C.N);
  return svg(W, H, b);
}

mkdirSync(OUT, { recursive: true });
const files = { 'cover.svg': cover(), 'card-drift.svg': drift(), 'card-prototype.svg': prototype(), 'card-component.svg': component(),
  'card-install.svg': stripes(), 'card-pilot.svg': overlap(), 'card-loop.svg': target() };
for (const [name, content] of Object.entries(files)) writeFileSync(join(OUT, name), content);
console.log(`wrote ${Object.keys(files).length} files to ${OUT}`);
