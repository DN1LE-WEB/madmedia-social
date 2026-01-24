# Phase 1: Foundation & Design System - Research

**Researched:** 2026-01-24
**Domain:** Next.js 15, Tailwind CSS v4, Google Fonts, Design System Architecture
**Confidence:** HIGH

## Summary

This research establishes the technical foundation for building a sophisticated design system that passes the "not AI-generated" test. The stack centers on Next.js 15 with App Router for modern React architecture, Tailwind CSS v4 with its new CSS-first configuration approach, and carefully selected Google Fonts (Fraunces and Playfair Display) that provide character and editorial sophistication.

The key insight is that Tailwind CSS v4 fundamentally changes configuration from JavaScript to CSS using the `@theme` directive. This simplifies design token management and makes the design system more maintainable. Combined with Next.js's built-in font optimization via `next/font/google`, we can achieve zero layout shift while self-hosting Google Fonts for privacy and performance.

**Primary recommendation:** Use Next.js 15 App Router with Tailwind CSS v4's `@theme` directive for CSS-first configuration, Fraunces (display/headlines) + DM Sans or Work Sans (body) fonts via `next/font/google` with CSS variables, and structure reusable Navigation/Footer components in a dedicated `components/layout/` directory.

## Standard Stack

The established libraries/tools for this domain:

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 15.x | React framework with App Router | Industry standard, excellent SEO, static export support |
| TypeScript | 5.x | Type safety | Required per project specs, catches errors at build time |
| Tailwind CSS | 4.x | Utility-first CSS | CSS-first config with @theme, no tailwind.config.js needed |
| @tailwindcss/postcss | latest | PostCSS integration | Required for Tailwind v4 with Next.js |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next/font/google | built-in | Google Fonts optimization | Always - self-hosts fonts, prevents layout shift |
| postcss | latest | CSS processing | Required for Tailwind v4 integration |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Tailwind v4 @theme | tailwind.config.js | v3 approach still works but v4 CSS-first is cleaner |
| Fraunces | Playfair Display | Both work - Fraunces has more axes (SOFT, WONK) for character |
| DM Sans | Work Sans, Plus Jakarta Sans | All good options for body text - DM Sans has excellent x-height |

**Installation:**
```bash
npx create-next-app@latest madmedia-social --typescript --eslint --app --tailwind
cd madmedia-social
npm install tailwindcss @tailwindcss/postcss postcss
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/                      # App Router (routes only)
│   ├── layout.tsx            # Root layout with fonts, nav, footer
│   ├── page.tsx              # Homepage
│   ├── services/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
├── components/
│   ├── layout/               # Shared layout components
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── index.ts
│   └── ui/                   # Reusable UI components
│       ├── Button.tsx
│       ├── Container.tsx
│       └── index.ts
├── lib/                      # Utilities, constants
│   ├── fonts.ts              # Font definitions
│   └── constants.ts          # Colors, spacing values
├── styles/
│   └── globals.css           # Tailwind imports + @theme
└── types/                    # TypeScript types
```

### Pattern 1: Font Configuration with CSS Variables
**What:** Configure Google Fonts via next/font/google and expose as CSS variables for Tailwind
**When to use:** Always - this is the standard approach for Next.js + Tailwind
**Example:**
```typescript
// src/lib/fonts.ts
import { Fraunces, DM_Sans } from 'next/font/google'

export const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  axes: ['SOFT', 'WONK', 'opsz'], // Enable variable font axes
})

export const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700'],
})
```

```typescript
// src/app/layout.tsx
import { fraunces, dmSans } from '@/lib/fonts'
import '@/styles/globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

### Pattern 2: Tailwind v4 @theme Configuration
**What:** Define design tokens in CSS using @theme directive
**When to use:** For all custom colors, fonts, spacing, and easing curves
**Example:**
```css
/* src/styles/globals.css */
@import 'tailwindcss';

@theme {
  /* Typography */
  --font-display: var(--font-fraunces), Georgia, serif;
  --font-body: var(--font-dm-sans), system-ui, sans-serif;

  /* Colors - Brand Palette */
  --color-primary: #1a1a1a;
  --color-primary-soft: #2d2d2d;
  --color-accent: #c9a227;
  --color-accent-light: #e8d48a;
  --color-accent-dark: #9a7b1c;
  --color-background: #fafafa;
  --color-background-warm: #f5f3ef;
  --color-text: #1a1a1a;
  --color-text-muted: #6b6b6b;

  /* Spacing - Dramatic whitespace */
  --spacing-section: 120px;
  --spacing-section-sm: 80px;
  --spacing-section-lg: 160px;

  /* Custom Easing */
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  --ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);

  /* Max Width */
  --width-content: 1200px;
}
```

### Pattern 3: Root Layout with Shared Navigation
**What:** Place Navigation and Footer in root layout for persistence across routes
**When to use:** Always - layouts preserve state and don't re-render on navigation
**Example:**
```typescript
// src/app/layout.tsx
import { fraunces, dmSans } from '@/lib/fonts'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import '@/styles/globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="font-body text-primary bg-background">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

