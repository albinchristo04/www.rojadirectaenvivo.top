# 🚀 Deployment Guide - Rojadirecta En Vivo

## Prerequisites

- GitHub account
- Cloudflare account (free tier works)
- Node.js 20+

## Step 1: Cloudflare Setup

### Get Your API Credentials

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to **Profile** → **API Tokens**
3. Click **Create Token**
4. Choose **Edit Cloudflare Workers** template
5. Configure:
   - **Account Resources**: Edit
   - **Zone Resources**: None
6. Click **Continue to summary**
7. Copy the API Token (save it securely)

### Get Account ID

1. In Cloudflare Dashboard, look at the right sidebar
2. Copy your **Account ID**

## Step 2: GitHub Repository Setup

### Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit - Rojadirecta En Vivo"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/rojadirectaenvivo.top.git
git push -u origin main
```

### Add GitHub Secrets

Go to your repo → Settings → Secrets and variables → Actions

Add these secrets:

1. **CLOUDFLARE_API_TOKEN**
   - Value: The API token you copied from Cloudflare

2. **CLOUDFLARE_ACCOUNT_ID**
   - Value: Your Cloudflare Account ID

## Step 3: Manual First Deploy

### Option A: Using Wrangler CLI

```bash
npm install -g wrangler
wrangler login
npm run build
npx wrangler pages deploy dist --project-name=rojadirectaenvivo-top
```

### Option B: GitHub Actions (Automatic)

The workflow will automatically:
1. Run every 2 hours
2. Fetch latest match data
3. Build the site
4. Deploy to Cloudflare Pages

To trigger manually:
1. Go to repo → Actions
2. Select "Build & Deploy" workflow
3. Click "Run workflow"

## Step 4: Configure Custom Domain

### In Cloudflare Pages

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Select your project: `rojadirectaenvivo-top`
3. Go to **Custom domains** tab
4. Click **Set up a custom domain**
5. Enter: `rojadirectaenvivo.top`
6. Follow DNS configuration steps

### DNS Configuration

Add these records in your domain registrar:

```
Type: CNAME
Name: www
Value: rojadirectaenvivo-top.pages.dev
TTL: Auto
```

For root domain:
```
Type: A
Name: @
Value: [Cloudflare IP from dashboard]
```

## Step 5: Verify Deployment

After deployment:

1. ✅ Check homepage loads: `https://rojadirectaenvivo.top`
2. ✅ Verify SEO pages exist:
   - `/rojadirecta-en-vivo`
   - `/tarjeta-roja-hoy`
   - `/pirlo-tv-en-vivo`
   - `/futbol-en-vivo`
3. ✅ Test match pages load
4. ✅ Check sitemap: `/sitemap.xml`
5. ✅ Verify robots.txt: `/robots.txt`

## Step 6: Monitor & Maintain

### Check Build Logs

- GitHub → Actions → Latest workflow run
- Cloudflare Pages → Deployments → Latest deployment

### Update Frequency

- Site rebuilds every 2 hours automatically
- Manual trigger available anytime

### Performance Monitoring

Use:
- [Cloudflare Analytics](https://dash.cloudflare.com/)
- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)

## Troubleshooting

### Build Fails

**Error: Cannot find module**
```bash
npm ci
npm run build
```

**Error: Data fetch failed**
- Check JSON source URL is accessible
- Verify network access in GitHub Actions

### Deployment Issues

**Cloudflare authentication failed**
- Regenerate API token
- Ensure token has Workers edit permissions
- Verify Account ID is correct

**Pages not indexing**
- Check robots.txt allows crawling
- Verify sitemap.xml is valid
- Submit sitemap to Bing Webmaster Tools

## Scaling to Subdomains

Once main domain is working:

1. Duplicate project in Cloudflare Pages
2. Point subdomain to new project:
   - `futbol.rojadirectaenvivo.top`
   - `tv.rojadirectaenvivo.top`
   - `pirlo.rojadirectaenvivo.top`
3. Slightly vary content per subdomain

## Success Checklist

- [ ] Main domain deployed successfully
- [ ] Homepage loads (< 2s)
- [ ] All SEO keyword pages exist
- [ ] Match pages generate correctly
- [ ] Sitemap submitted to Bing
- [ ] Robots.txt configured properly
- [ ] GitHub Actions running every 2h
- [ ] Custom domain DNS propagated
- [ ] HTTPS enabled (automatic with Cloudflare)

---

**Need help?** Check the README.md or open an issue on GitHub.
