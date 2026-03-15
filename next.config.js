/** @type {import('next').NextConfig} */

// ── Vercel deployment (default) ───────────────────────────────────────────────
// No special config needed — just deploy and Vercel handles everything.

// ── GitHub Pages deployment ───────────────────────────────────────────────────
// Uncomment the block below (and comment out the Vercel config) when deploying
// to GitHub Pages. Uncomment the block below and comment out the Vercel config.
//
// const isProd = process.env.NODE_ENV === 'production'
// const nextConfig = {
//   output: 'export',
//   basePath: isProd ? '/data-analysis' : '',
//   assetPrefix: isProd ? '/data-analysis/' : '',
//   images: { unoptimized: true },
// }

const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
