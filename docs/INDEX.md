# Documentation Index

Welcome to the MC COLLO documentation. This index helps you find the right guide for your needs.

## 📚 Documentation Files

### Core Documentation

| Document | Purpose | Who Should Read |
|----------|---------|-----------------|
| [README.md](../README.md) | Project overview, quick start, features | Everyone |
| [CUSTOMIZATION.md](./CUSTOMIZATION.md) | How to modify content, styles, components | Developers, Content editors |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Deploy to Vercel, Netlify, Docker, etc. | Developers, DevOps |
| [MAINTENANCE.md](./MAINTENANCE.md) | Updates, monitoring, troubleshooting | Developers, Site owners |
| [EMAILJS_SETUP.md](./EMAILJS_SETUP.md) | Step-by-step EmailJS configuration | Developers |

---

## Quick Reference

### I want to...

#### Get Started
→ Read [README.md](../README.md) - Quick Start section

#### Change Colors/Branding
→ See [CUSTOMIZATION.md](./CUSTOMIZATION.md) - Visual Customization

#### Update Content (text, images)
→ See [CUSTOMIZATION.md](./CUSTOMIZATION.md) - Content Updates

#### Set Up Contact Form
→ See [EMAILJS_SETUP.md](./EMAILJS_SETUP.md) - EmailJS step-by-step guide

#### Deploy the Website
→ See [DEPLOYMENT.md](./DEPLOYMENT.md) - Choose your platform

#### Fix a Bug
→ See [MAINTENANCE.md](./MAINTENANCE.md) - Troubleshooting

#### Add New Features
→ See [CUSTOMIZATION.md](./CUSTOMIZATION.md) - Advanced Customization

#### Monitor Performance
→ See [MAINTENANCE.md](./MAINTENANCE.md) - Performance Monitoring

---

## File Structure Reference

```
mc-collo/
├── README.md                 # Main documentation
├── docs/                     # Additional documentation
│   ├── CUSTOMIZATION.md     # How to customize
│   ├── DEPLOYMENT.md        # How to deploy
│   ├── EMAILJS_SETUP.md     # EmailJS step-by-step setup
│   ├── MAINTENANCE.md       # How to maintain
│   └── INDEX.md             # This file
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── api/contact/     # Form submission API route (security checks)
│   │   ├── privacy-policy/  # Privacy Policy page
│   │   └── terms-of-service/ # Terms of Service page
│   ├── components/          # React components
│   └── lib/                 # Utilities (security.ts, emailjs.ts, utils.ts)
├── public/                  # Static assets
├── .github/workflows/       # CI/CD pipeline
├── package.json             # Dependencies
├── tailwind.config.ts       # Styling config
└── .env.local               # Environment variables (DO NOT COMMIT)
```

---

## Component Reference

### Layout Components

| Component | File | Description |
|-----------|------|-------------|
| Navigation | `sections/Navigation.tsx` | Sticky header with mobile menu |
| Footer | `sections/Footer.tsx` | Site footer with links |

### Section Components

| Component | File | Description |
|-----------|------|-------------|
| Hero | `sections/Hero.tsx` | Landing section with stats |
| About | `sections/About.tsx` | Bio and values |
| Services | `sections/Services.tsx` | Service offerings |
| Portfolio | `sections/Portfolio.tsx` | Event gallery |
| Testimonials | `sections/Testimonials.tsx` | Client reviews |
| SocialCommunity | `sections/SocialCommunity.tsx` | Social media links section |
| Contact | `sections/Contact.tsx` | Booking form (with security: honeypot, rate limiting, time validation) |

### Page Routes

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.tsx` | Homepage (all sections) |
| `/404` | `app/not-found.tsx` | Custom 404 page with countdown |
| `/privacy-policy` | `app/privacy-policy/page.tsx` | Privacy Policy (Kenya DPA compliant) |
| `/terms-of-service` | `app/terms-of-service/page.tsx` | Terms of Service |
| `/api/contact` | `app/api/contact/route.ts` | Form submission API (rate limiting, honeypot, time check) |

### UI Components

| Component | File | Description |
|-----------|------|-------------|
| Button | `ui/Button.tsx` | Styled button variants |
| Card | `ui/Card.tsx` | Card containers |
| Input | `ui/Input.tsx` | Form inputs |

---

## Common Tasks Cheat Sheet

### Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Check for issues
npm run lint
```

### Content Updates

1. Edit component in `src/components/sections/`
2. Save file (dev server auto-reloads)
3. Test at http://localhost:3000
4. Commit changes: `git commit -m "Update content"`
5. Deploy: `git push` (if using Vercel)

### Deploy Updates

```bash
# Vercel (automatic with git push)
git push

# Manual deploy
vercel --prod

# Check build
npm run build
```

### Environment Variables

```bash
# Create .env.local (DO NOT COMMIT)
cp .env.local.example .env.local

# Edit with your EmailJS credentials
# NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xyz
# NEXT_PUBLIC_EMAILJS_NOTIFICATION_TEMPLATE_ID=template_notification
# NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID=template_confirmation
# NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=user_def
```

### Security Features

The contact form includes three layers of protection:

1. **Honeypot Field** — Hidden field that bots fill but humans don't see
2. **Time Validation** — Rejects submissions made in under 3 seconds
3. **Rate Limiting** — Maximum 3 submissions per IP per hour

All checks run server-side at `/api/contact`.

---

## External Resources

### Official Documentation

- [Next.js](https://nextjs.org/docs)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript](https://www.typescriptlang.org/docs/)

### Tools & Services

- [EmailJS](https://www.emailjs.com/docs/)
- [Vercel](https://vercel.com/docs)
- [Google Fonts](https://fonts.google.com/)
- [Lucide Icons](https://lucide.dev/icons/)

### Learning Resources

- [Next.js Learn](https://nextjs.org/learn)
- [Tailwind UI](https://tailwindui.com/)
- [Framer Motion Tutorials](https://www.framer.com/motion/tutorials/)

---

## Version Information

| Package | Version | Last Updated |
|---------|---------|--------------|
| Next.js | 14.2.x | April 2026 |
| React | 18.3.x | April 2026 |
| Tailwind CSS | 3.4.x | April 2026 |
| Framer Motion | 11.15.x | April 2026 |
| TypeScript | 5.7.x | April 2026 |
| EmailJS | 4.4.x | April 2026 |

Check for updates: `npm outdated`

---

## Getting Help

### Documentation Didn't Help?

1. **Check Troubleshooting**: See [MAINTENANCE.md](./MAINTENANCE.md) - Troubleshooting
2. **Search Issues**: [GitHub Next.js Issues](https://github.com/vercel/next.js/issues)
3. **Ask Community**: [Next.js Discord](https://nextjs.org/discord)
4. **Stack Overflow**: Tag with `nextjs`, `react`, `tailwindcss`

### Report Documentation Issues

If you find errors or gaps in this documentation:
- Create an issue in your project tracker
- Submit a pull request with corrections
- Note the file and section that needs updating

---

## Documentation Changelog

### April 2026
- Added EMAILJS_SETUP.md with dual-template guide
- Added /privacy-policy and /terms-of-service pages
- Added security documentation (honeypot, rate limiting, CSP headers)
- Added /api/contact API route documentation
- Updated DEPLOYMENT.md with correct environment variables
- Updated INDEX.md with new pages, routes, and security features
- Updated all dates to April 2026

### March 2026
- Created comprehensive documentation suite
- Added customization guide
- Added deployment guide
- Added maintenance guide

---

**Need to update this index?** Edit `docs/INDEX.md`

**Last Updated**: April 2026
