#!/usr/bin/env bash
# ============================================================
# AI TEXT — One-command deployment helper
# ============================================================
# Usage:
#   ./scripts/deploy.sh github "your-username"   # push to GitHub
#   ./scripts/deploy.sh render                   # show Render deploy steps
#   ./scripts/deploy.sh all "your-username"      # do everything
# ============================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

print_banner() {
  echo -e "${PURPLE}"
  echo "  ___  __________  __________ "
  echo " / _ \\/ __/ __/ |/_/  _/__  / "
  echo "/ ___/ _// _/>  </ _// _ \\/  "
  echo "/_/  /___/___/_/|_/___/_//_/  "
  echo -e "${NC}"
  echo -e "${BLUE}AI TEXT — Deployment Helper${NC}"
  echo ""
}

check_git() {
  if [ ! -d ".git" ]; then
    echo -e "${RED}✗ No git repo found. Run 'git init' first.${NC}"
    exit 1
  fi
}

cmd_github() {
  local USERNAME="$1"
  if [ -z "$USERNAME" ]; then
    echo -e "${RED}✗ Usage: $0 github <your-github-username>${NC}"
    exit 1
  fi

  echo -e "${BLUE}→ Setting up GitHub remote…${NC}"
  git remote remove origin 2>/dev/null || true
  git remote add origin "https://github.com/$USERNAME/ai-text.git"
  git branch -M main

  echo ""
  echo -e "${YELLOW}Step 1: Create the GitHub repo${NC}"
  echo "  Open: https://github.com/new"
  echo "  Name: ai-text"
  echo "  Visibility: Public or Private (your choice)"
  echo "  ⚠️  DON'T initialize with README, .gitignore, or license"
  echo ""
  read -p "Press Enter once the repo is created on GitHub…"

  echo ""
  echo -e "${BLUE}→ Pushing to GitHub…${NC}"
  git push -u origin main

  echo ""
  echo -e "${GREEN}✓ Successfully pushed to https://github.com/$USERNAME/ai-text${NC}"
  echo ""
  echo -e "${YELLOW}Next: Deploy to Render${NC}"
  echo "  Run: ./scripts/deploy.sh render"
}

cmd_render() {
  echo -e "${BLUE}→ Render Deployment Guide${NC}"
  echo ""
  echo -e "${YELLOW}Option A: One-Click Blueprint Deploy (Easiest)${NC}"
  echo "  1. Go to: https://render.com/blueprints"
  echo "  2. Click 'New Blueprint Instance'"
  echo "  3. Connect your GitHub account (if not already)"
  echo "  4. Select the 'ai-text' repo"
  echo "  5. Render auto-detects 'render.yaml' and deploys ✨"
  echo ""
  echo -e "${YELLOW}Option B: Manual Web Service${NC}"
  echo "  1. Go to: https://dashboard.render.com/create?type=web"
  echo "  2. Connect your GitHub repo"
  echo "  3. Fill in:"
  echo "     - Name: ai-text"
  echo "     - Region: Oregon (or your preference)"
  echo "     - Branch: main"
  echo "     - Runtime: Node"
  echo "     - Build Command: npm install && npm run build"
  echo "     - Start Command: npm start"
  echo "     - Instance Type: Starter (\$0/mo) or higher"
  echo "  4. Click 'Create Web Service'"
  echo ""
  echo -e "${YELLOW}Environment Variables (auto-set by render.yaml):${NC}"
  echo "  NODE_VERSION=20.11.1"
  echo "  NODE_ENV=production"
  echo "  NEXT_TELEMETRY_DISABLED=1"
  echo ""
  echo -e "${GREEN}Deployment typically takes 3-5 minutes.${NC}"
  echo "Your app will be live at: https://ai-text.onrender.com"
}

cmd_all() {
  local USERNAME="$1"
  cmd_github "$USERNAME"
  echo ""
  cmd_render
}

print_banner

case "${1:-}" in
  github)
    check_git
    cmd_github "$2"
    ;;
  render)
    cmd_render
    ;;
  all)
    check_git
    cmd_all "$2"
    ;;
  *)
    echo "Usage:"
    echo "  $0 github <username>     # Push to GitHub"
    echo "  $0 render                # Show Render deploy steps"
    echo "  $0 all <username>        # Do both"
    echo ""
    echo "First time? Make sure you've run:"
    echo "  git init && git add . && git commit -m 'initial'"
    ;;
esac