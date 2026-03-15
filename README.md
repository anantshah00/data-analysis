# Anant's Data Analytics Portfolio

A modern, interactive analytics portfolio built with **Next.js**, **Tailwind CSS**, and **Plotly.js** — showcasing a Premier League champion prediction project.

---

## Live Demo

> Deploy to Vercel (easiest) or GitHub Pages — instructions below.

---

## Project Structure

```
portfolio-site/
├── components/
│   ├── Layout.js           # Page wrapper (Head, Navbar, Footer)
│   ├── Navbar.js           # Sticky responsive navigation
│   ├── Footer.js           # Footer with social links
│   ├── PlotlyChart.js      # Dynamic Plotly wrapper (SSR-safe)
│   ├── InsightCard.js      # Insight display card with icon + accent
│   └── StatCard.js         # Large-number highlight card
├── data/
│   └── chart_data.js       # All 6 Plotly chart configurations + dataset
├── hooks/
│   └── useScrollAnimation.js  # IntersectionObserver scroll-reveal hook
├── pages/
│   ├── _app.js             # App root (font, global styles, scroll animation)
│   ├── index.js            # Homepage
│   └── project-premier-league.js  # Sports analytics project page
├── styles/
│   └── globals.css         # Tailwind base + custom CSS animations
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## Tech Stack

| Layer          | Technology          |
|----------------|---------------------|
| Framework      | Next.js 14 (Pages Router) |
| Styling        | Tailwind CSS 3     |
| Charts         | Plotly.js + react-plotly.js |
| Language       | JavaScript (ES2022) |
| Deployment     | Vercel or GitHub Pages |

---

## Local Setup

```bash
# 1. Clone / navigate into the folder
cd portfolio-site

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
# → http://localhost:3000
```

---

## Deployment

### Option A — Vercel (Recommended, 2 minutes)

1. Push the `portfolio-site` folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) → **New Project** → import the repo.
3. Leave all settings as default → click **Deploy**.
4. Done. Vercel auto-detects Next.js and deploys instantly.

> **Custom domain:** Vercel Dashboard → Domains → add yours.

---

### Option B — GitHub Pages (Static Export)

GitHub Pages requires Next.js to output static HTML.

**Step 1 — Update `next.config.js`:**

```js
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',
  basePath:    isProd ? '/YOUR-REPO-NAME' : '',
  assetPrefix: isProd ? '/YOUR-REPO-NAME/' : '',
  images: { unoptimized: true },
}

module.exports = nextConfig
```

Replace `YOUR-REPO-NAME` with your GitHub repository name.

**Step 2 — Build:**

```bash
npm run build
# This creates an `out/` folder with static HTML
```

**Step 3 — Push to GitHub:**

```bash
git init
git add .
git commit -m "Initial portfolio deploy"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

**Step 4 — Enable GitHub Pages:**

1. GitHub repo → **Settings** → **Pages**
2. Source: **GitHub Actions**
3. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: portfolio-site/package-lock.json
      - working-directory: portfolio-site
        run: npm ci
      - working-directory: portfolio-site
        run: npm run build
        env:
          NODE_ENV: production
      - uses: actions/upload-pages-artifact@v3
        with:
          path: portfolio-site/out
      - uses: actions/deploy-pages@v4
```

Push the workflow file → GitHub automatically builds and deploys.

---

## Personalisation Checklist

- [ ] `components/Navbar.js` — update GitHub URL
- [ ] `components/Footer.js` — update GitHub, LinkedIn, email links
- [ ] `pages/index.js` — update bio text and hero description
- [ ] `next.config.js` — set `basePath` to your repo name (GitHub Pages only)
- [ ] Replace `"your-username"` throughout with your real GitHub handle
- [ ] Add your own profile photo to `public/` and reference it in the hero

---

## Extending the Project

**Add a new project:**
1. Create `pages/project-your-title.js`
2. Add chart data to `data/chart_data.js`
3. Add a project card to `pages/index.js`

**Add real data:**
- Replace `data/chart_data.js` constants with data fetched from a CSV/API
- Use `getStaticProps` or `getServerSideProps` in the page component

---

## Screenshots

| Homepage Hero | Project Page | Charts |
|:---:|:---:|:---:|
| Dark PL purple gradient | Sticky nav + sections | 6 interactive Plotly charts |

---

## License

MIT — free to use and adapt for your own portfolio.
