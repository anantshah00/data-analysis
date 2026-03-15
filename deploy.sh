#!/bin/bash
# ─────────────────────────────────────────────────────────────
# deploy.sh — One-command deploy to GitHub → Vercel
#
# Usage:
#   ./deploy.sh                          # uses a default commit message
#   ./deploy.sh "your commit message"    # uses your message
# ─────────────────────────────────────────────────────────────

set -e  # Stop immediately if any command fails

# Use provided message or fall back to a timestamped default
MESSAGE="${1:-"Update portfolio site — $(date '+%Y-%m-%d %H:%M')"}"

echo ""
echo "🚀  Deploying: \"$MESSAGE\""
echo "────────────────────────────────────"

# Stage all changes (respects .gitignore — won't touch node_modules)
git add .

# Check if there's actually anything to commit
if git diff --cached --quiet; then
  echo "✅  Nothing to commit — already up to date."
  exit 0
fi

# Commit
git commit -m "$MESSAGE

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"

# Push to GitHub — Vercel auto-deploys from here
git push origin main

echo ""
echo "✅  Done! Vercel is deploying now."
echo "🌐  Site: https://anant-portfolio.vercel.app"
echo "📊  Vercel dashboard: https://vercel.com/dashboard"
echo ""
