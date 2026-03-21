# 📺 Rojadirecta En Vivo - Programmatic SEO Sports Streaming

High-volume programmatic SEO sports streaming aggregator targeting Spanish football keywords.

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## 🏗️ Architecture

```
GitHub JSON → GitHub Actions (Every 2h) → Astro Build → Cloudflare Pages
```

## 📁 Project Structure

```
/
├── src/
│   ├── pages/
│   │   ├── index.astro              # Homepage
│   │   ├── partido/
│   │   │   └── [team1]-vs-[team2]-[id].astro  # Match pages (noindex)
│   │   ├── seo/
│   │   │   └── [keyword].astro      # SEO keyword pages
│   │   └── sitemap.xml.js           # Auto-generated sitemap
│   ├── components/
│   │   ├── MatchCard.astro          # Match display card
│   │   ├── MultiIframePlayer.tsx    # React player component
│   │   └── InternalLinkBlock.astro  # Aggressive internal linking
│   ├── layouts/
│   │   └── BaseLayout.astro         # Base HTML template
│   └── styles/
│       └── global.css               # Tailwind + custom styles
├── scripts/
│   └── fetch-data.js                # Data fetching script
├── data/
│   └── matches.json                 # Fetched match data
├── public/
│   ├── robots.txt                   # SEO configuration
│   └── favicon.svg                  # Site favicon
├── .github/
│   └── workflows/
│       └── build-deploy.yml         # Automated deployment
└── package.json
```

## 🎯 SEO Strategy

### Core Keywords
- rojadirecta en vivo
- tarjeta roja hoy
- pirlo tv en vivo
- fútbol en vivo gratis
- ver fútbol online

### Page Types

1. **Homepage** (/)
   - Today's matches
   - Keyword links
   - Fresh content (updated every 2h)

2. **SEO Keyword Pages** (/rojadirecta-en-vivo, etc.)
   - Long-form content (300-800 words)
   - Embedded matches
   - Heavy internal linking

3. **Match Pages** (/partido/{team1}-vs-{team2}-{id})
   - NOT indexed (noindex, follow)
   - Multiple iframe players
   - Channel switcher

4. **Long-tail Pages** (Auto-generated)
   - Team-specific
   - League-specific
   - Date-specific

## 🔗 Internal Linking

The `InternalLinkBlock` component creates aggressive internal linking:
- 8 core keyword links
- 100+ long-tail keyword links
- Footer spam block (50-100 links)

## 🎥 Player System

Multi-iframe player with channel switching:
- Default: First iframe
- On click: Replace iframe source
- Shows number of available channels
- Lazy loading enabled

## ⚙️ GitHub Actions Automation

Runs every 2 hours:
1. Fetch JSON from data source
2. Parse matches
3. Generate static pages
4. Build Astro site
5. Deploy to Cloudflare Pages

## 🌐 Deployment

### Cloudflare Pages Setup

1. Create Cloudflare account
2. Get API Token and Account ID
3. Add secrets to GitHub repo:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`

### Manual Deploy

```bash
npm run build
npx wrangler pages deploy dist
```

## 📊 Data Source

Matches are fetched from:
```
https://raw.githubusercontent.com/albinchristo04/ptv/refs/heads/main/futbollibre.json
```

## 🎨 Design

- Dark theme (purple/pink gradient)
- Compact layout
- Mobile responsive
- Heavy link density (PirloTV style)

## ⚡ Performance

- Static site generation (fast TTFB)
- CDN delivery (Cloudflare)
- Lazy loaded iframes
- Minified HTML/CSS

## ⚠️ Risk Management

This is an aggressive SEO model:
- Domains may get deindexed
- Keep backup domains ready
- Same repo → quick redeployment

## 📈 Scaling Plan

### Phase 1
- Launch main domain
- Index 10-20 SEO pages

### Phase 2
- Add subdomains:
  - www.rojadirectaenvivo.top
  - futbol.rojadirectaenvivo.top
  - tv.rojadirectaenvivo.top
  - pirlo.rojadirectaenvivo.top

### Phase 3
- Expand to 1000+ long-tail pages

## 🔑 Success Factors

1. ✅ Massive internal linking
2. ✅ Fresh content every 2 hours
3. ✅ High page count
4. ✅ Fast loading (CDN + static)
5. ✅ Spanish keyword density (2-3%)

## 🛠️ Tech Stack

- **Frontend**: Astro + React + Tailwind CSS
- **Hosting**: Cloudflare Pages
- **CI/CD**: GitHub Actions
- **Data**: Static JSON

## 📝 License

MIT

## ⚠️ Disclaimer

This project is for educational purposes only. We do not host any video content. All videos are hosted on third-party servers.

---

**Built for Bing ranking domination** 🚀
