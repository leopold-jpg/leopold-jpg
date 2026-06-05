#!/usr/bin/env node
/* THE standout piece: an "agent swarm" — a central orchestrator node dispatching
   live task-pulses out to your real top languages as agent nodes. Built from the
   GitHub GraphQL API, animated via SMIL, terminal-skin. Regenerated daily in CI.
   Usage: GH_TOKEN=xxx node scripts/gen-swarm.mjs [user] [out] */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const USER = process.argv[2] || 'leopold-jpg';
const OUT = process.argv[3] || 'assets/swarm.svg';
const TOKEN = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
if (!TOKEN) { console.error('No GH_TOKEN/GITHUB_TOKEN'); process.exit(1); }

const q = `query($u:String!){user(login:$u){repositories(first:100,ownerAffiliations:OWNER,isFork:false){nodes{languages(first:8){edges{size node{name color}}}}}}}`;
const r = await fetch('https://api.github.com/graphql', {
  method: 'POST', headers: { Authorization: `bearer ${TOKEN}`, 'Content-Type': 'application/json', 'User-Agent': 'leopold-swarm' },
  body: JSON.stringify({ query: q, variables: { u: USER } }),
});
const j = await r.json();
if (j.errors) { console.error(JSON.stringify(j.errors)); process.exit(1); }

const totals = {};
for (const repo of j.data.user.repositories.nodes)
  for (const e of repo.languages.edges)
    totals[e.node.name] = (totals[e.node.name] || 0) + e.size;

// only fall back when there is genuinely no data; never show 0% padding nodes
const FALLBACK = { TypeScript: 5, Python: 4, Go: 3, Rust: 2, Bash: 1 };
let raw = Object.entries(totals).sort((a, b) => b[1] - a[1]);
if (raw.length === 0) raw = Object.entries(FALLBACK).sort((a, b) => b[1] - a[1]);
raw = raw.slice(0, 8);
const sum = raw.reduce((a, [, v]) => a + v, 0) || 1;
// compute share, drop anything that rounds to 0%, keep top 7
let langs = raw.map(([name, v]) => [name, Math.round((v / sum) * 100)]).filter(([, p]) => p >= 1).slice(0, 7);

const W = 840, H = 420, cx = 420, cy = 214, R = 150;
const N = langs.length;
const MONO = "'JetBrains Mono',ui-monospace,monospace";

let edges = '', pulses = '', nodes = '';
langs.forEach(([name, pct], i) => {
  const ang = (-Math.PI / 2) + (i * 2 * Math.PI / N);
  const nx = +(cx + R * Math.cos(ang)).toFixed(1);
  const ny = +(cy + R * Math.sin(ang)).toFixed(1);
  const nr = 14 + Math.min(14, pct / 4);            // node size scales with share
  const begin = (i * 0.42).toFixed(2);
  edges += `<line x1="${cx}" y1="${cy}" x2="${nx}" y2="${ny}" stroke="#21262D" stroke-width="1.5"/>`;
  // task pulse travelling orchestrator -> agent
  pulses += `<circle r="3.4" fill="#00FF94" filter="url(#glow)"><animateMotion path="M ${cx} ${cy} L ${nx} ${ny}" dur="2.6s" begin="${begin}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="2.6s" begin="${begin}s" repeatCount="indefinite"/></circle>`;
  // agent node
  const labelY = ny + nr + 16;
  nodes += `
  <g>
    <circle cx="${nx}" cy="${ny}" r="${nr.toFixed(1)}" fill="#161B22" stroke="#00FF94" stroke-width="1.5"/>
    <circle cx="${nx}" cy="${ny}" r="${nr.toFixed(1)}" fill="none" stroke="#00FF94" stroke-width="1.5" opacity="0.5"><animate attributeName="r" values="${nr.toFixed(1)};${(nr + 7).toFixed(1)};${nr.toFixed(1)}" dur="3s" begin="${begin}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.5;0;0.5" dur="3s" begin="${begin}s" repeatCount="indefinite"/></circle>
    <text x="${nx}" y="${ny + 4}" text-anchor="middle" font-family="${MONO}" font-size="11" font-weight="700" fill="#00FF94">${pct}%</text>
    <text x="${nx}" y="${labelY}" text-anchor="middle" font-family="${MONO}" font-size="11.5" fill="#E6EDF3">${name}</text>
  </g>`;
});

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none" role="img" aria-label="agent swarm — orchestrator dispatching to ${N} language agents">
  <defs>
    <radialGradient id="bgglow" cx="50%" cy="50%" r="55%"><stop offset="0" stop-color="#0C2A1C" stop-opacity="0.8"/><stop offset="1" stop-color="#0D1117" stop-opacity="0"/></radialGradient>
    <filter id="glow" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#0D1117" stroke="#21262D" stroke-width="1.5"/>
  <ellipse cx="${cx}" cy="${cy}" rx="300" ry="170" fill="url(#bgglow)"/>
  <text x="24" y="30" font-family="${MONO}" font-size="12.5" fill="#8B949E">swarm — orchestration map · <tspan fill="#00FF94">${N} agents online</tspan></text>
  <text x="${W - 18}" y="30" text-anchor="end" font-family="${MONO}" font-size="11.5" fill="#6E7681">scheduler: round-robin</text>

  ${edges}
  ${pulses}
  ${nodes}

  <!-- orchestrator core -->
  <circle cx="${cx}" cy="${cy}" r="40" fill="none" stroke="#00FF94" stroke-width="1" opacity="0.35"><animate attributeName="r" values="34;52;34" dur="4s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.35;0;0.35" dur="4s" repeatCount="indefinite"/></circle>
  <circle cx="${cx}" cy="${cy}" r="32" fill="#0D1117" stroke="#00FF94" stroke-width="2" filter="url(#glow)"/>
  <text x="${cx}" y="${cy - 2}" text-anchor="middle" font-family="${MONO}" font-size="13" font-weight="700" fill="#00FF94">◉</text>
  <text x="${cx}" y="${cy + 14}" text-anchor="middle" font-family="${MONO}" font-size="9" fill="#8B949E">orchestrator</text>
</svg>
`;
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, svg);
console.log(`wrote ${OUT} — ${langs.length} agents: ${langs.map(([n]) => n).join(', ')}`);
