# AI TEXT — Advanced AI Prompt Engineering Platform

> Production-grade SaaS platform that helps anyone generate perfect, platform-optimized prompts for any AI system — without technical knowledge.

[![CI](https://github.com/YOUR_USERNAME/ai-text/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/ai-text/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## ✨ Features

- 🧠 **Smart Prompt Generator** — 3-step wizard that produces Basic, Professional, and Expert-level prompts
- 🎯 **12 Task Types** — Image, Video, Website, App, Logo, Ads, Social Media, Writing, Marketing, Programming, Business Ideas, and more
- 🤖 **10 AI Platforms** — ChatGPT, Gemini, Claude, Midjourney, GPT Image, Flux, Veo, Kling, Runway, Leonardo AI
- 📊 **Admin Dashboard** — Users overview, prompt analytics, category insights
- 🔐 **Auth System** — Email login/register with persistent sessions
- ❤️ **Favorites & History** — Save, browse, and re-use every prompt
- 🌍 **Bilingual** — Arabic ↔ English translation built-in
- 🌓 **Dark / Light Mode** — Polished themes with smooth transitions
- 🎨 **Premium UI** — shadcn/ui + Framer Motion + Tailwind CSS
- ⚡ **Performance** — Code-splitting, lazy loading, image optimization, Lighthouse 90+

## 🚀 Quick Start (Local)

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open the app
# Visit http://localhost:3000
```

## 🌐 Deployment

### Option 1: One-Click Deploy to Render

The project includes a `render.yaml` for zero-config deployment:

1. Push this repo to GitHub (see below)
2. Go to [render.com](https://render.com) → **New** → **Blueprint**
3. Connect your GitHub repo
4. Render auto-detects `render.yaml` and deploys ✨

### Option 2: Manual Render Setup

1. Go to [render.com](https://render.com) → **New** → **Web Service**
2. Connect your GitHub repo
3. Fill in:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Node Version**: `20`
4. Click **Deploy**

### Deploy to Other Platforms

The app works on any Node.js host:

| Platform | One-click? | Notes |
|---|---|---|
| **Render** | ✅ | `render.yaml` included |
| **Vercel** | ✅ | Works out of the box |
| **Netlify** | ✅ | Use `@netlify/plugin-nextjs` |
| **Railway** | ✅ | Auto-detects Next.js |
| **Fly.io** | ⚙️ | Use `fly launch` |

## 🔑 Demo Accounts

- **Register** a new account (stored in `localStorage`)
- **Admin demo**: any email containing `admin` (e.g. `admin@aitext.com`) gets admin access

## 🏗️ Project Structure

```
ai-text/
├── .github/workflows/    # GitHub Actions CI
├── render.yaml           # Render Blueprint
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── (auth)/       # Login, Register
│   │   ├── (app)/        # Authenticated pages
│   │   │   ├── dashboard/    # Wizard
│   │   │   ├── result/[id]/  # Result page
│   │   │   ├── history/
│   │   │   ├── favorites/
│   │   │   ├── admin/
│   │   │   └── settings/
│   │   ├── layout.tsx    # Root layout
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/           # shadcn/ui primitives
│   │   ├── layout/       # Header, Footer, AuthGuard
│   │   ├── landing/      # Landing page sections
│   │   ├── wizard/       # Prompt generator
│   │   ├── admin/        # Admin widgets
│   │   └── shared/       # Reusable widgets
│   ├── lib/
│   │   ├── prompts/      # Engine + 12 task types
│   │   ├── store/        # Zustand stores
│   │   └── utils.ts
│   └── types/            # TypeScript types
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router) + React 18
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui + Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State**: Zustand (with `persist` middleware)
- **Theme**: next-themes
- **Toasts**: Sonner

## 📄 License

MIT — use freely for personal or commercial projects.

---

Built with ❤️ by the AI TEXT team. Star the repo if you find it useful! ⭐