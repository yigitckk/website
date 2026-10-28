# yigitc.tech

**My personal site — live at [yigitc.tech](https://yigitc.tech)**

![site preview](assets/site-preview.png)

React + MUI, built with Create React App, deployed on GitHub Pages under a custom domain via a `CNAME` + `gh-pages` subtree push.

## What's on it

- **About** — who I am: backend engineer path (auth → job queue → event log), industrial engineering background (PAU), Endüstri 5.0 systems thinking
- **Path** — Backend / Data / ML engineering tracks I'm working through
- **Projects** — categorized portfolio (3D Modeling & Sign Design · Applied AI & Decision Science · Backend & Systems), each with a blog-style detail page at `/projects/<slug>`
- **CLI terminal block** — the actual status of my self-hosted stack (Vikunja task OS, Miniflux feeds, RAG engine, Glance hub), no fake numbers

## Build & deploy

```bash
npm ci
npm run build        # react-scripts build + scripts/postbuild.js
```

Push to `main` → GitHub Actions (`.github/workflows/deploy.yml`) builds and publishes `build/` to the `gh-pages` branch (CNAME `yigitc.tech`).

`scripts/postbuild.js` writes per-route HTML (`/projects/<slug>`, `/blog/<slug>`) with title/meta/Open Graph/JSON-LD baked in, a `404.html` SPA fallback and `sitemap.xml`.

## Adding a project

Everything lives in `src/data/projects.json`: add an entry to `projects` (slug, title, category, summary, cover, gallery, tags, links, problem/approach/result markdown) and drop optimized images in `public/images/projects/<slug>/`. New category = one entry in `categories`; the filter tabs, detail page, sitemap and meta pick it up automatically.

## Design

Dark, terminal-first aesthetic: JetBrains Mono CLI block, slate palette, minimal chrome. The site is a business card for systems work — it shows the stack and the path, not a carousel.