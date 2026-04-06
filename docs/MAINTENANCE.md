# Maintenance & Updates Guide

Keep your MC COLLO website secure, performant, and up-to-date.

## Table of Contents

1. [Regular Maintenance](#regular-maintenance)
2. [Updating Dependencies](#updating-dependencies)
3. [Content Updates](#content-updates)
4. [Performance Monitoring](#performance-monitoring)
5. [Security Best Practices](#security-best-practices)
6. [Backup Strategy](#backup-strategy)
7. [Troubleshooting](#troubleshooting)

---

## Regular Maintenance

### Weekly Tasks

- [ ] Test contact form submission
- [ ] Check EmailJS dashboard for failed deliveries
- [ ] Review analytics for unusual traffic patterns
- [ ] Verify all external links work

### Monthly Tasks

- [ ] Run Lighthouse audit
- [ ] Check for dependency updates
- [ ] Review and update portfolio items
- [ ] Test on different devices/browsers
- [ ] Check page load speeds

### Quarterly Tasks

- [ ] Update testimonials
- [ ] Refresh hero images
- [ ] Review SEO performance
- [ ] Update copyright year in footer
- [ ] Audit accessibility

---

## Updating Dependencies

### Check for Updates

```bash
# See available updates
npm outdated

# Check for security vulnerabilities
npm audit
```

### Update Dependencies

**Safe Updates** (patch/minor):

```bash
# Update all safe versions
npm update

# Update specific package
npm update framer-motion
```

**Major Updates** (breaking changes possible):

```bash
# Update one package to latest
npm install next@latest

# Update all packages (use with caution)
npm install @latest
```

### Recommended Update Schedule

| Package | Frequency | Notes |
|---------|-----------|-------|
| Next.js | Quarterly | Check changelog for breaking changes |
| React | Quarterly | Major updates require testing |
| Tailwind CSS | Bi-annually | Stable, low-risk updates |
| Framer Motion | Bi-annually | Test animations after update |
| EmailJS | As needed | Critical for form functionality |

### After Updates

```bash
# Clear cache
rm -rf .next node_modules
npm install

# Rebuild
npm run build

# Test locally
npm run dev
```

---

## Content Updates

### Add New Portfolio Item

File: `src/components/sections/Portfolio.tsx`

```typescript
const portfolioItems = [
  {
    id: 7,  // New unique ID
    title: 'Your New Event',
    category: 'Wedding',  // Must match filter categories
    location: 'Venue, City',
    date: '2026',
    guests: '200+',
    image: '/images/new-event.jpg',
    description: 'Event description',
  },
  // ...existing items
];
```

### Update Testimonials

File: `src/components/sections/Testimonials.tsx`

```typescript
const testimonials = [
  {
    id: 6,
    name: 'New Client Name',
    role: 'Event Type',
    image: '/images/client.jpg',
    rating: 5,
    content: ' testimonial text...',
    event: 'Event Name',
  },
];
```

### Change Availability Status

File: `src/components/sections/Contact.tsx`

```typescript
<p className="text-dark-400 text-sm mb-3">
  Currently accepting bookings for 2026-2027.  // ← Update years
</p>
```

### Update Stats

File: `src/components/sections/Hero.tsx`

```typescript
[
  { icon: Award, label: 'Years Experience', value: '12+' },  // ← Update
  { icon: Users, label: 'Happy Clients', value: '1200+' },   // ← Update
  { icon: Calendar, label: 'Events Hosted', value: '950+' }, // ← Update
]
```

---

## Performance Monitoring

### Lighthouse Audit

**Chrome DevTools**:

1. Open site in Chrome
2. Right-click → Inspect
3. Lighthouse tab
4. Analyze page load

**Target Scores**:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

### Core Web Vitals

Monitor in Google Search Console:

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Performance Tips

**Image Optimization**:

```typescript
// Use Next.js Image component
import Image from 'next/image';

<Image
  src="/photo.jpg"
  alt="Description"
  width={800}
  height={600}
  loading="lazy"  // Lazy load
  quality={75}    // Compress
/>
```

**Reduce Animation Complexity**:

```typescript
// Reduce on mobile
@media (max-width: 640px) {
  .complex-animation {
    animation: none;
  }
}
```

---

## Security Best Practices

### Environment Variables

Never commit sensitive data:

```bash
# .env.local (gitignored)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xyz
NEXT_PUBLIC_EMAILJS_NOTIFICATION_TEMPLATE_ID=template_notification
NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID=template_confirmation
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=user_def
```

```typescript
// ✅ Good - uses env variable
const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;

// ❌ Bad - hardcoded
const serviceId = 'service_xyz';
```

### Dependencies Security

```bash
# Check for vulnerabilities
npm audit

# Auto-fix safe vulnerabilities
npm audit fix

# Fix all (may break things)
npm audit fix --force
```

### HTTPS

Ensure your hosting uses HTTPS:
- Vercel: Automatic
- Netlify: Automatic
- Custom: Configure SSL certificate

### Security Headers

Security headers are configured in `next.config.mjs`:

| Header | Value | Purpose |
|---|---|---|
| `X-Content-Type-Options` | `nosniff` | Prevents MIME type sniffing |
| `X-Frame-Options` | `DENY` | Prevents clickjacking |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Controls referrer info |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Forces HTTPS for 2 years |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=()` | Blocks sensitive browser APIs |
| `Content-Security-Policy` | Whitelisted sources only | Prevents XSS and data exfiltration |

### Form Security

The contact form at `/api/contact` includes three layers of protection:

1. **Honeypot Field** — A hidden `website` field that bots fill but humans don't see. If filled, the submission is silently discarded.
2. **Time Validation** — Submissions made in under 3 seconds are rejected (bots submit instantly).
3. **Rate Limiting** — Maximum 3 submissions per IP per hour. Configured in `src/lib/security.ts`.

To adjust rate limits, edit `src/lib/security.ts`:

```typescript
const MAX_SUBMISSIONS = 3;        // Max attempts per window
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
```

For production-grade rate limiting (persists across serverless cold starts), consider using [Upstash Redis](https://upstash.com/) (free tier: 10k ops/day).

---

## Backup Strategy

### What to Backup

- ✅ All source code (`src/` folder)
- ✅ Configuration files (`*.json`, `*.ts`, `*.mjs`)
- ✅ Public assets (`public/` folder)
- ✅ Documentation (`docs/`, `README.md`)
- ❌ `node_modules/` (can be reinstalled)
- ❌ `.next/` (build artifact)
- ❌ `.env.local` (store secrets separately)

### Backup Methods

**Git (Recommended)**:

```bash
# Commit regularly
git add .
git commit -m "Update portfolio section"
git push origin main

# Create version tags
git tag -a v1.2.0 -m "March 2026 update"
git push origin v1.2.0
```

**Cloud Backup**:

Use services like:
- GitHub/GitLab (code)
- Google Drive/Dropbox (assets)
- Vercel (automatic deployment backups)

### Backup Schedule

- **Daily**: Git commits during active development
- **Weekly**: Tagged releases
- **Monthly**: Full backup verification

---

## Troubleshooting

### Common Issues

**Build Fails**:

```bash
# Clear cache
rm -rf .next node_modules package-lock.json
npm install
npm run build

# Check for TypeScript errors
npx tsc --noEmit

# Check for lint errors
npm run lint
```

**Form Not Sending**:

1. Check EmailJS credentials in `.env.local`
2. Verify template variables match form fields
3. Check EmailJS dashboard for errors
4. Test with demo mode (remove credentials temporarily)

**Images Not Loading**:

```typescript
// Check image path
<Image src="/images/photo.jpg" ... />  // ✅ Correct - absolute path
<Image src="images/photo.jpg" ... />   // ❌ Wrong - relative path

// For external images, update next.config.mjs
images: {
  remotePatterns: [{
    protocol: 'https',
    hostname: 'your-cdn.com',
  }],
}
```

**Animations Not Working**:

1. Check Framer Motion is installed: `npm list framer-motion`
2. Ensure component has `'use client'` directive
3. Check browser console for errors
4. Test with reduced motion disabled

**Styles Not Applying**:

```bash
# Restart dev server
# Ctrl+C
npm run dev

# Clear Next.js cache
rm -rf .next
```

### Debug Mode

Add to components for debugging:

```typescript
'use client';

export function MyComponent() {
  console.log('Component rendered', { props });
  
  return (
    <div className="border-2 border-red-500">  // Visual debug
      Content
    </div>
  );
}
```

---

## Version History

Keep a changelog in `CHANGELOG.md`:

```markdown
# Changelog

## [1.2.0] - 2026-03-28
### Added
- New portfolio items
- Testimonial carousel auto-play

### Changed
- Updated hero section stats
- Improved form validation

### Fixed
- Mobile navigation bug
- Image loading on slow connections

## [1.1.0] - 2026-02-15
### Added
- EmailJS integration
- Portfolio filter

## [1.0.0] - 2026-01-01
### Added
- Initial release
```

---

## Monitoring Tools

### Free Tier Options

| Tool | Purpose | Link |
|------|---------|------|
| Google Analytics | Traffic analytics | [analytics.google.com](https://analytics.google.com) |
| Google Search Console | SEO monitoring | [search.google.com](https://search.google.com/search-console) |
| UptimeRobot | Uptime monitoring | [uptimerobot.com](https://uptimerobot.com) |
| Lighthouse | Performance audits | Built into Chrome |

### Setup Google Analytics

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to `src/components/Analytics.tsx`
4. Deploy and verify in Real-Time view

---

## Seasonal Updates

### Update Copyright Year

File: `src/components/sections/Footer.tsx`

```typescript
const currentYear = new Date().getFullYear();  // Auto-updates

<p>© {currentYear} MC COLLO. All rights reserved.</p>
```

### Holiday Hours/Availability

Add banner component:

```typescript
// src/components/ui/Banner.tsx
export function Banner({ message }: { message: string }) {
  return (
    <div className="bg-primary-500 text-white text-center py-2">
      {message}
    </div>
  );
}
```

Use in layout:

```typescript
import { Banner } from '@/components/ui/Banner';

<Banner message="🎄 Booking holiday events - Limited availability!" />
```

---

## Support Resources

### Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [EmailJS](https://www.emailjs.com/docs/)

### Communities

- [Next.js Discord](https://nextjs.org/discord)
- [Tailwind CSS Discord](https://tailwindcss.com/discord)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/nextjs)
- [GitHub Discussions](https://github.com/vercel/next.js/discussions)

---

## Maintenance Checklist Template

Copy this for each maintenance session:

```markdown
## Maintenance Date: YYYY-MM-DD

### Completed
- [ ] Tested contact form
- [ ] Checked EmailJS deliveries
- [ ] Ran Lighthouse audit (Score: __)
- [ ] Updated dependencies
- [ ] Backed up code
- [ ] Tested on mobile
- [ ] Verified analytics

### Issues Found
- [ ] None
- [ ] (List issues)

### Next Maintenance: YYYY-MM-DD
```

---

**Last Updated**: March 2026
