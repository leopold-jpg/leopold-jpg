#!/usr/bin/env node
/* Generate cohesive terminal-style SVG section headers into assets/sections/.
   One green prompt chip on the left + a hairline rule to the right, in the
   Gesso terminal-skin tokens. Run: node scripts/gen-section-headers.mjs */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'assets', 'sections');
mkdirSync(OUT, { recursive: true });

const T = {
  bg: '#161B22', border: '#21262D', rule: '#21262D',
  fg: '#E6EDF3', accent: '#00FF94', muted: '#6E7681',
  mono: "'JetBrains Mono','SF Mono',ui-monospace,monospace",
};

// file -> { cmd, meta }   cmd is the label, meta is the dim comment on the right
const SECTIONS = {
  'whoami':       { cmd: 'whoami',             meta: '// who' },
  'swarm':        { cmd: 'swarm --status',     meta: '// agents' },
  'contrib':      { cmd: 'contributions --calendar', meta: '// last 12mo' },
  'pipeline':     { cmd: 'pipeline --watch',    meta: '// ci/cd' },
  'capabilities': { cmd: 'ls ~/capabilities',  meta: '// what i build' },
  'stack':        { cmd: 'cat ~/.stack',       meta: '// tooling' },
  'activity':     { cmd: 'git log --oneline',  meta: '// recent' },
  'stats':        { cmd: 'stats --self-hosted',meta: '// own infra' },
  'snake':        { cmd: 'contributions | snake', meta: '// 1y' },
  'principles':   { cmd: 'cat /etc/principles', meta: '// non-negotiable' },
  'contact':      { cmd: 'ssh leopold@linkedin', meta: '// reach me' },
};

const W = 840, H = 46, CH = 8.42; // char width at 14px mono

const svg = ({ cmd, meta }) => {
  const label = `▸ ${cmd}`;
  const chipW = Math.round(34 + label.length * CH + 16);
  const ruleX = chipW + 18;
  const dotX = W - 8;                                  // pulsing dot, far right
  const metaRight = dotX - 14;                         // right edge of meta text
  const metaW = Math.round(meta.length * 7.05);        // ~7px/char at 12px mono
  const ruleEnd = metaRight - metaW - 14;              // line stops BEFORE meta (gap)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none" role="img" aria-label="${cmd}">
  <defs>
    <filter id="g" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="1.4" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect x="1" y="8" width="${chipW}" height="30" rx="8" fill="${T.bg}" stroke="${T.border}"/>
  <text x="16" y="28" font-family="${T.mono}" font-size="14" font-weight="700" fill="${T.accent}" filter="url(#g)">▸</text>
  <text x="34" y="28" font-family="${T.mono}" font-size="14" fill="${T.fg}">${cmd}</text>
  <line x1="${ruleX}" y1="23" x2="${ruleEnd}" y2="23" stroke="${T.rule}" stroke-width="1.5"/>
  <text x="${metaRight}" y="27" text-anchor="end" font-family="${T.mono}" font-size="12" fill="${T.muted}">${meta}</text>
  <circle cx="${dotX}" cy="23" r="3" fill="${T.accent}"><animate attributeName="opacity" values="1;0.35;1" dur="2.4s" repeatCount="indefinite"/></circle>
</svg>
`;
};

for (const [name, cfg] of Object.entries(SECTIONS)) {
  writeFileSync(join(OUT, `${name}.svg`), svg(cfg));
  console.log(`  wrote assets/sections/${name}.svg`);
}
console.log('done.');
