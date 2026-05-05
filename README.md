<div align="center">

```
██╗     ███████╗ ██████╗ ██████╗  ██████╗ ██╗     ██████╗
██║     ██╔════╝██╔═══██╗██╔══██╗██╔═══██╗██║     ██╔══██╗
██║     █████╗  ██║   ██║██████╔╝██║   ██║██║     ██║  ██║
██║     ██╔══╝  ██║   ██║██╔═══╝ ██║   ██║██║     ██║  ██║
███████╗███████╗╚██████╔╝██║     ╚██████╔╝███████╗██████╔╝
╚══════╝╚══════╝ ╚═════╝ ╚═╝      ╚═════╝ ╚══════╝╚═════╝
```

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=500&size=18&duration=2800&pause=900&color=00FF94&center=true&vCenter=true&width=720&lines=%24+whoami;%24+./build_agents.sh+--mode%3Dautonomous;%24+sudo+rm+-rf+%2Fmanual_work;%24+echo+%22If+a+human+types+it+twice%2C+it's+a+bug.%22" alt="terminal" />

<br/>

[![visitors](https://img.shields.io/badge/dynamic/json?color=00FF94&label=VISITORS&query=value&url=https%3A%2F%2Fapi.countapi.xyz%2Fhit%2Fleopold-jpg%2Fprofile&style=for-the-badge&labelColor=000000)](https://github.com/leopold-jpg)
[![followers](https://img.shields.io/github/followers/leopold-jpg?style=for-the-badge&color=00FF94&labelColor=000000&label=FOLLOWERS)](https://github.com/leopold-jpg)
[![stars](https://img.shields.io/github/stars/leopold-jpg?style=for-the-badge&color=00FF94&labelColor=000000&label=STARS)](https://github.com/leopold-jpg)

</div>

```bash
> ssh leopold@sibbjans.local
[leopold@sibbjans ~]$ cat /etc/identity.conf
```

```yaml
# /etc/identity.conf
operator:        leopold
location:        gotland.se :: lat=57.4684 lon=18.4867
host:            otiva-prod-01
role:            project_coordinator
clearance:       jonas_nordlander_portfolio
schedule:        mon-thu@gotland; fri@stockholm
runtime:         03_years_uptime
languages:       [sv_SE, en_US, ts]
status:          0x01 (shipping)
```

```bash
[leopold@sibbjans ~]$ ps aux | grep -i "currently_shipping"
```

---

## ` ~/projects ` — currently running

```
PID    USER       %CPU  %MEM  PROJECT              STATUS
─────  ─────────  ────  ────  ───────────────────  ───────────
1337   leopold     94    87   sibbjans-ops         RUNNING
1338   leopold     78    62   jarvis-orchestrator  RUNNING
1339   leopold     65    91   sibbjans-energy      RUNNING
1340   leopold     42    34   ai-kollegorna        RUNNING
1341   leopold     12    08   tavio                IDLE
```

<details>
<summary><code>$ cat sibbjans-ops/README</code></summary>

```
┌─ sibbjans-ops ────────────────────────────────────────┐
│ Stack:    Next.js 15 · Supabase (eu-central-1)        │
│           TypeScript · Tailwind · shadcn/ui           │
│ Schema:   tasks{ task_type, input_data, output_data,  │
│           agent_instructions, execution_status,       │
│           assigned_to: leopold|claude|jarvis }        │
│ Server:   sibbjans-mcp-server (TS) · 6 tools exposed  │
│ Region:   uklqqqrfvaoqmoluwius.supabase.co            │
│ Mode:     agent-ready :: tasks ship with full briefs  │
└───────────────────────────────────────────────────────┘
```
</details>

<details>
<summary><code>$ cat jarvis/orchestrator.conf</code></summary>

```
┌─ jarvis-orchestrator ─────────────────────────────────┐
│ Host:     mac-mini-m4 · 16GB · macOS sandboxed        │
│ Runtime:  Docker (post-incident hardening, no root)   │
│ Gateway:  ws://localhost:18789                        │
│ Stack:    OpenClaw · Claude API · ElevenLabs          │
│ Agents:   [sibbjans, otiva, tavio]                    │
│ MCP:      gmail · gcal · gdrive · slack · supabase    │
│ Channel:  WhatsApp ingress                            │
│ Notes:    survived one (1) root incident, hardened    │
└───────────────────────────────────────────────────────┘
```
</details>

<details>
<summary><code>$ cat sibbjans-energy/topology.txt</code></summary>

```
┌─ sibbjans-energy-stack ───────────────────────────────┐
│ PV array:    150 kWp                                  │
│ BESS:        558 kWh · SUNSYS HES L SKID              │
│ Genset:      Genesal diesel backup                    │
│ EMS:         Fentrica :: peak-shave + arbitrage       │
│ EV:          Alfen (Fentrica-integrated, not Zaptec)  │
│ Wind:        EM Wind WM 25kW VAWT (eval)              │
│ Grid:        GEAB N4 LSP tariff · awaiting connection │
│ Constraint:  EU supply chain :: hard requirement      │
└───────────────────────────────────────────────────────┘
```
</details>

<details>
<summary><code>$ cat ai-kollegorna/spec.md</code></summary>

```
┌─ ai-kollegorna ───────────────────────────────────────┐
│ Product:  AI agents-as-a-service for Swedish SMEs     │
│ Compute:  Mac mini per customer (self-hosted)         │
│ Pricing:  4,900 SEK / month                           │
│ Aesthetic: dark · cinematic · vercel/linear/stripe    │
│ Thesis:   sovereign compute > shared GPU cloud        │
└───────────────────────────────────────────────────────┘
```
</details>

```bash
[leopold@sibbjans ~]$ ls /var/log/recent_incidents/
```

```
2025-XX-XX  jarvis_root_escape.log     # mac wiped, creds rotated, sandboxed
2025-XX-XX  geab_connection_delay.log  # ongoing
2025-XX-XX  enviment_financials.log    # caught in DD: 11k SEK rev, -762k loss
```

---

## ` ~/.toolbelt `

```bash
[leopold@sibbjans ~]$ ls -la /usr/local/bin | wc -l
247
[leopold@sibbjans ~]$ cat ~/.skillrc
```

```ini
# ~/.skillrc — what i actually ship with
[experience]
shipping_systems   = since_2022
shipping_websites  = since_2018
shipping_agents    = since_2024
production_grade   = true
```

<div align="center">

#### ` languages `

![TypeScript](https://img.shields.io/badge/-TypeScript-000?style=for-the-badge&logo=typescript&logoColor=00FF94)
![JavaScript](https://img.shields.io/badge/-JavaScript-000?style=for-the-badge&logo=javascript&logoColor=00FF94)
![Python](https://img.shields.io/badge/-Python-000?style=for-the-badge&logo=python&logoColor=00FF94)
![Go](https://img.shields.io/badge/-Go-000?style=for-the-badge&logo=go&logoColor=00FF94)
![Rust](https://img.shields.io/badge/-Rust-000?style=for-the-badge&logo=rust&logoColor=00FF94)
![C++](https://img.shields.io/badge/-C++-000?style=for-the-badge&logo=cplusplus&logoColor=00FF94)
![Bash](https://img.shields.io/badge/-Bash-000?style=for-the-badge&logo=gnubash&logoColor=00FF94)
![SQL](https://img.shields.io/badge/-SQL-000?style=for-the-badge&logo=postgresql&logoColor=00FF94)
![HTML5](https://img.shields.io/badge/-HTML5-000?style=for-the-badge&logo=html5&logoColor=00FF94)
![CSS3](https://img.shields.io/badge/-CSS3-000?style=for-the-badge&logo=css3&logoColor=00FF94)
![Lua](https://img.shields.io/badge/-Lua-000?style=for-the-badge&logo=lua&logoColor=00FF94)
![Swift](https://img.shields.io/badge/-Swift-000?style=for-the-badge&logo=swift&logoColor=00FF94)

#### ` runtimes & build `

![Node.js](https://img.shields.io/badge/-Node.js-000?style=for-the-badge&logo=nodedotjs&logoColor=00FF94)
![Bun](https://img.shields.io/badge/-Bun-000?style=for-the-badge&logo=bun&logoColor=00FF94)
![Deno](https://img.shields.io/badge/-Deno-000?style=for-the-badge&logo=deno&logoColor=00FF94)
![Vite](https://img.shields.io/badge/-Vite-000?style=for-the-badge&logo=vite&logoColor=00FF94)
![Turbo](https://img.shields.io/badge/-Turbo-000?style=for-the-badge&logo=turborepo&logoColor=00FF94)
![pnpm](https://img.shields.io/badge/-pnpm-000?style=for-the-badge&logo=pnpm&logoColor=00FF94)
![Webpack](https://img.shields.io/badge/-Webpack-000?style=for-the-badge&logo=webpack&logoColor=00FF94)
![ESBuild](https://img.shields.io/badge/-ESBuild-000?style=for-the-badge&logo=esbuild&logoColor=00FF94)

#### ` frontend `

![Next.js](https://img.shields.io/badge/-Next.js-000?style=for-the-badge&logo=nextdotjs&logoColor=00FF94)
![React](https://img.shields.io/badge/-React-000?style=for-the-badge&logo=react&logoColor=00FF94)
![Vue](https://img.shields.io/badge/-Vue-000?style=for-the-badge&logo=vuedotjs&logoColor=00FF94)
![Svelte](https://img.shields.io/badge/-Svelte-000?style=for-the-badge&logo=svelte&logoColor=00FF94)
![Astro](https://img.shields.io/badge/-Astro-000?style=for-the-badge&logo=astro&logoColor=00FF94)
![Tailwind](https://img.shields.io/badge/-Tailwind-000?style=for-the-badge&logo=tailwindcss&logoColor=00FF94)
![shadcn](https://img.shields.io/badge/-shadcn%2Fui-000?style=for-the-badge&logo=shadcnui&logoColor=00FF94)
![Framer](https://img.shields.io/badge/-Framer_Motion-000?style=for-the-badge&logo=framer&logoColor=00FF94)
![Three.js](https://img.shields.io/badge/-Three.js-000?style=for-the-badge&logo=threedotjs&logoColor=00FF94)
![Radix](https://img.shields.io/badge/-Radix-000?style=for-the-badge&logo=radixui&logoColor=00FF94)

#### ` backend `

![Express](https://img.shields.io/badge/-Express-000?style=for-the-badge&logo=express&logoColor=00FF94)
![NestJS](https://img.shields.io/badge/-NestJS-000?style=for-the-badge&logo=nestjs&logoColor=00FF94)
![FastAPI](https://img.shields.io/badge/-FastAPI-000?style=for-the-badge&logo=fastapi&logoColor=00FF94)
![tRPC](https://img.shields.io/badge/-tRPC-000?style=for-the-badge&logo=trpc&logoColor=00FF94)
![GraphQL](https://img.shields.io/badge/-GraphQL-000?style=for-the-badge&logo=graphql&logoColor=00FF94)
![Hono](https://img.shields.io/badge/-Hono-000?style=for-the-badge&logo=hono&logoColor=00FF94)
![Socket.io](https://img.shields.io/badge/-Socket.io-000?style=for-the-badge&logo=socketdotio&logoColor=00FF94)
![REST](https://img.shields.io/badge/-REST_API-000?style=for-the-badge&logo=fastapi&logoColor=00FF94)

#### ` data `

![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-000?style=for-the-badge&logo=postgresql&logoColor=00FF94)
![Supabase](https://img.shields.io/badge/-Supabase-000?style=for-the-badge&logo=supabase&logoColor=00FF94)
![Redis](https://img.shields.io/badge/-Redis-000?style=for-the-badge&logo=redis&logoColor=00FF94)
![MongoDB](https://img.shields.io/badge/-MongoDB-000?style=for-the-badge&logo=mongodb&logoColor=00FF94)
![SQLite](https://img.shields.io/badge/-SQLite-000?style=for-the-badge&logo=sqlite&logoColor=00FF94)
![Prisma](https://img.shields.io/badge/-Prisma-000?style=for-the-badge&logo=prisma&logoColor=00FF94)
![Drizzle](https://img.shields.io/badge/-Drizzle-000?style=for-the-badge&logo=drizzle&logoColor=00FF94)
![ClickHouse](https://img.shields.io/badge/-ClickHouse-000?style=for-the-badge&logo=clickhouse&logoColor=00FF94)
![Kafka](https://img.shields.io/badge/-Kafka-000?style=for-the-badge&logo=apachekafka&logoColor=00FF94)

#### ` ai · agents · llm `

![Claude](https://img.shields.io/badge/-Claude-000?style=for-the-badge&logo=anthropic&logoColor=00FF94)
![MCP](https://img.shields.io/badge/-MCP-000?style=for-the-badge&logo=anthropic&logoColor=00FF94)
![ClaudeCode](https://img.shields.io/badge/-Claude_Code-000?style=for-the-badge&logo=anthropic&logoColor=00FF94)
![OpenAI](https://img.shields.io/badge/-OpenAI-000?style=for-the-badge&logo=openai&logoColor=00FF94)
![Ollama](https://img.shields.io/badge/-Ollama-000?style=for-the-badge&logo=ollama&logoColor=00FF94)
![LangChain](https://img.shields.io/badge/-LangChain-000?style=for-the-badge&logo=langchain&logoColor=00FF94)
![ElevenLabs](https://img.shields.io/badge/-ElevenLabs-000?style=for-the-badge&logo=elevenlabs&logoColor=00FF94)
![Whisper](https://img.shields.io/badge/-Whisper-000?style=for-the-badge&logo=openai&logoColor=00FF94)
![Cursor](https://img.shields.io/badge/-Cursor-000?style=for-the-badge&logo=cursor&logoColor=00FF94)
![Lovable](https://img.shields.io/badge/-Lovable-000?style=for-the-badge&logo=heart&logoColor=00FF94)

#### ` infra · cloud · devops `

![Docker](https://img.shields.io/badge/-Docker-000?style=for-the-badge&logo=docker&logoColor=00FF94)
![Vercel](https://img.shields.io/badge/-Vercel-000?style=for-the-badge&logo=vercel&logoColor=00FF94)
![Cloudflare](https://img.shields.io/badge/-Cloudflare-000?style=for-the-badge&logo=cloudflare&logoColor=00FF94)
![AWS](https://img.shields.io/badge/-AWS-000?style=for-the-badge&logo=amazonaws&logoColor=00FF94)
![Nginx](https://img.shields.io/badge/-Nginx-000?style=for-the-badge&logo=nginx&logoColor=00FF94)
![Caddy](https://img.shields.io/badge/-Caddy-000?style=for-the-badge&logo=caddy&logoColor=00FF94)
![Traefik](https://img.shields.io/badge/-Traefik-000?style=for-the-badge&logo=traefikproxy&logoColor=00FF94)
![GitHub_Actions](https://img.shields.io/badge/-GH_Actions-000?style=for-the-badge&logo=githubactions&logoColor=00FF94)
![Tailscale](https://img.shields.io/badge/-Tailscale-000?style=for-the-badge&logo=tailscale&logoColor=00FF94)

#### ` os · systems · networking `

![Linux](https://img.shields.io/badge/-Linux-000?style=for-the-badge&logo=linux&logoColor=00FF94)
![Ubuntu](https://img.shields.io/badge/-Ubuntu-000?style=for-the-badge&logo=ubuntu&logoColor=00FF94)
![Debian](https://img.shields.io/badge/-Debian-000?style=for-the-badge&logo=debian&logoColor=00FF94)
![Apple](https://img.shields.io/badge/-macOS-000?style=for-the-badge&logo=apple&logoColor=00FF94)
![Raspberry](https://img.shields.io/badge/-Raspberry_Pi-000?style=for-the-badge&logo=raspberrypi&logoColor=00FF94)
![ARM](https://img.shields.io/badge/-ARM-000?style=for-the-badge&logo=arm&logoColor=00FF94)
![SSH](https://img.shields.io/badge/-SSH-000?style=for-the-badge&logo=openssh&logoColor=00FF94)
![WireGuard](https://img.shields.io/badge/-WireGuard-000?style=for-the-badge&logo=wireguard&logoColor=00FF94)

#### ` editor · workflow `

![NeoVim](https://img.shields.io/badge/-NeoVim-000?style=for-the-badge&logo=neovim&logoColor=00FF94)
![VSCode](https://img.shields.io/badge/-VS_Code-000?style=for-the-badge&logo=visualstudiocode&logoColor=00FF94)
![Cursor](https://img.shields.io/badge/-Cursor-000?style=for-the-badge&logo=cursor&logoColor=00FF94)
![iTerm2](https://img.shields.io/badge/-iTerm2-000?style=for-the-badge&logo=iterm2&logoColor=00FF94)
![Tmux](https://img.shields.io/badge/-tmux-000?style=for-the-badge&logo=tmux&logoColor=00FF94)
![Git](https://img.shields.io/badge/-Git-000?style=for-the-badge&logo=git&logoColor=00FF94)
![GitHub](https://img.shields.io/badge/-GitHub-000?style=for-the-badge&logo=github&logoColor=00FF94)
![Figma](https://img.shields.io/badge/-Figma-000?style=for-the-badge&logo=figma&logoColor=00FF94)

</div>

<details>
<summary><code>$ stat ~/.skills/proficiency.json</code></summary>

```json
{
  "build_full_stack_apps":   "production",
  "ship_websites":           "production",
  "design_database_schemas": "production",
  "wire_up_apis":            "production",
  "deploy_self_hosted":      "production",
  "build_mcp_servers":       "production",
  "orchestrate_agents":      "production",
  "configure_networking":    "production",
  "harden_servers":          "production",
  "design_systems":          "production",
  "ship_things_that_work":   "verified"
}
```

</details>

---

## ` /var/log/stats `

<div align="center">

<img height="170" src="https://github-readme-stats.vercel.app/api?username=leopold-jpg&show_icons=true&hide_border=true&bg_color=0D1117&title_color=00FF94&text_color=8B949E&icon_color=00FF94&include_all_commits=true&count_private=true&rank_icon=github" />
<img height="170" src="https://github-readme-stats.vercel.app/api/top-langs/?username=leopold-jpg&layout=compact&hide_border=true&bg_color=0D1117&title_color=00FF94&text_color=8B949E&langs_count=8" />

<br/><br/>

<img src="https://streak-stats.demolab.com?user=leopold-jpg&theme=dark&hide_border=true&background=0D1117&ring=00FF94&fire=00FF94&currStreakLabel=00FF94&sideNums=00FF94&sideLabels=8B949E&dates=8B949E&stroke=00FF94" />

</div>

---

## ` ~/.contribution-graph `

```bash
[leopold@sibbjans ~]$ tail -f activity.log | snake
```

<div align="center">

![Snake animation](https://raw.githubusercontent.com/leopold-jpg/leopold-jpg/output/github-contribution-grid-snake-dark.svg)

</div>

---

## ` /etc/principles `

```c
/* operating principles — non-negotiable */

#define BIAS_TO_AUTONOMY      "if a human types it twice, it's a bug"
#define BRIEFS_OVER_TICKETS   "tasks ship with execution context"
#define SELF_HOSTED_DEFAULT   "i own the metal, the keys, the logs"
#define EUROPEAN_SUPPLY       "hard requirement, not preference"
#define NEVER_TRUST_DEFAULTS  "audit, sandbox, rotate, repeat"

while (problem_unsolved) {
    ship();
    measure();
    iterate();
    if (entropy++ > tolerance) refactor();
}
```

> ` ship the agent. then ship the agent that ships the agent. `

---

## ` ~/contact `

```bash
[leopold@sibbjans ~]$ ssh leopold@linkedin
```

<div align="center">

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-000?style=for-the-badge&logo=linkedin&logoColor=00FF94)](https://www.linkedin.com/in/leopold-seifert-3b3b5223b/)

</div>

<br/>

<div align="center">

```
─────────────────────────────────────────────────────────
  uptime: 03y · last_commit: just_now · status: shipping
─────────────────────────────────────────────────────────
```

</div>
