# MC COLLO - Customization Guide

This guide helps you personalize every aspect of the MC COLLO landing page.

## Table of Contents

1. [Quick Customizations](#quick-customizations)
2. [Content Updates](#content-updates)
3. [Visual Customization](#visual-customization)
4. [Component Reference](#component-reference)
5. [Advanced Customization](#advanced-customization)

---

## Quick Customizations

### Change Contact Information

Update in **two places**:

1. `src/components/sections/Contact.tsx` (line ~180)
2. `src/components/sections/Footer.tsx` (line ~100)

```typescript
// Contact.tsx
<ContactInfoItem
  icon={Mail}
  label="Email"
  value="your-email@example.com"  // ← Change this
  href="mailto:your-email@example.com"
/>
```

### Update Social Media Links

`src/components/sections/Footer.tsx`:

```typescript
const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/yourhandle', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com/yourpage', label: 'Facebook' },
  // Add more...
];
```

### Change Hero Stats

`src/components/sections/Hero.tsx`:

```typescript
[
  { icon: Award, label: 'Years Experience', value: '10+' },  // ← Edit
  { icon: Users, label: 'Happy Clients', value: '500+' },    // ← Edit
  { icon: Calendar, label: 'Events Hosted', value: '800+' }, // ← Edit
]
```

---

## Content Updates

### Hero Section

File: `src/components/sections/Hero.tsx`

```typescript
// Badge text
<span>Professional MC for Unforgettable Events</span>

// Main headline
<h1>Your Event, <br />
  <span className="gradient-text">Perfectly Hosted</span>
</h1>

// Subheadline
<p>I give my absolute best so your event becomes unforgettable.</p>
```

### About Section

File: `src/components/sections/About.tsx`

```typescript
// Your bio
<p>With over a decade of experience...</p>

// Values
const values = [
  {
    icon: Mic,
    title: 'Professional Excellence',
    description: 'Your description here',
  },
  // Add more values
];
```

### Services Section

File: `src/components/sections/Services.tsx`

```typescript
const services = [
  {
    icon: Heart,              // Icon from lucide-react
    title: 'Wedding MC',      // Service name
    description: '...',       // Service description
    benefits: [               // Bullet points
      'Personalized ceremony scripting',
      'Reception coordination',
    ],
    gradient: 'from-pink-500/20 to-rose-500/20',  // Card gradient
    borderColor: 'border-pink-500/30',            // Border color
  },
  // Add more services
];
```

**Available Icons** (from lucide-react):
- `Heart`, `Building2`, `Sparkles`, `GraduationCap`
- `Music`, `Users`, `Mic`, `Calendar`, `Star`

### Portfolio Section

File: `src/components/sections/Portfolio.tsx`

```typescript
const portfolioItems = [
  {
    id: 1,
    title: 'Elegant Wedding Reception',
    category: 'Wedding',      // Used for filtering
    location: 'Grand Ballroom, NYC',
    date: '2024',
    guests: '250+',
    image: '/images/event1.jpg',  // Path to your image
    description: 'A magical evening...',
  },
  // Add more items
];
```

**Categories**: Wedding, Corporate, Gala, Conference, Private, Community

### Testimonials Section

File: `src/components/sections/Testimonials.tsx`

```typescript
const testimonials = [
  {
    id: 1,
    name: 'Sarah & Michael',
    role: 'Wedding Couple',
    image: '/images/client1.jpg',
    rating: 5,
    content: "Collo made our wedding day absolutely perfect!...",
    event: 'Wedding Reception',
  },
  // Add more testimonials
];
```

---

## Visual Customization

### Color Scheme

File: `tailwind.config.ts`

```typescript
colors: {
  // Change primary brand color
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    // ...
    500: '#0ea5e9',  // ← Main brand color
    // ...
  },
  
  // Change accent color
  accent: {
    400: '#22d3ee',
    500: '#06b6d4',  // ← Accent color
  },
}
```

**Color Tools**:
- [Tailwind Color Picker](https://uicolors.app/create)
- [Coolors](https://coolors.co/)

### Typography

File: `src/app/layout.tsx`

```typescript
// Change fonts
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
```

**Available Google Fonts**:
- [Inter alternatives](https://fonts.google.com/?query=sans+serif)
- [Playfair alternatives](https://fonts.google.com/?query=serif)

### Animations

File: `src/app/globals.css`

```css
/* Adjust animation speeds */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Change glow intensity */
.glow-effect::before {
  opacity: 0.5;  /* Adjust opacity */
}
```

Component-level animations (Framer Motion):

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.2 }}  // ← Adjust timing
>
```

---

## Component Reference

### Button Component

```typescript
import { Button } from '@/components/ui/Button';

<Button variant="primary" size="md">
  Click Me
</Button>
```

| Prop | Values | Default |
|------|--------|---------|
| `variant` | `primary`, `secondary`, `outline`, `ghost` | `primary` |
| `size` | `sm`, `md`, `lg` | `md` |

### Card Component

```typescript
import { Card } from '@/components/ui/Card';

<Card hoverEffect={true} glow={true}>
  Content here
</Card>
```

| Prop | Type | Default |
|------|------|---------|
| `hoverEffect` | boolean | `true` |
| `glow` | boolean | `false` |

### Form Inputs

```typescript
import { Input, Textarea, Select } from '@/components/ui/Input';

<Input 
  label="Name" 
  placeholder="Enter name"
  error={errors.name}
/>

<Textarea 
  label="Message" 
  rows={5}
/>

<Select 
  label="Event Type"
  options={[
    { value: 'wedding', label: 'Wedding' },
  ]}
/>
```

---

## Advanced Customization

### Add New Section

1. Create file: `src/components/sections/NewSection.tsx`

```typescript
'use client';

import { motion } from 'framer-motion';
import { Section, SectionHeader } from '@/components/ui/Card';

export function NewSection() {
  return (
    <Section id="new-section">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          eyebrow="Eyebrow Text"
          title="Section Title"
          subtitle="Section subtitle"
        />
        {/* Your content */}
      </div>
    </Section>
  );
}
```

2. Import in `src/app/page.tsx`:

```typescript
import { NewSection } from '@/components/sections/NewSection';

export default function Home() {
  return (
    <main>
      {/* ... other sections */}
      <NewSection />
      {/* ... other sections */}
    </main>
  );
}
```

### Custom Gradient Backgrounds

```typescript
<div className="bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500" />
```

**Gradient Variants**:
- `bg-gradient-to-r` - Left to right
- `bg-gradient-to-b` - Top to bottom
- `bg-gradient-radial` - Circular (custom class)

### Add New Service Category

1. Update `src/components/sections/Services.tsx`:

```typescript
const services = [
  // ... existing services
  {
    icon: Star,  // New icon
    title: 'VIP Events',
    description: 'Exclusive hosting for high-profile gatherings.',
    benefits: [
      'Discreet professionalism',
      'White-glove service',
      'Custom scripting',
    ],
    gradient: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30',
  },
];
```

### Modify Form Fields

File: `src/components/sections/Contact.tsx`

```typescript
interface FormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  venue: string;
  message: string;
  budget: string;  // ← Add new field
}
```

Add input in form:

```typescript
<Select
  label="Budget Range"
  name="budget"
  options={[
    { value: '', label: 'Select Budget' },
    { value: '1000-2000', label: '$1,000 - $2,000' },
    { value: '2000-5000', label: '$2,000 - $5,000' },
  ]}
  value={formData.budget}
  onChange={handleChange}
/>
```

Update EmailJS template to include `{{budget}}`.

---

## Image Optimization

### Using Local Images

1. Add images to `public/images/`
2. Import and use:

```typescript
import Image from 'next/image';

<Image
  src="/images/hero.jpg"
  alt="Description"
  width={800}
  height={600}
  className="object-cover"
  priority  // For above-fold images
/>
```

### Using External Images

Update `next.config.mjs`:

```typescript
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-domain.com',
      },
    ],
  },
};
```

---

## Performance Tips

1. **Optimize Images**: Use WebP format, compress before upload
2. **Lazy Load**: Below-fold images load on scroll
3. **Minimize Animations**: Reduce complex animations on mobile
4. **Font Loading**: Use `font-display: swap` in CSS

---

## Testing Changes

```bash
# Development
npm run dev

# Production build
npm run build
npm start

# Check for errors
npm run lint
```

---

## Need Help?

- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Framer Motion**: [framer.com/motion](https://www.framer.com/motion/)
- **Lucide Icons**: [lucide.dev/icons](https://lucide.dev/icons/)

---

**Last Updated**: March 2026
