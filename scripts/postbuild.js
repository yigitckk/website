#!/usr/bin/env node
/*
 * Post-build step for GitHub Pages (BrowserRouter SPA):
 *  - writes build/<route>/index.html for every known route, with that route's
 *    <title>, meta description, Open Graph / Twitter tags and JSON-LD baked in,
 *    so deep links return HTTP 200 and crawlers / link previews see real meta
 *    without executing JS (react-helmet-async takes over client-side; tags carry
 *    data-rh so Helmet replaces them instead of duplicating).
 *  - writes build/404.html as SPA fallback for any unknown path.
 *  - writes build/sitemap.xml (robots.txt is static in public/).
 * Data source: src/data/projects.json + src/blog/*.md front matter.
 */
const fs = require('fs');
const path = require('path');

const SITE = 'https://yigitc.tech';
const root = path.resolve(__dirname, '..');
const build = path.join(root, 'build');
const { categories, projects } = JSON.parse(fs.readFileSync(path.join(root, 'src/data/projects.json'), 'utf8'));
const template = fs.readFileSync(path.join(build, 'index.html'), 'utf8');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const abs = (u) => (u.startsWith('http') ? u : SITE + u);
const today = new Date().toISOString().slice(0, 10);

const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Yiğit Çelik',
  url: SITE,
  jobTitle: 'Backend Engineer · Applied AI · Sign CAD & 3D',
  address: { '@type': 'PostalAddress', addressLocality: 'Manisa', addressCountry: 'TR' },
  sameAs: ['https://github.com/yigitckk', 'https://www.linkedin.com/in/yigitck/', 'https://x.com/yigitopt'],
};

function render({ route, title, description, image, type = 'website', jsonLd }) {
  const url = SITE + (route === '/' ? '/' : route);
  const img = abs(image || '/images/projects/f1-strategy-lab/og.jpg');
  const head = [
    `<title>${esc(title)}</title>`,
    `<meta data-rh="true" name="description" content="${esc(description)}">`,
    `<link data-rh="true" rel="canonical" href="${esc(url)}">`,
    `<meta data-rh="true" property="og:type" content="${type}">`,
    `<meta data-rh="true" property="og:site_name" content="yigitc.tech">`,
    `<meta data-rh="true" property="og:title" content="${esc(title)}">`,
    `<meta data-rh="true" property="og:description" content="${esc(description)}">`,
    `<meta data-rh="true" property="og:url" content="${esc(url)}">`,
    `<meta data-rh="true" property="og:image" content="${esc(img)}">`,
    `<meta data-rh="true" name="twitter:card" content="summary_large_image">`,
    `<meta data-rh="true" name="twitter:title" content="${esc(title)}">`,
    `<meta data-rh="true" name="twitter:description" content="${esc(description)}">`,
    `<meta data-rh="true" name="twitter:image" content="${esc(img)}">`,
    jsonLd ? `<script data-rh="true" type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>` : '',
  ].join('');
  // strip template defaults that the per-route head replaces
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace(/<meta[^>]+(name="description"|property="og:[^"]+"|name="twitter:[^"]+")[^>]*>/g, '');
  html = html.replace('</head>', `${head}</head>`);
  if (route === '/') {
    fs.writeFileSync(path.join(build, 'index.html'), html);
    return;
  }
  // GitHub Pages serves /a/b from a/b.html (200, no redirect); a/b/index.html covers /a/b/
  fs.mkdirSync(path.join(build, route), { recursive: true });
  fs.writeFileSync(path.join(build, `${route}.html`), html);
  fs.writeFileSync(path.join(build, route, 'index.html'), html);
}

const routes = [];
const add = (r, lastmod) => routes.push({ loc: SITE + (r === '/' ? '/' : r), lastmod: lastmod || today });

const homeMeta = {
  route: '/',
  title: 'Yiğit Çelik — Backend, Applied AI & Sign CAD',
  description:
    'Portfolio of Yiğit Çelik: backend systems (auth, queues), applied AI & decision science (OR-Tools, AHP/TOPSIS, F1 analytics) and parametric sign CAD with photoreal renders.',
  type: 'profile',
  jsonLd: person,
};
render(homeMeta);
add('/');

render({
  route: '/projects',
  title: 'Projects — Yiğit Çelik',
  description: 'Sign design & parametric CAD, applied AI / decision science and backend systems projects by Yiğit Çelik.',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Projects — Yiğit Çelik',
    url: `${SITE}/projects`,
    hasPart: projects.map((p) => ({ '@type': 'CreativeWork', name: p.title, url: `${SITE}/projects/${p.slug}` })),
  },
});
add('/projects');

for (const p of projects) {
  const cat = categories.find((c) => c.slug === p.category);
  const gh = p.links.find((l) => l.url.includes('github.com'));
  render({
    route: `/projects/${p.slug}`,
    title: `${p.title} — Yiğit Çelik`,
    description: p.summary,
    image: p.ogImage || p.cover,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': gh ? 'SoftwareSourceCode' : 'CreativeWork',
      name: p.title,
      headline: p.title,
      description: p.summary,
      url: `${SITE}/projects/${p.slug}`,
      image: abs(p.ogImage || p.cover),
      keywords: p.tags.join(', '),
      genre: cat ? cat.label : undefined,
      ...(p.date ? { dateCreated: p.date } : {}),
      author: { '@type': 'Person', name: 'Yiğit Çelik', url: SITE },
      ...(gh ? { codeRepository: gh.url } : {}),
    },
  });
  add(`/projects/${p.slug}`, p.date);
}

render({ route: '/blog', title: 'Writing — Yiğit Çelik', description: 'Postmortems and notes on backend architecture, local LLMs and systems engineering.' });
add('/blog');

const blogDir = path.join(root, 'src/blog');
for (const f of fs.readdirSync(blogDir).filter((x) => x.endsWith('.md'))) {
  const slug = f.replace(/\.md$/, '');
  const text = fs.readFileSync(path.join(blogDir, f), 'utf8');
  const fm = (text.match(/^---\n([\s\S]*?)\n---/) || [])[1] || '';
  const get = (k) => ((fm.match(new RegExp(`^${k}:\\s*"?([^"\\n]*)"?`, 'm')) || [])[1] || '').trim();
  const title = get('title') || slug.replace(/[-_]/g, ' ');
  const body = text.replace(/^---[\s\S]*?---/, '').replace(/[#>*`_\[\]()!|-]/g, ' ').replace(/\s+/g, ' ').trim();
  render({
    route: `/blog/${slug}`,
    title: `${title} — Yiğit Çelik`,
    description: body.slice(0, 155),
    type: 'article',
    jsonLd: { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: title, url: `${SITE}/blog/${slug}`, author: { '@type': 'Person', name: 'Yiğit Çelik', url: SITE } },
  });
  add(`/blog/${slug}`);
}

// SPA fallback for unknown paths (GitHub Pages serves 404.html with status 404)
fs.writeFileSync(path.join(build, '404.html'), fs.readFileSync(path.join(build, 'index.html'), 'utf8'));

const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  routes.map((r) => `  <url><loc>${r.loc}</loc><lastmod>${r.lastmod}</lastmod></url>`).join('\n') +
  '\n</urlset>\n';
fs.writeFileSync(path.join(build, 'sitemap.xml'), sitemap);
console.log(`postbuild: ${routes.length} routes pre-rendered (meta only), sitemap.xml + 404.html written`);
