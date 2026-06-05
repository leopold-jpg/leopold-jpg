#!/usr/bin/env bash
#
# rotate-tokens.sh — set/rotate a single GitHub PAT across every self-hosted
# README card service, then redeploy each. Run this whenever you create a fresh
# token (e.g. after the original leaked, or on a rotation schedule).
#
# The token is read interactively with `read -s`: it is never echoed, never put
# on a command line (argv), and never written to a file. It lives only in the
# shell's memory for the duration of the run.
#
# Requirements: `gh` (logged in) and `vercel` (logged in, scope leopold-3283s-projects).
#
# Usage:
#   bash scripts/rotate-tokens.sh
#
set -euo pipefail

read -rsp "Paste a fresh GitHub PAT (classic — scopes: repo + read:user): " TOK; echo
if [ -z "${TOK:-}" ]; then echo "No token entered. Aborting."; exit 1; fi
echo "Token received (${#TOK} chars). Rotating across all instances…"

# repo  ->  vercel project  ->  env var name the service expects
rotate() {
  repo="$1"; proj="$2"; var="$3"
  d="$(mktemp -d)"
  echo "── $proj ($var)"
  gh repo clone "leopold-jpg/$repo" "$d" >/dev/null 2>&1
  ( cd "$d"
    git remote remove upstream 2>/dev/null || true
    vercel link --yes --project "$proj" >/dev/null 2>&1
    vercel env rm "$var" production --yes >/dev/null 2>&1 || true
    printf '%s' "$TOK" | vercel env add "$var" production >/dev/null 2>&1
    vercel deploy --prod --yes >/dev/null 2>&1
  )
  rm -rf "$d"
  echo "   ✓ env set + redeployed"
}

rotate github-readme-stats          grs-leopold    PAT_1
rotate github-readme-activity-graph graph-leopold  TOKEN
rotate github-profile-trophy        trophy-leopold GITHUB_TOKEN1
# streak is PHP-on-Vercel and still needs its runtime/vendor build fixed before it
# will render even with a token — left on the public demolab instance for now.
# Uncomment once the streak-leopold deploy is healthy:
# rotate github-readme-streak-stats   streak-leopold TOKEN

unset TOK
echo
echo "Done. Next:"
echo "  1. Revoke the OLD token: https://github.com/settings/tokens"
echo "  2. Flip these README URLs to the now-authenticated self-hosted instances:"
echo "       github-profile-trophy.vercel.app  ->  trophy-leopold.vercel.app"
echo "     (graph + stats already point at your instances.)"