### Pattern 4: Static Export Configuration
**What:** Configure Next.js for static HTML export compatible with Hostinger
**When to use:** When deploying to static hosting (Hostinger shared hosting)
**Example:**
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true, // Required for Hostinger routing
  images: {
    unoptimized: true, // Required for static export
  },
}

module.exports = nextConfig
```

### Anti-Patterns to Avoid

- **Defining fonts in multiple files:** Creates duplicate instances. Define once in `lib/fonts.ts`, import everywhere
- **Using tailwind.config.js with v4:** The @theme directive replaces it - CSS-first is cleaner
- **Putting components in app/ directory:** Keep app/ for routes only, components go in src/components/
- **Generic font choices:** Inter, Roboto, Poppins scream "AI-generated" - use Fraunces, DM Sans
- **Default easing curves:** ease, ease-in-out are generic - use custom ease-out-expo/quart
- **Uniform spacing:** Use dramatic 120px+ between major sections, not uniform 40px everywhere

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font loading/optimization | Custom font preloading | next/font/google | Handles CLS, preloading, self-hosting automatically |
| CSS reset/normalization | Custom reset CSS | Tailwind's preflight | Built into Tailwind, well-tested |
| Responsive breakpoints | Custom media queries | Tailwind breakpoints (sm, md, lg, xl, 2xl) | Consistent, well-documented |
| Color opacity variants | Separate color classes | Tailwind's /opacity syntax (bg-accent/50) | Built-in, generates all variants |
| Container centering | Custom container class | Tailwind's container + mx-auto | Handles all breakpoints |

**Key insight:** Tailwind v4 with @theme gives you design tokens that become utilities automatically. Define `--color-accent: #c9a227` and you get `bg-accent`, `text-accent`, `border-accent` for free.

## Common Pitfalls

### Pitfall 1: Font Instance Duplication
**What goes wrong:** Calling font functions in multiple files creates separate instances, bloating bundle size
**Why it happens:** Each import from next/font/google creates a new instance
**How to avoid:** Create a single `lib/fonts.ts` file, export font objects, import from there everywhere
**Warning signs:** Multiple font requests in network tab, larger than expected CSS bundle

### Pitfall 2: Static Export Image Errors
**What goes wrong:** Build fails with "Image Optimization using default loader is not compatible with export"
**Why it happens:** Next.js default image optimization requires a server
**How to avoid:** Set `images: { unoptimized: true }` in next.config.js for static export
**Warning signs:** Build errors mentioning image loader

### Pitfall 3: Hostinger Routing Issues
**What goes wrong:** Routes like /services return 404 on Hostinger
**Why it happens:** Static hosting expects /services/index.html, not /services.html
**How to avoid:** Set `trailingSlash: true` in next.config.js to generate /services/index.html
**Warning signs:** Routes work locally but 404 on deployed site

### Pitfall 4: CSS Variable Scope
**What goes wrong:** Font CSS variables not available in child components
**Why it happens:** Variables only defined on html element, not cascading properly
**How to avoid:** Apply font variable classes to html element in root layout, use @theme to reference them
**Warning signs:** font-family: var(--font-x) showing fallback font in DevTools

### Pitfall 5: Tailwind v4 Migration Confusion
**What goes wrong:** Mixing v3 config patterns with v4 @theme
**Why it happens:** Many tutorials still show tailwind.config.js approach
**How to avoid:** Use CSS-first @theme directive for all customization in v4
**Warning signs:** tailwind.config.js file with @theme in globals.css - pick one approach

### Pitfall 6: AI-Generated Design Patterns
**What goes wrong:** Site looks like every other AI-generated site
**Why it happens:** Using defaults - default fonts, default colors, uniform spacing
**How to avoid:**
- Use character fonts (Fraunces, DM Sans) not generic ones
- 120px+ whitespace between sections
- Asymmetric layouts (60/40 splits)
- Custom easing (ease-out-expo) not default ease
**Warning signs:** Site looks like a template, no personality

## Code Examples

Verified patterns from official sources:

### Complete Font Setup
```typescript
// src/lib/fonts.ts
// Source: https://nextjs.org/docs/app/api-reference/components/font
import { Fraunces, DM_Sans } from 'next/font/google'

export const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  axes: ['SOFT', 'WONK', 'opsz'],
})

export const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700'],
})
```

### Complete Tailwind v4 Theme
```css
/* src/styles/globals.css */
/* Source: https://tailwindcss.com/docs/theme */
@import 'tailwindcss';

@theme {
  /* Typography - Character fonts */
  --font-display: var(--font-fraunces), Georgia, serif;
  --font-body: var(--font-dm-sans), system-ui, sans-serif;

  /* Colors - MadMedia brand */
  --color-primary: #1a1a1a;
  --color-primary-soft: #2d2d2d;
  --color-accent: #c9a227;
  --color-accent-light: #e8d48a;
  --color-accent-dark: #9a7b1c;
  --color-background: #fafafa;
  --color-background-warm: #f5f3ef;
  --color-text: #1a1a1a;
  --color-text-muted: #6b6b6b;

  /* Spacing - Dramatic whitespace (120px+) */
  --spacing-section: 7.5rem;     /* 120px */
  --spacing-section-sm: 5rem;    /* 80px */
  --spacing-section-lg: 10rem;   /* 160px */

  /* Layout */
  --width-content: 75rem;        /* 1200px */

  /* Animation - Custom easing (NOT bounce/default) */
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  --ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
}
```

