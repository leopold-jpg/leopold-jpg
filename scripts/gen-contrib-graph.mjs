#!/usr/bin/env node
/* Generate a self-hosted contribution heatmap SVG from the GitHub GraphQL API.
   Real data, terminal-skin greens, no third-party service. Meant to run in CI
   (daily) with GITHUB_TOKEN, writing to the output branch alongside the snake.

   Usage: GH_TOKEN=xxx node scripts/gen-contrib-graph.mjs [user] [outPath] */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const USER = process.argv[2] || 'leopold-jpg';
const OUT = process.argv[3] || 'assets/contrib.svg';
const TOKEN = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
if (!TOKEN) { console.error('No GH_TOKEN/GITHUB_TOKEN in env'); process.exit(1); }

const query = `query($u:String!){user(login:$u){contributionsCollection{contributionCalendar{totalContributions weeks{contributionDays{contributionCount date weekday}}}}}}`;

const res = await fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: { Authorization: `bearer ${TOKEN}`, 'Content-Type': 'application/json', 'User-Agent': 'leopold-contrib' },
  body: JSON.stringify({ query, variables: { u: USER } }),
});
const json = await res.json();
if (json.errors) { console.error(JSON.stringify(json.errors)); process.exit(1); }
const cal = json.data.user.contributionsCollection.contributionCalendar;
const weeks = cal.weeks;

// terminal-skin green ramp: empty -> brightest
const RAMP = ['#161B22', '#0E4429', '#00803F', '#1FBE6B', '#00FF94'];
const level = (n) => n === 0 ? 0 : n <= 2 ? 1 : n <= 5 ? 2 : n <= 9 ? 3 : 4;

const CELL = 13, GAP = 3, STEP = CELL + GAP;
const LEFT = 30, TOP = 60;
const W = 840, H = TOP + 7 * STEP + 30;
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

let cells = '', monthLabels = '', lastMonth = -1;
weeks.forEach((wk, wi) => {
  const x = LEFT + wi * STEP;
  // month label when the month of the first day changes
  const first = wk.contributionDays[0];
  if (first) {
    const m = new Date(first.date + 'T00:00:00Z').getUTCMonth();
    if (m !== lastMonth && wi < weeks.length - 1) {
      monthLabels += `<text x="${x}" y="${TOP - 8}" font-family="'JetBrains Mono',monospace" font-size="10" fill="#6E7681">${MONTHS[m]}</text>`;
      lastMonth = m;
    }
  }
  wk.contributionDays.forEach((d) => {
    const y = TOP + d.weekday * STEP;
    const lv = level(d.contributionCount);
    cells += `<rect x="${x}" y="${y}" width="${CELL}" height="${CELL}" rx="3" fill="${RAMP[lv]}"${lv >= 3 ? ` opacity="0.96"` : ''}/>`;
  });
});

const DAYS = [['Mon', 1], ['Wed', 3], ['Fri', 5]];
const dayLabels = DAYS.map(([t, r]) =>
  `<text x="6" y="${TOP + r * STEP + 10}" font-family="'JetBrains Mono',monospace" font-size="9" fill="#6E7681">${t}</text>`).join('');

// legend
const legendX = W - 200, legendY = H - 18;
const legend = `<text x="${legendX - 36}" y="${legendY + 10}" font-family="'JetBrains Mono',monospace" font-size="10" fill="#6E7681">less</text>` +
  RAMP.map((c, i) => `<rect x="${legendX + i * 18}" y="${legendY}" width="13" height="13" rx="3" fill="${c}" stroke="#21262D" stroke-width="0.5"/>`).join('') +
  `<text x="${legendX + RAMP.length * 18 + 4}" y="${legendY + 10}" font-family="'JetBrains Mono',monospace" font-size="10" fill="#6E7681">more</text>`;

const gridW = weeks.length * STEP;

// serpentine path through every cell centre — the snake glides over the grid
const pts = [];
for (let day = 0; day < 7; day++) {
  const order = day % 2 === 0 ? [...weeks.keys()] : [...weeks.keys()].reverse();
  for (const wi of order) pts.push(`${(LEFT + wi * STEP + CELL / 2).toFixed(0)} ${(TOP + day * STEP + CELL / 2).toFixed(0)}`);
}
const pathD = 'M ' + pts.join(' L ');
const DUR = 18, SEG = 8;
let snake = `<g filter="url(#snakeglow)">`;
for (let i = 0; i < SEG; i++) {
  const r = (6 - i * 0.55).toFixed(1);
  const op = (1 - i * 0.1).toFixed(2);
  const col = i === 0 ? '#00FF94' : '#1FBE6B';
  snake += `<circle r="${r}" fill="${col}" opacity="${op}"><animateMotion path="${pathD}" dur="${DUR}s" begin="-${(i * 0.20).toFixed(2)}s" repeatCount="indefinite"/></circle>`;
}
snake += `</g>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none" role="img" aria-label="${cal.totalContributions} contributions in the last year">
  <defs>
    <filter id="snakeglow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#0D1117" stroke="#21262D" stroke-width="1.5"/>
  <rect x="1" y="1" width="${W - 2}" height="40" rx="14" fill="#161B22"/><rect x="1" y="26" width="${W - 2}" height="15" fill="#161B22"/>
  <line x1="1" y1="41" x2="${W - 1}" y2="41" stroke="#21262D"/>
  <circle cx="22" cy="21" r="5" fill="#30363D"/><circle cx="40" cy="21" r="5" fill="#30363D"/><circle cx="58" cy="21" r="5" fill="#30363D"/>
  <text x="78" y="25" font-family="'JetBrains Mono',monospace" font-size="12.5" fill="#8B949E">contribution graph · last 12 months</text>
  <text x="${W - 18}" y="25" text-anchor="end" font-family="'JetBrains Mono',monospace" font-size="12.5" fill="#00FF94">${cal.totalContributions} contributions</text>
  ${monthLabels}
  ${dayLabels}
  ${cells}
  ${snake}
  ${legend}
</svg>
`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, svg);
console.log(`wrote ${OUT} — ${cal.totalContributions} contributions, ${weeks.length} weeks`);
