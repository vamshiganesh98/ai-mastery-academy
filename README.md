# AI Mastery Academy

A beautiful, interactive 30-day web app to learn AI engineering from zero to production-ready — with a **Living Syllabus** that updates itself daily.

**Live app:** https://vamshiganesh98.github.io/ai-mastery-academy/ *(after GitHub Pages is enabled)*

## Features

- **31+ lessons** across 5 weeks (Foundations → LLMs → Agents → Production → Living Syllabus)
- **Automated daily updates** — morning briefs from RSS + GitHub releases (no human in the loop)
- **Embedded video lessons** from top educators (3Blue1Brown, Andrej Karpathy, etc.)
- **Code examples** with copy-to-clipboard for every concept
- **Interactive quizzes** with explanations after each lesson
- **4 capstone projects** + bonus production agent lesson
- **35+ glossary terms** with search and category filters
- **Progress tracking** with achievements, skills tracker, and notes (localStorage)
- **Beautiful dark UI** with animations, gradients, and responsive design

## Quick Start

```bash
git clone https://github.com/vamshiganesh98/ai-mastery-academy.git
cd ai-mastery-academy
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Living Syllabus (Automated)

The curriculum updates itself daily via GitHub Actions — **no human in the loop**.

- **Schedule:** Every day at 6:00 AM UTC
- **Workflow:** `.github/workflows/morning-syllabus-check.yml`
- **Script:** `scripts/morning-check/run.mjs`
- **Output:** Morning briefs on the Updates page

Optional: add `OPENAI_API_KEY` to repo Secrets for AI-written summaries.

```bash
node scripts/morning-check/run.mjs
FORCE_MORNING_CHECK=1 node scripts/morning-check/run.mjs
```

## Curriculum Overview

| Week | Topic | Days |
|------|-------|------|
| 1 | Foundations (AI, ML, LLMs, Prompts, APIs) | 1-7 |
| 2 | Building with LLMs (RAG, Vector DBs, Tools) | 8-14 |
| 3 | Agents (ReAct, LangGraph, MCP, Safety) | 15-21 |
| 4 | Production (Deploy, Fine-tune, Testing) | 22-30 |
| 5 | Living Syllabus (auto-updated bonus lessons) | 31+ |

## Tech Stack

- React 19 + TypeScript · Vite · Tailwind CSS v4 · Framer Motion · React Router

## License

MIT
