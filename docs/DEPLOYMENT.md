# Deployment Guide

Complete guide for deploying MC COLLO to production.

## Prerequisites

- ✅ Git installed
- ✅ GitHub account (for Vercel/Netlify)
- ✅ EmailJS account configured
- ✅ Node.js 18+ installed

---

## Option 1: Vercel (Recommended)

Vercel is the easiest way to deploy Next.js apps. Created by the same team.

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit"

# Create repo on GitHub, then:
git remote add origin https://github.com/yourusername/mc-collo.git
git push -u origin main
```

### Step 2: Deploy to Vercel

**Via Dashboard**:

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **Add New Project**
4. Import your `mc-collo` repository
5. Configure:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (default)

6. Add Environment Variables:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xyz
   NEXT_PUBLIC_EMAILJS_NOTIFICATION_TEMPLATE_ID=template_notification
   NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID=template_confirmation
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=user_def
   ```

7. Click **Deploy**

**Via CLI**:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Step 3: Custom Domain (Optional)

1. Vercel Dashboard → Project Settings → Domains
2. Add your domain: `mccollo.com`
3. Update DNS records at your domain registrar:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

---

## Option 2: Netlify

### Step 1: Build Configuration

Netlify requires static export for Next.js:

Update `next.config.mjs`:

```typescript
const nextConfig = {
  output: 'export',  // Creates static HTML
  images: {
    unoptimized: true,  // Required for static export
  },
};
```

### Step 2: Deploy

**Via Netlify Dashboard**:

1. Go to [netlify.com](https://netlify.com)
2. Click **Add new site** → **Import an existing project**
3. Connect GitHub, select `mc-collo`
4. Build settings:
   - **Build Command**: `npm run build`
   - **Publish directory**: `out`
   - **Environment variables**: Add EmailJS vars

5. Click **Deploy**

**Via Netlify CLI**:

```bash
# Install CLI
npm i -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy --prod
```

---

## Option 3: AWS Amplify

### Step 1: Connect Repository

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Click **Connect app**
3. Select GitHub repository
4. Configure build settings (auto-detected)

### Step 2: Environment Variables

In Amplify Console:
- App settings → Environment variables
- Add EmailJS variables

### Step 3: Deploy

Amplify auto-deploys on every push to main branch.

---

## Option 4: Docker

### Create Dockerfile

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Build and Run

```bash
# Build image
docker build -t mc-collo .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xyz \
  -e NEXT_PUBLIC_EMAILJS_NOTIFICATION_TEMPLATE_ID=template_notification \
  -e NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID=template_confirmation \
  -e NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=user_def \
  mc-collo
```

### Deploy to Cloud

**Google Cloud Run**:

```bash
# Build for GCP
docker build -t gcr.io/your-project/mc-collo .

# Push
docker push gcr.io/your-project/mc-collo

# Deploy
gcloud run deploy mc-collo \
  --image gcr.io/your-project/mc-collo \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

---

## Option 5: Traditional Hosting (cPanel, etc.)

### Static Export

Update `next.config.mjs`:

```typescript
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
};
```

Build:

```bash
npm run build
```

Upload the `out` folder contents to your web server's public directory (usually `public_html` or `www`).

---

## Post-Deployment Checklist

### Environment Variables

Ensure these are set in your hosting platform:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xyz
NEXT_PUBLIC_EMAILJS_NOTIFICATION_TEMPLATE_ID=template_notification
NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID=template_confirmation
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=user_def
```

### Test Form Submission

1. Visit your live site
2. Fill out contact form
3. Check EmailJS dashboard for submission
4. Verify email received

### Performance Check

Run Lighthouse audit:

```bash
# In Chrome DevTools
# Lighthouse tab → Analyze page load
```

Target scores:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

### SEO Verification

1. Submit sitemap to Google Search Console
2. Add meta tags in `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'MC COLLO | Professional Master of Ceremonies',
  description: 'Your description here',
  openGraph: {
    title: 'MC COLLO',
    description: 'Your description',
    images: ['/og-image.png'],
  },
};
```

### Analytics (Optional)

Add Google Analytics:

1. Create `src/components/Analytics.tsx`:

```typescript
'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export function Analytics() {
  const GA_ID = 'G-XXXXXXXXXX';  // Your GA4 ID

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
```

2. Add to `src/app/layout.tsx`:

```typescript
import { Analytics } from '@/components/Analytics';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Analytics />
    </html>
  );
}
```

---

## CI/CD Setup

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_EMAILJS_SERVICE_ID: ${{ secrets.EMAILJS_SERVICE_ID }}
          NEXT_PUBLIC_EMAILJS_NOTIFICATION_TEMPLATE_ID: ${{ secrets.EMAILJS_NOTIFICATION_TEMPLATE_ID }}
          NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID: ${{ secrets.EMAILJS_CONFIRMATION_TEMPLATE_ID }}
          NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: ${{ secrets.EMAILJS_PUBLIC_KEY }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### Add Secrets to GitHub

Repository Settings → Secrets and variables → Actions:

```
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
EMAILJS_SERVICE_ID
EMAILJS_TEMPLATE_ID
EMAILJS_PUBLIC_KEY
```

---

## Troubleshooting

### Build Fails on Deployment

```bash
# Test build locally
npm run build

# Check for TypeScript errors
npx tsc --noEmit

# Check for lint errors
npm run lint
```

### Images Not Loading

- Ensure images are in `public/` folder
- Check image paths are absolute (`/images/photo.jpg`)
- For external images, update `next.config.mjs` remote patterns

### Environment Variables Not Working

- Prefix must be `NEXT_PUBLIC_` for client-side access
- Redeploy after adding new environment variables
- Check variable names match exactly (case-sensitive)

### 404 on Pages

- Next.js uses client-side routing
- Ensure server redirects all routes to `index.html`
- Vercel/Netlify handle this automatically

---

## Performance Optimization

### Enable Compression

Vercel/Netlify handle this automatically.

For custom servers, add to `next.config.mjs`:

```typescript
const nextConfig = {
  compress: true,
};
```

### CDN Configuration

Vercel includes global CDN by default.

For other hosts, configure Cloudflare:

1. Add your domain to Cloudflare
2. Update nameservers at domain registrar
3. Enable auto-minify in Cloudflare dashboard

### Caching Headers

For static hosts, add `_headers` file in `public/`:

```
/*
  Cache-Control: public, max-age=31536000, immutable
```

---

## Monitoring

### Uptime Monitoring

- [UptimeRobot](https://uptimerobot.com/) - Free tier available
- [Pingdom](https://www.pingdom.com/) - Premium option

### Error Tracking

Add Sentry:

```bash
npm install @sentry/nextjs
```

Follow setup wizard:

```bash
npx @sentry/wizard@latest -i nextjs
```

---

## Support

Issues with deployment?

1. Check deployment logs in hosting dashboard
2. Test build locally: `npm run build`
3. Verify environment variables
4. Review Next.js deployment docs: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)

---

**Last Updated**: March 2026
