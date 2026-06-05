#!/usr/bin/env node
/* Generate dark "code panel" SVGs into assets/panels/ so code reads cohesively
   dark in both GitHub light/dark themes (the default ``` block goes light).
   Window chrome + mono + restrained syntax colors. Content is tokenized as
   [text, colorKey] segments. Run: node scripts/gen-code-panels.mjs */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'assets', 'panels');
mkdirSync(OUT, { recursive: true });

const C = {
  kw: '#00FF94', str: '#7EE787', com: '#6E7681', prop: '#79C0FF',
  fn: '#D2A8FF', txt: '#E6EDF3', punct: '#8B949E',
};
const MONO = "'JetBrains Mono','SF Mono',ui-monospace,monospace";
const W = 840, PADX = 24, TOP = 52, LH = 23, FS = 14, CW = 8.42;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// line = array of [text, colorKey]; render as <tspan>s with x offsets
const renderLine = (segs, y) => {
  let col = 0, out = '';
  for (const [t, k] of segs) {
    const x = PADX + col * CW;
    if (t.trim() !== '') out += `<text x="${x.toFixed(1)}" y="${y}" font-family="${MONO}" font-size="${FS}" fill="${C[k] || C.txt}" xml:space="preserve">${esc(t)}</text>`;
    col += t.length;
  }
  return out;
};

const panel = (file, lines) => {
  const H = TOP + lines.length * LH + 18;
  const body = lines.map((segs, i) => renderLine(segs, TOP + i * LH)).join('\n  ');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none" role="img" aria-label="${file}">
  <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#0D1117" stroke="#21262D" stroke-width="1.5"/>
  <rect x="1" y="1" width="${W - 2}" height="38" rx="14" fill="#161B22"/>
  <rect x="1" y="24" width="${W - 2}" height="15" fill="#161B22"/>
  <line x1="1" y1="39" x2="${W - 1}" y2="39" stroke="#21262D"/>
  <circle cx="22" cy="20" r="5" fill="#30363D"/><circle cx="40" cy="20" r="5" fill="#30363D"/><circle cx="58" cy="20" r="5" fill="#30363D"/>
  <text x="${W / 2}" y="24" text-anchor="middle" font-family="${MONO}" font-size="12" fill="#6E7681">${file}</text>
  ${body}
</svg>
`;
};

const PANELS = {
  whoami: { file: '~/whoami.ts', lines: [
    [['const ','kw'],['leopold ','txt'],['= ','punct'],['{','punct']],
    [['  builds:   ','prop'],['[','punct'],['"full-stack apps"','str'],[', ','punct'],['"AI agents"','str'],[', ','punct'],['"MCP servers"','str'],[', ','punct'],['"infra"','str'],['],','punct']],
    [['  ships:    ','prop'],['"production systems"','str'],[',','punct']],
    [['  obsesses: ','prop'],['[','punct'],['"multi-agent orchestration"','str'],[', ','punct'],['"self-hosted infra"','str'],[', ','punct'],['"DX"','str'],['],','punct']],
    [['  motto:    ','prop'],['"if a human types it twice, it\'s a bug"','str'],[',','punct']],
    [['}','punct'],[';','punct']],
  ]},
  principles: { file: '/etc/principles', lines: [
    [['/* operating principles — non-negotiable */','com']],
    [['','txt']],
    [['#define ','kw'],['BIAS_TO_AUTONOMY      ','prop'],['"if a human types it twice, it\'s a bug"','str']],
    [['#define ','kw'],['BRIEFS_OVER_TICKETS   ','prop'],['"tasks ship with execution context"','str']],
    [['#define ','kw'],['SELF_HOSTED_DEFAULT   ','prop'],['"i own the metal, the keys, the logs"','str']],
    [['#define ','kw'],['NEVER_TRUST_DEFAULTS  ','prop'],['"audit, sandbox, rotate, repeat"','str']],
    [['','txt']],
    [['while ','kw'],['(problem_unsolved) ','punct'],['{ ','punct'],['ship','fn'],['(); ','punct'],['measure','fn'],['(); ','punct'],['iterate','fn'],['(); }','punct']],
  ]},
  stack: { file: '~/.stack', lines: [
    [['languages   ','kw'],['TypeScript · Python · Go · Rust · Bash · SQL','txt']],
    [['runtime     ','kw'],['Node · Bun · Deno · Vite · Turborepo · pnpm','txt']],
    [['frontend    ','kw'],['Next.js · React · Svelte · Tailwind · Three.js','txt']],
    [['backend     ','kw'],['Express · FastAPI · tRPC · GraphQL · Hono','txt']],
    [['data        ','kw'],['Postgres · Supabase · Redis · Prisma · ClickHouse','txt']],
    [['ai/agents   ','kw'],['Claude · MCP · OpenAI · LangChain · RAG · Whisper','txt']],
    [['infra       ','kw'],['Docker · Vercel · Cloudflare · Caddy · Tailscale','txt']],
    [['systems     ','kw'],['Linux · ARM · SSH · WireGuard · Raspberry Pi','txt']],
  ]},
};

for (const [name, { file, lines }] of Object.entries(PANELS)) {
  writeFileSync(join(OUT, `${name}.svg`), panel(file, lines));
  console.log(`  wrote assets/panels/${name}.svg`);
}
console.log('done.');
