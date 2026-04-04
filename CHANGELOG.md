# Changelog

All notable changes to MC COLLO will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Blog section for event tips and insights
- Video showcase section for event highlights
- Multi-language support (i18n)
- Dark/light mode toggle
- Advanced analytics dashboard
- Integration with calendar booking systems

---

## [1.1.0] - 2026-04-03

### Added

#### Testing Infrastructure
- **Jest** testing framework setup with ts-jest
- **React Testing Library** for component testing
- Test examples for:
  - Button component (variants, sizes, disabled state)
  - Input, Textarea, Select components (labels, errors, refs)
  - Utility functions (cn, isValidEmail, formatDate, scrollToElement)
- Test scripts: `npm test`, `npm run test:watch`, `npm run test:coverage`
- Jest configuration with Next.js mocking

#### CI/CD Pipeline
- **GitHub Actions** workflow (`.github/workflows/ci.yml`)
- Automated checks on push/PR:
  - ESLint for code quality
  - TypeScript type checking
  - Next.js production build
  - Jest test suite with coverage
- Coverage report uploads as GitHub artifacts
- Windows-latest runners with Node.js 20

#### Error Handling
- **React Error Boundary** component (`src/components/ErrorBoundary.tsx`)
- User-friendly error fallback UI
- Development mode error details
- Global integration in root layout
- Automatic error logging to console

#### Analytics
- **Vercel Analytics** integration
- Automatic visitor tracking when deployed
- Zero configuration required
- Dashboard available at vercel.com

#### Form Improvements
- **Next.js Server Actions** (`src/app/actions.ts`)
- **Zod validation** schema for robust server-side validation
- Dual submission method support:
  - Server Action (recommended, primary)
  - EmailJS (fallback, toggle available)
- Better loading states with `useTransition` hook
- `Loader2` spinner from lucide-react
- Disabled form inputs during submission
- Improved error messaging and feedback
- Form submission method toggle button

#### Custom Hooks
- `useScrollPosition` - Track scroll position with threshold detection
- `useInView` - Viewport detection using IntersectionObserver
- Hook exports via `src/hooks/index.ts`

### Changed

#### Dependencies Added
**Production:**
- `@vercel/analytics@^1.4.1` - Analytics tracking
- `zod@^3.24.1` - Schema validation

**Development:**
- `jest@^29.7.0` - Testing framework
- `ts-jest@^29.2.5` - TypeScript for Jest
- `jest-environment-jsdom@^29.7.0` - DOM simulation
- `@testing-library/react@^16.1.0` - React testing
- `@testing-library/jest-dom@^6.6.3` - Custom matchers
- `@testing-library/user-event@^14.5.2` - User interactions
- `@types/jest@^29.5.14` - TypeScript types

#### Project Structure
- Moved media files from root to `/public/assets/`:
  - `lonewolf.mp4` → `public/assets/lonewolf.mp4`
  - `new wolf.jpg` → `public/assets/new wolf.jpg`
  - `wolf.png` → `public/assets/wolf.png`

#### Documentation
- Updated README.md with new sections:
  - What's New (comprehensive changelog)
  - CI/CD Pipeline documentation
  - Testing troubleshooting
- Updated tech stack table with new tools
- Added new scripts documentation

### Technical Details
- Server Actions provide better security (server-side validation)
- EmailJS kept as fallback for flexibility
- Error Boundary catches runtime errors globally
- Test coverage threshold set to 50%
- CI/CD pipeline runs on Windows to match dev environment

## [1.0.0] - 2026-03-28

### Added
- **Initial Release** of MC COLLO landing page
- Complete responsive design with mobile-first approach
- Premium dark theme with electric blue/cyan accents
- Framer Motion animations throughout

#### Sections
- Hero section with animated background and trust indicators
- About section with personal bio and values
- Services section with 6 service cards
- Portfolio gallery with category filtering
- Testimonials carousel with auto-play
- Contact section with EmailJS integration
- Footer with social links and navigation

#### Features
- Sticky navigation with mobile hamburger menu
- Smooth scroll navigation
- Contact form with validation
- EmailJS integration for form submissions
- Fully responsive design (mobile, tablet, desktop)
- SEO optimized with meta tags and Open Graph
- Accessibility features (ARIA labels, keyboard navigation)
- Custom Tailwind CSS theme with branded colors
- Google Fonts integration (Inter, Playfair Display)

#### Documentation
- Comprehensive README.md
- Customization guide (docs/CUSTOMIZATION.md)
- Deployment guide (docs/DEPLOYMENT.md)
- Maintenance guide (docs/MAINTENANCE.md)
- Documentation index (docs/INDEX.md)
- Environment variables template (.env.local.example)

#### Technical Stack
- Next.js 14.2 with App Router
- React 18.3
- TypeScript 5.7
- Tailwind CSS 3.4
- Framer Motion 11.15
- Lucide React icons
- EmailJS for form handling

### Technical Details
- Static site generation for optimal performance
- Client-side animations with Framer Motion
- Form validation with error handling
- Image optimization with Next.js Image
- Custom scrollbar styling
- Reduced motion support for accessibility

---

## Version History Summary

| Version | Date | Description |
|---------|------|-------------|
| 1.1.0 | 2026-04-03 | Testing, CI/CD, Error Boundary, Analytics, Form improvements |
| 1.0.0 | 2026-03-28 | Initial release |

---

## Migration Guide

### From v1.0.0 to Future Versions

Check the releases page for migration guides when updating to new major versions.

---

## Breaking Changes

### v1.0.0
- None (initial release)

---

## Known Issues

### v1.0.0
- None reported at initial release

---

## Contributors

- Initial development and release

---

**Need to add a change?** Update this file following the Keep a Changelog format.

**Last Updated**: March 28, 2026