### PostCSS Configuration
```javascript
// postcss.config.mjs
// Source: https://tailwindcss.com/docs/guides/nextjs
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
export default config
```

### Navigation Component Pattern
```typescript
// src/components/layout/Navigation.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <header className="py-6">
      <nav className="mx-auto max-w-content px-6 flex items-center justify-between">
        <Link href="/" className="relative h-12 w-40">
          <Image
            src="/logo.png"
            alt="MadMedia"
            fill
            className="object-contain"
            priority
          />
        </Link>

        <ul className="flex gap-8">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm font-medium transition-colors duration-300 ease-out-expo
                  ${pathname === href
                    ? 'text-accent'
                    : 'text-primary hover:text-accent'
                  }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
```

### Footer Component Pattern
```typescript
// src/components/layout/Footer.tsx
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-primary text-background py-section-sm">
      <div className="mx-auto max-w-content px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="font-display text-xl mb-4">Contact</h3>
            <address className="not-italic text-background/80 space-y-2">
              <p>Madison, MN 56256</p>
              <p>
                <a href="tel:320-204-5840" className="hover:text-accent transition-colors">
                  320-204-5840
                </a>
              </p>
              <p>
                <a href="mailto:madmedia56256@gmail.com" className="hover:text-accent transition-colors">
                  madmedia56256@gmail.com
                </a>
              </p>
            </address>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display text-xl mb-4">Navigate</h3>
            <ul className="space-y-2 text-background/80">
              <li><Link href="/services" className="hover:text-accent transition-colors">Services</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-display text-xl mb-4">Connect</h3>
            {/* Social links here */}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-background/20 text-center text-sm text-background/60">
          <p>&copy; {new Date().getFullYear()} MadMedia LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
```

### Static Export Configuration
```javascript
// next.config.js
// Source: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| tailwind.config.js | @theme directive in CSS | Tailwind v4 (Jan 2025) | CSS-first config, simpler setup |
| postcss-tailwind | @tailwindcss/postcss | Tailwind v4 | Different plugin name |
| pages/ router | app/ router | Next.js 13+ (stable in 14/15) | Layouts, server components |
| Manual font loading | next/font/google | Next.js 13+ | Zero layout shift, self-hosted |
| @tailwind directives | @import 'tailwindcss' | Tailwind v4 | Single import statement |

**Deprecated/outdated:**
- `tailwind.config.js` with `extend` - still works but @theme is preferred in v4
- `@tailwind base/components/utilities` - replaced by `@import 'tailwindcss'`
- `pages/` directory - use `app/` for new projects
- External Google Fonts `<link>` tags - use next/font for optimization

## Open Questions

Things that couldn't be fully resolved:

1. **Fraunces variable axes in practice**
   - What we know: Fraunces supports SOFT, WONK, opsz axes
   - What's unclear: Best values for each axis for this use case
   - Recommendation: Include all axes via `axes: ['SOFT', 'WONK', 'opsz']`, tune via font-variation-settings in CSS

2. **Tailwind v4 @theme inline vs regular**
   - What we know: @theme inline makes variables available everywhere
   - What's unclear: Performance implications of @theme inline
   - Recommendation: Use regular @theme, only use inline if needed for color references

3. **Logo image format optimization**
   - What we know: Static export requires unoptimized images
   - What's unclear: Best format/size for logo given no optimization
   - Recommendation: Pre-optimize logo to WebP, multiple sizes for srcset

## Sources

### Primary (HIGH confidence)
- [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts) - Font setup, CSS variables
- [Next.js Font API Reference](https://nextjs.org/docs/app/api-reference/components/font) - Complete options
- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports) - Export configuration
- [Next.js Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages) - Layout patterns
- [Tailwind CSS Installation with Next.js](https://tailwindcss.com/docs/guides/nextjs) - v4 setup
- [Tailwind CSS Theme Variables](https://tailwindcss.com/docs/theme) - @theme directive

### Secondary (MEDIUM confidence)
- [Fraunces GitHub Repository](https://github.com/undercasetype/Fraunces) - Variable axes documentation
- [Easings.net](https://easings.net/) - Cubic-bezier values
- [Next.js Project Structure Best Practices 2025](https://dev.to/bajrayejoon/best-practices-for-organizing-your-nextjs-15-2025-53ji) - Component organization

### Tertiary (LOW confidence)
- Various Medium articles on Tailwind v4 migration - Community patterns, some may be outdated

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official documentation verified
- Architecture: HIGH - Official patterns from Next.js docs
- Font configuration: HIGH - next/font API reference verified
- Tailwind v4 @theme: MEDIUM - Official docs + community articles
- Pitfalls: MEDIUM - Mix of official docs and community experience
- Easing values: HIGH - Verified from easings.net

**Research date:** 2026-01-24
**Valid until:** 2026-02-24 (30 days - stable technologies)
