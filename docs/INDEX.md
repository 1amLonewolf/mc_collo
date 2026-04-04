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
→ See [README.md](../README.md) - EmailJS Integration

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
│   ├── MAINTENANCE.md       # How to maintain
│   └── INDEX.md             # This file
├── src/
│   ├── app/                 # Next.js app router
│   ├── components/          # React components
│   └── lib/                 # Utilities
├── public/                  # Static assets
├── package.json             # Dependencies
├── tailwind.config.ts       # Styling config
└── .env.local.example       # Environment variables template
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
| Contact | `sections/Contact.tsx` | Booking form |

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
# Create .env.local
cp .env.local.example .env.local

# Edit with your values
# NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
# NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
# NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
```

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
| Next.js | 14.2.x | March 2026 |
| React | 18.3.x | March 2026 |
| Tailwind CSS | 3.4.x | March 2026 |
| Framer Motion | 11.15.x | March 2026 |
| TypeScript | 5.7.x | March 2026 |

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

### March 2026
- Created comprehensive documentation suite
- Added customization guide
- Added deployment guide
- Added maintenance guide

---

**Need to update this index?** Edit `docs/INDEX.md`

**Last Updated**: March 2026
