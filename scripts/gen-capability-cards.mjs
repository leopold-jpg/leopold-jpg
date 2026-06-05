#!/usr/bin/env node
/* Generate animated capability panels into assets/cards/ — Gesso terminal skin.
   Each: dark panel, hairline, green top-accent, a monoline icon, title + items,
   a subtle pulsing corner indicator + scanline. Run: node scripts/gen-capability-cards.mjs */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'assets', 'cards');
mkdirSync(OUT, { recursive: true });

const T = {
  panel: '#161B22', border: '#21262D', fg: '#E6EDF3',
  muted: '#8B949E', accent: '#00FF94', mono: "'JetBrains Mono','SF Mono',ui-monospace,monospace",
};

// monoline icons, drawn in a 0..28 box, green stroke
const ICON = {
  build: `<path d="M3 9 L8 14 L3 19 M13 19 H25" fill="none" stroke="${T.accent}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`,
  ai: `<g fill="none" stroke="${T.accent}" stroke-width="2"><circle cx="6" cy="14" r="3"/><circle cx="22" cy="6" r="3"/><circle cx="22" cy="22" r="3"/><path d="M9 13 L19 7 M9 15 L19 21"/></g>`,
  infra: `<g fill="none" stroke="${T.accent}" stroke-width="2"><rect x="4" y="5" width="20" height="6" rx="1.5"/><rect x="4" y="15" width="20" height="6" rx="1.5"/><circle cx="8" cy="8" r="1" fill="${T.accent}"/><circle cx="8" cy="18" r="1" fill="${T.accent}"/></g>`,
  ship: `<path d="M14 3 C19 8 19 15 14 25 C9 15 9 8 14 3 Z M14 11 a2 2 0 1 0 0.01 0" fill="none" stroke="${T.accent}" stroke-width="2" stroke-linejoin="round"/>`,
};

const CARDS = {
  build: { title: 'BUILD', items: ['Full-stack · React · Next', 'Node · Bun · Python · Go', 'REST · GraphQL · tRPC · WS', 'Postgres · Supabase · Redis'] },
  ai:    { title: 'AI / AGENTS', items: ['Multi-agent orchestration', 'MCP server development', 'Tool-calling architectures', 'RAG · embeddings · voice'] },
  infra: { title: 'INFRA / OPS', items: ['Docker · self-hosted deploy', 'Linux · systemd · Caddy', 'CI/CD · GitHub Actions', 'Sandboxing · secrets · VPN'] },
  ship:  { title: 'SHIP', items: ['0→1 product development', 'Technical specs · scoping', 'Vendor eval · due diligence', 'Bias to autonomous systems'] },
};

const W = 420, H = 168;

const svg = (key, { title, items }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="acc" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${T.accent}" stop-opacity="0.9"/>
      <stop offset="1" stop-color="${T.accent}" stop-opacity="0"/>
    </linearGradient>
    <filter id="ig" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <clipPath id="clip"><rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14"/></clipPath>
  </defs>
  <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="${T.panel}" stroke="${T.border}" stroke-width="1.5"/>
  <rect x="1" y="1" width="${W - 2}" height="3" fill="url(#acc)"/>
  <!-- scanline -->
  <g clip-path="url(#clip)">
    <rect x="0" y="0" width="${W}" height="34" fill="${T.accent}" opacity="0.05">
      <animate attributeName="y" values="-34;${H}" dur="5s" repeatCount="indefinite"/>
    </rect>
  </g>
  <!-- icon -->
  <g transform="translate(22,22)" filter="url(#ig)">${ICON[key]}</g>
  <text x="60" y="40" font-family="${T.mono}" font-size="16" font-weight="700" letter-spacing="1.5" fill="${T.fg}">${title}</text>
  <!-- pulsing online dot -->
  <circle cx="${W - 22}" cy="30" r="3.5" fill="${T.accent}"><animate attributeName="opacity" values="1;0.3;1" dur="2.2s" repeatCount="indefinite"/></circle>
  ${items.map((it, i) => `<text x="24" y="${74 + i * 22}" font-family="${T.mono}" font-size="13" fill="${T.muted}"><tspan fill="${T.accent}">▸ </tspan>${it}</text>`).join('\n  ')}
</svg>
`;

for (const [k, c] of Object.entries(CARDS)) {
  writeFileSync(join(OUT, `${k}.svg`), svg(k, c));
  console.log(`  wrote assets/cards/${k}.svg`);
}
console.log('done.');
