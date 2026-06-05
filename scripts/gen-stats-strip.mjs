#!/usr/bin/env node
/* Self-hosted stat badge strip from the GitHub GraphQL API — replaces the
   rate-limited shields.io/komarev badges. Real data, terminal-skin chips.
   Run in CI with GITHUB_TOKEN. Usage: GH_TOKEN=xxx node scripts/gen-stats-strip.mjs [user] [out] */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const USER = process.argv[2] || 'leopold-jpg';
const OUT = process.argv[3] || 'assets/stats-strip.svg';
const TOKEN = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
if (!TOKEN) { console.error('No GH_TOKEN/GITHUB_TOKEN'); process.exit(1); }

const q = `query($u:String!){user(login:$u){followers{totalCount} repositories(first:100,ownerAffiliations:OWNER,privacy:PUBLIC){totalCount nodes{stargazerCount}} contributionsCollection{contributionCalendar{totalContributions}}}}`;
const r = await fetch('https://api.github.com/graphql', {
  method: 'POST', headers: { Authorization: `bearer ${TOKEN}`, 'Content-Type': 'application/json', 'User-Agent': 'leopold-stats' },
  body: JSON.stringify({ query: q, variables: { u: USER } }),
});
const j = await r.json();
if (j.errors) { console.error(JSON.stringify(j.errors)); process.exit(1); }
const u = j.data.user;
const stars = u.repositories.nodes.reduce((s, n) => s + n.stargazerCount, 0);

const STATS = [
  { label: 'FOLLOWERS', value: String(u.followers.totalCount) },
  { label: 'STARS', value: String(stars) },
  { label: 'REPOS', value: String(u.repositories.totalCount) },
  { label: 'CONTRIBS', value: String(u.contributionsCollection.contributionCalendar.totalContributions) },
];

const MONO = "'JetBrains Mono','SF Mono',ui-monospace,monospace";
const H = 50, CH_L = 8.0, CH_V = 9.2, PAD = 16, GAP = 12;
const chips = STATS.map(s => {
  const lw = Math.round(PAD + s.label.length * CH_L + 12);
  const vw = Math.round(s.value.length * CH_V + 26);
  return { ...s, lw, vw, w: lw + vw };
});
const totalW = chips.reduce((a, c) => a + c.w, 0) + GAP * (chips.length - 1);
const W = 840;
let x = Math.round((W - totalW) / 2);
const y = 8, h = 34, r2 = 8;

let body = '';
for (const c of chips) {
  const lw = c.lw, vw = c.vw;
  body += `
  <g>
    <clipPath id="cl${c.label}"><rect x="${x}" y="${y}" width="${c.w}" height="${h}" rx="${r2}"/></clipPath>
    <g clip-path="url(#cl${c.label})">
      <rect x="${x}" y="${y}" width="${lw}" height="${h}" fill="#161B22"/>
      <rect x="${x + lw}" y="${y}" width="${vw}" height="${h}" fill="#00FF94"/>
    </g>
    <rect x="${x}" y="${y}" width="${c.w}" height="${h}" rx="${r2}" fill="none" stroke="#21262D"/>
    <text x="${x + PAD}" y="${y + 22}" font-family="${MONO}" font-size="12" font-weight="700" letter-spacing="0.5" fill="#8B949E">${c.label}</text>
    <text x="${x + lw + vw / 2}" y="${y + 22}" text-anchor="middle" font-family="${MONO}" font-size="13" font-weight="700" fill="#04150D">${c.value}</text>
  </g>`;
  x += c.w + GAP;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none" role="img" aria-label="GitHub stats: ${STATS.map(s => s.label + ' ' + s.value).join(', ')}">
  ${body}
</svg>
`;
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, svg);
console.log(`wrote ${OUT} — ${STATS.map(s => `${s.label}=${s.value}`).join(' ')}`);
