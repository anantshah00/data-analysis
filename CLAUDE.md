# CLAUDE.md — Project Context for Claude Code

This file is read automatically by Claude Code at the start of every session.
It gives Claude full context so you never have to re-explain the project.

---

## Project Overview
**Anant's Data Analytics Portfolio** — a Next.js website showcasing a sports
analytics project predicting Premier League winners.

- **Live site:** https://anantshah-analytics.vercel.app
- **GitHub repo:** https://github.com/anantshah00/data-analysis
- **Local path:** /Users/anant/ClaudeCode/portfolio-site

---

## Tech Stack
| Layer | Tool |
|---|---|
| Framework | Next.js 14 (Pages Router) |
| Styling | Tailwind CSS |
| Charts | Plotly.js via react-plotly.js |
| Deployment | Vercel (auto-deploys on push to main) |
| Version control | Git + GitHub over SSH |

---

## Folder Structure
```
portfolio-site/
├── pages/
│   ├── _app.js                      # Global layout wrapper
│   ├── index.js                     # Homepage
│   └── project-premier-league.js   # Premier League project page
├── components/
│   ├── Layout.js                    # Page shell (Navbar + Footer)
│   ├── Navbar.js                    # Top nav with links
│   ├── Footer.js                    # Footer with social links
│   ├── PlotlyChart.js               # Reusable Plotly wrapper (SSR-safe)
│   ├── InsightCard.js               # Coloured insight highlight cards
│   └── StatCard.js                  # Metric stat boxes
├── data/
│   └── chart_data.js                # ALL chart data lives here
├── hooks/
│   └── useScrollAnimation.js        # Scroll fade-in animation hook
├── styles/
│   └── globals.css                  # Tailwind base + custom CSS
├── public/                          # Static assets (images, favicon)
├── vercel.json                      # Tells Vercel this is a Next.js app
├── next.config.js                   # Next.js config (GitHub Pages toggle inside)
├── CLAUDE.md                        # ← You are here
└── deploy.sh                        # One-command deploy script
```

---

## How to Add a New Project Page
1. Duplicate `pages/project-premier-league.js` → rename it
2. Add chart data to `data/chart_data.js`
3. Add a project card to the homepage in `pages/index.js`
4. Run `./deploy.sh "Add new project: <name>"` to push live

---

## How Charts Work
- All chart data is in `data/chart_data.js` as plain JS objects
- Each chart uses the `<PlotlyChart />` component with `data` and `layout` props
- `PlotlyChart.js` handles Next.js SSR safely with dynamic import
- To update a chart: edit the data arrays in `chart_data.js`

---

## Git & Deploy Workflow
- **Remote:** `git@github.com:anantshah00/data-analysis.git` (SSH, no password)
- **Branch:** `main` — Vercel auto-deploys on every push
- **Deploy command:** `./deploy.sh "your commit message"`

---

## Owner Details
- **Name:** Anant Shah
- **Email:** anantshah00@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/anant-a-shah/
- **GitHub:** https://github.com/anantshah00

---

## Common Tasks Claude Can Do Directly
| Task | What to say |
|---|---|
| Update bio text | "Change my bio to: ..." |
| Add a new chart | "Add a bar chart showing X to the project page" |
| Change colours/styling | "Make the insight cards green instead of blue" |
| Add a new project page | "Add a new project called X about Y" |
| Fix a bug | "The navbar looks broken on mobile, fix it" |
| Push to live | "Deploy the changes" |
