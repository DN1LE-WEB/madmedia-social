# Phase 2: Core Pages - Research

**Researched:** 2026-01-24
**Domain:** Editorial layouts, Formspree integration, responsive asymmetric grids, accessible forms
**Confidence:** HIGH

## Summary

This research establishes patterns for building four editorial pages (Homepage, Services, About, Contact) that look unmistakably human-designed. Phase 1 already provides the design system foundation: Fraunces + DM Sans typography, gold accent (#c9a227), 120px+ section spacing, and custom easing curves. Phase 2 builds on this foundation with asymmetric 60/40 grid layouts, typography-focused hero sections, and accessible form patterns.

The key insight is that "not looking AI-generated" in 2025 means embracing asymmetry, intentional imperfection, and editorial layouts that feel more like a high-end print magazine than a browser template. CSS Grid with fractional units (3fr 2fr for 60/40 splits) enables this without complex calc() functions. For the contact form, Formspree's `@formspree/react` library provides a clean hook-based API that works perfectly with Next.js static exports.

**Primary recommendation:** Use CSS Grid with `grid-cols-[3fr_2fr]` for asymmetric layouts, implement typography-focused hero sections with minimal imagery, integrate Formspree via `useForm` hook with accessible form patterns, and use native HTML `<details>`/`<summary>` for the FAQ accordion.

## Existing Foundation from Phase 1

Phase 1 provides these tokens and components that Phase 2 MUST use:

### Design Tokens (from globals.css @theme)
| Token | Value | Usage |
|-------|-------|-------|
| `--font-display` | Fraunces | Headlines, hero text, section titles |
| `--font-body` | DM Sans | Body copy, form labels, navigation |
| `--color-primary` | #1a1a1a | Dark text, dark backgrounds |
| `--color-accent` | #c9a227 | Gold accents, CTAs, highlights |
| `--color-accent-light` | #e8d48a | Hover states, subtle accents |
| `--color-background` | #fafafa | Main page background |
| `--color-background-warm` | #f5f3ef | Warm sections, alternating backgrounds |
| `--color-text-muted` | #6b6b6b | Secondary text, captions |
| `--spacing-section` | 7.5rem (120px) | Between major sections |
| `--spacing-section-sm` | 5rem (80px) | Smaller section gaps |
| `--spacing-section-lg` | 10rem (160px) | Dramatic section gaps |
| `--width-content` | 75rem (1200px) | Max content width |
| `--ease-out-expo` | cubic-bezier(0.19, 1, 0.22, 1) | Smooth transitions |

### Existing Components
| Component | Location | Usage |
|-----------|----------|-------|
| Navigation | `src/components/layout/Navigation.tsx` | Already in root layout, includes logo + links |
| Footer | `src/components/layout/Footer.tsx` | Already in root layout, dark bg-primary style |

### Container Pattern
Already established: `mx-auto max-w-[var(--width-content)] px-6`

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Status |
|---------|---------|---------|--------|
| Next.js | 16.x | React framework with App Router | Installed |
| Tailwind CSS | 4.x | Utility-first CSS with @theme | Installed |
| TypeScript | 5.x | Type safety | Installed |

### New for Phase 2
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @formspree/react | latest | Form submission handling | Official Formspree library, useForm hook, validation helpers |

**Installation:**
```bash
npm install @formspree/react
```

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @formspree/react | Plain HTML form POST | React library has better UX with state management, but HTML form works too |
| Native details/summary | Custom accordion JS | Native is more accessible, no JS needed, browser-supported |
| CSS Grid fr units | Flexbox percentages | Grid is cleaner for asymmetric layouts, no gap math |

## Architecture Patterns

### Recommended Page Structure
```
src/
├── app/
│   ├── page.tsx              # Homepage - hero, services preview, about preview
│   ├── services/
│   │   └── page.tsx          # Services - packages, website services, FAQ
│   ├── about/
│   │   └── page.tsx          # About - Julie bio, large photo moment
│   └── contact/
│       └── page.tsx          # Contact - form with Formspree
├── components/
│   ├── layout/               # Navigation, Footer (Phase 1)
│   ├── ui/                   # Reusable UI components
│   │   ├── Container.tsx     # Content wrapper
│   │   └── Button.tsx        # CTA buttons
│   ├── home/                 # Homepage-specific sections
│   │   ├── Hero.tsx
│   │   ├── ServicesPreview.tsx
│   │   └── AboutPreview.tsx
│   ├── services/             # Services page sections
│   │   ├── PackageCard.tsx
│   │   ├── WebsiteServices.tsx
│   │   └── FAQ.tsx
│   ├── about/                # About page sections
│   │   └── BioSection.tsx
│   └── contact/              # Contact page
│       └── ContactForm.tsx
└── lib/
    └── formspree.ts          # Formspree form ID constant
```

### Pattern 1: Asymmetric Grid Layout (60/40 Split)
**What:** Use CSS Grid with fractional units for intentional asymmetry
**When to use:** Hero sections, bio sections, service overviews - anywhere visual tension is needed
**Why:** Creates editorial feel, distinguishes from AI-generated symmetric templates

```tsx
// 60/40 split - content takes 60%, visual takes 40%
<section className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16">
  <div className="order-2 lg:order-1">
    {/* Main content - 60% on desktop */}
    <h2 className="font-display text-4xl lg:text-5xl">Section Title</h2>
    <p className="text-text-muted mt-6">Content here...</p>
  </div>
  <div className="order-1 lg:order-2">
    {/* Visual element - 40% on desktop */}
    <div className="aspect-[4/5] bg-background-warm" />
  </div>
</section>
```

### Pattern 2: Typography-Focused Hero (Minimal Imagery)
**What:** Large, expressive typography as the visual focal point
**When to use:** Homepage hero, section headers where photos are limited
**Why:** With only 1 logo + 1 photo available, typography must carry visual weight

```tsx
<section className="py-section-lg">
  <div className="mx-auto max-w-[var(--width-content)] px-6">
    {/* Oversized headline - the visual IS the typography */}
    <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight">
      Social Media<br />
      <span className="text-accent">That Works</span>
    </h1>

    {/* Asymmetric positioning of subheadline */}
    <p className="mt-8 text-xl md:text-2xl text-text-muted max-w-xl ml-auto text-right">
      Helping small businesses in Madison, MN and beyond grow their online presence.
    </p>

    {/* Decorative element */}
    <div className="mt-12 h-px bg-primary/20 w-2/3" />
  </div>
</section>
```

### Pattern 3: Formspree Contact Form with useForm
**What:** Client-side form with Formspree handling submission
**When to use:** Contact page
**Example:**

```tsx
// src/components/contact/ContactForm.tsx
'use client'

import { useForm, ValidationError } from '@formspree/react'

export function ContactForm() {
  const [state, handleSubmit] = useForm('YOUR_FORM_ID')

  if (state.succeeded) {
    return (
      <div className="py-12 text-center">
        <h3 className="font-display text-2xl">Thank you!</h3>
        <p className="text-text-muted mt-4">
          We'll be in touch soon.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Name field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name <span className="text-accent">(required)</span>
        </label>
        <input
          id="name"
          type="text"
          name="name"
          required
          className="w-full px-4 py-3 border border-primary/20 rounded-none
                     focus:border-accent focus:ring-1 focus:ring-accent
                     transition-colors duration-300"
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} />
      </div>

      {/* Email field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email <span className="text-accent">(required)</span>
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="w-full px-4 py-3 border border-primary/20 rounded-none
                     focus:border-accent focus:ring-1 focus:ring-accent
                     transition-colors duration-300"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>

      {/* Phone field (optional) */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Phone <span className="text-text-muted">(optional)</span>
        </label>
        <input
          id="phone"
          type="tel"
          name="phone"
          className="w-full px-4 py-3 border border-primary/20 rounded-none
                     focus:border-accent focus:ring-1 focus:ring-accent
                     transition-colors duration-300"
        />
      </div>

      {/* Message field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message <span className="text-accent">(required)</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full px-4 py-3 border border-primary/20 rounded-none
                     focus:border-accent focus:ring-1 focus:ring-accent
                     transition-colors duration-300 resize-none"
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>

      {/* General errors */}
      <ValidationError errors={state.errors} />

      <button
        type="submit"
        disabled={state.submitting}
        className="bg-primary text-background px-8 py-4 font-medium
                   hover:bg-accent transition-colors duration-300
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {state.submitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
```

### Pattern 4: Accessible FAQ with Native details/summary
**What:** Native HTML disclosure widget, accessible by default
**When to use:** FAQ section on services page
**Why:** No JavaScript needed, built-in keyboard navigation and screen reader support

```tsx
// src/components/services/FAQ.tsx
const faqItems = [
  {
    question: "How many platforms can you manage?",
    answer: "Depends on your package. Starter includes 1 platform, Standard includes 2, and Premium covers up to 3 platforms of your choice."
  },
  // ... more items
]

export function FAQ() {
  return (
    <section className="py-section">
      <div className="mx-auto max-w-[var(--width-content)] px-6">
        <h2 className="font-display text-3xl md:text-4xl mb-12">
          Frequently Asked Questions
        </h2>

        <div className="max-w-3xl space-y-4">
          {faqItems.map((item, index) => (
            <details
              key={index}
              className="group border-b border-primary/10 pb-4"
            >
              <summary className="flex justify-between items-center cursor-pointer
                                  list-none py-4 font-medium hover:text-accent
                                  transition-colors duration-300">
                {item.question}
                <span className="ml-4 transform group-open:rotate-180
                                 transition-transform duration-300">
                  +
                </span>
              </summary>
              <div className="pb-4 text-text-muted">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### Pattern 5: Editorial Pricing Display (Not Generic Cards)
**What:** Narrative-style pricing with visual hierarchy, not three identical cards
**When to use:** Services page package display
**Why:** Avoid AI-generated "three cards in a row" pattern

```tsx
// Instead of three identical cards, use asymmetric layout with hierarchy
<section className="py-section bg-background-warm">
  <div className="mx-auto max-w-[var(--width-content)] px-6">
    <h2 className="font-display text-3xl md:text-4xl mb-16">
      Social Media Management
    </h2>

    {/* Staggered layout, not uniform grid */}
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      {/* Starter - smaller */}
      <div className="md:col-span-4">
        <div className="border-t-2 border-primary/20 pt-6">
          <h3 className="font-display text-xl">Starter</h3>
          <p className="text-4xl font-display mt-4">$300<span className="text-lg text-text-muted">/mo</span></p>
          <ul className="mt-6 space-y-2 text-text-muted text-sm">
            <li>8 posts per month</li>
            <li>1 platform</li>
            <li>Basic content</li>
          </ul>
        </div>
      </div>

      {/* Standard - emphasized (featured) */}
      <div className="md:col-span-4">
        <div className="border-t-2 border-accent pt-6 bg-white p-6 -mt-6 shadow-sm">
          <span className="text-xs uppercase tracking-widest text-accent">Most Popular</span>
          <h3 className="font-display text-xl mt-2">Standard</h3>
          <p className="text-4xl font-display mt-4">$600<span className="text-lg text-text-muted">/mo</span></p>
          <ul className="mt-6 space-y-2 text-text-muted text-sm">
            <li>16 posts per month</li>
            <li>2 platforms</li>
            <li>Advanced content</li>
          </ul>
        </div>
      </div>

      {/* Premium - larger */}
      <div className="md:col-span-4">
        <div className="border-t-2 border-primary/20 pt-6">
          <h3 className="font-display text-xl">Premium</h3>
          <p className="text-4xl font-display mt-4">$900<span className="text-lg text-text-muted">/mo</span></p>
          <ul className="mt-6 space-y-2 text-text-muted text-sm">
            <li>24 posts per month</li>
            <li>3 platforms</li>
            <li>Comprehensive content</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>
```

### Pattern 6: Large Photo Moment (About Page)
**What:** Full-width or near-full-width image with minimal surrounding elements
**When to use:** About page to feature Julie
**Why:** Creates visual impact with the single available photo asset

```tsx
<section className="py-section-lg">
  <div className="mx-auto max-w-[var(--width-content)] px-6">
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16 items-center">
      {/* Photo - takes 40% on large screens, but is the star */}
      <div className="relative aspect-[3/4] lg:aspect-[4/5]">
        <Image
          src="/julie.jpg"
          alt="Julie Asfeld, Founder of MadMedia"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 40vw"
        />
      </div>

      {/* Bio text - 60% on large screens */}
      <div>
        <h1 className="font-display text-4xl lg:text-5xl">
          Meet Julie
        </h1>
        <p className="mt-8 text-lg text-text-muted leading-relaxed">
          As a small business owner myself, I know how hard it is to find time
          for social media. That's why I started MadMedia — to help businesses
          in Madison, MN and beyond show up online without the stress.
        </p>
        <p className="mt-6 text-lg text-text-muted leading-relaxed">
          When I'm not creating content, you'll find me...
        </p>
      </div>
    </div>
  </div>
</section>
```

### Anti-Patterns to Avoid

- **Three identical cards in a row:** This screams "AI-generated template" - use asymmetric layouts instead
- **Generic gradients:** No linear-gradient backgrounds - use solid colors or warm/cool alternation
- **Centered everything:** Asymmetric layouts with left/right alignment create visual interest
- **Same spacing everywhere:** Vary section spacing (80px, 120px, 160px) for rhythm
- **Rounded corners everywhere:** Use sharp corners for editorial feel, or very subtle rounding
- **Stock photo grids:** With limited photos, rely on typography and whitespace
- **Hamburger menu on desktop:** Navigation is already designed for desktop display
- **Bounce/spring animations:** Use custom easing (ease-out-expo) for sophistication

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Form submission handling | Custom fetch/API routes | @formspree/react useForm | Handles validation, errors, success states |
| Accordion behavior | Custom useState toggle | Native `<details>`/`<summary>` | Built-in a11y, keyboard nav, no JS |
| Responsive images | Manual srcset | Next.js Image with sizes prop | Automatic optimization (note: unoptimized for static export) |
| Grid layouts | Flexbox with calc() | CSS Grid fr units | Cleaner, handles gaps automatically |
| Form validation | Custom validation logic | HTML5 required + Formspree | Server-side validation included |
| Scroll behavior | Custom JS scroll | CSS scroll-behavior | Native, performant |

**Key insight:** Native HTML elements (`<details>`, `<form>` with HTML5 validation) provide accessibility for free. JavaScript solutions must match this baseline.

## Common Pitfalls

### Pitfall 1: Uniform Visual Weight
**What goes wrong:** All sections look the same - same padding, same grid, same type sizes
**Why it happens:** Applying same utility classes everywhere for "consistency"
**How to avoid:**
- Vary section padding: py-section-sm, py-section, py-section-lg
- Alternate backgrounds: bg-background, bg-background-warm
- Mix asymmetric splits: 3fr/2fr, 2fr/3fr, full-width
**Warning signs:** Page feels monotonous, no visual hierarchy

### Pitfall 2: Formspree 'use client' Missing
**What goes wrong:** "useForm is not a function" or hydration errors
**Why it happens:** useForm is a React hook, needs client-side execution
**How to avoid:** Add `'use client'` directive at top of form component file
**Warning signs:** Build errors, hydration mismatch warnings

### Pitfall 3: Image Optimization in Static Export
**What goes wrong:** Build fails or images don't load in production
**Why it happens:** Next.js Image optimization requires server, but static export is enabled
**How to avoid:**
- Already configured: `images: { unoptimized: true }` in next.config.js
- Use regular `<img>` tags for simple cases
- Pre-optimize images before adding to public/
**Warning signs:** Build errors about image loader

### Pitfall 4: FAQ Accordion Accessibility
**What goes wrong:** Screen readers can't navigate, keyboard users stuck
**Why it happens:** Custom JS accordion without proper ARIA
**How to avoid:** Use native `<details>`/`<summary>` elements
**Warning signs:** Tab doesn't move between items, Enter doesn't toggle

### Pitfall 5: Form Field Labels Not Associated
**What goes wrong:** Clicking label doesn't focus input, screen readers confused
**Why it happens:** Missing htmlFor/id connection
**How to avoid:** Match `<label htmlFor="email">` with `<input id="email">`
**Warning signs:** Clicking label text does nothing

### Pitfall 6: Mobile Responsiveness Breaks Asymmetry
**What goes wrong:** 60/40 splits look cramped on mobile
**Why it happens:** Grid columns applied at all breakpoints
**How to avoid:** Stack on mobile, split on lg: `grid-cols-1 lg:grid-cols-[3fr_2fr]`
**Warning signs:** Tiny columns on phones

### Pitfall 7: Formspree Form ID Exposed in Code
**What goes wrong:** Form ID visible in source, could receive spam
**Why it happens:** Hardcoded ID in component
**How to avoid:** Use environment variable: `process.env.NEXT_PUBLIC_FORMSPREE_ID`
**Warning signs:** ID visible in built JavaScript

## Responsive Strategy

### Mobile-First Breakpoint Approach
| Breakpoint | Width | Layout Behavior |
|------------|-------|-----------------|
| default | 320px+ | Single column, stacked sections |
| md | 768px+ | Begin some side-by-side layouts |
| lg | 1024px+ | Full asymmetric grids, 60/40 splits |
| xl | 1280px+ | Same as lg, more breathing room |

### Key Responsive Patterns

**Typography scaling:**
```tsx
<h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
```

**Grid stacking:**
```tsx
<div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr]">
```

**Order reversal for visual flow:**
```tsx
<div className="order-2 lg:order-1">Content</div>
<div className="order-1 lg:order-2">Image</div>
```

**Spacing scaling:**
```tsx
<section className="py-16 md:py-20 lg:py-section">
```

### Mobile Navigation
Navigation is already client-side with usePathname. For Phase 2, consider:
- Current navigation works for desktop
- Mobile hamburger menu is Phase 4 (if needed)
- Links are accessible at all sizes

## Formspree Setup

### Step 1: Create Formspree Account
1. Go to formspree.io and create account
2. Create new form named "MadMedia Contact"
3. Set recipient email to madmedia56256@gmail.com
4. Copy the form ID (8-character string like "xpwajlob")

### Step 2: Environment Variable
```bash
# .env.local
NEXT_PUBLIC_FORMSPREE_ID=your_form_id_here
```

### Step 3: Use in Component
```tsx
const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_ID!)
```

### Static Export Compatibility
Formspree works with static exports because:
- Submissions are client-side POST to Formspree servers
- No Next.js API routes needed
- No server-side code required

## Code Examples

### Container Component
```tsx
// src/components/ui/Container.tsx
interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`mx-auto max-w-[var(--width-content)] px-6 ${className}`}>
      {children}
    </div>
  )
}
```

### Section with Alternating Background
```tsx
// Pattern for visual rhythm
<section className="py-section bg-background">
  <Container>
    {/* Content */}
  </Container>
</section>

<section className="py-section-lg bg-background-warm">
  <Container>
    {/* Content */}
  </Container>
</section>
```

### Button Component
```tsx
// src/components/ui/Button.tsx
interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
}

export function Button({
  children,
  variant = 'primary',
  href,
  type = 'button',
  disabled,
  className = ''
}: ButtonProps) {
  const baseStyles = 'inline-block px-8 py-4 font-medium transition-colors duration-300'
  const variants = {
    primary: 'bg-primary text-background hover:bg-accent',
    secondary: 'border border-primary text-primary hover:bg-primary hover:text-background'
  }

  const styles = `${baseStyles} ${variants[variant]} ${className}`

  if (href) {
    return <a href={href} className={styles}>{children}</a>
  }

  return (
    <button type={type} disabled={disabled} className={styles}>
      {children}
    </button>
  )
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Custom JS accordion | Native `<details name="group">` | Firefox 130 (2024) | Exclusive accordions without JS |
| Formspree HTML form | @formspree/react useForm | 2023+ | Better state management, validation |
| Flexbox with calc gaps | CSS Grid fr units | Well-established | Cleaner asymmetric layouts |
| Generic card layouts | Editorial asymmetric layouts | 2024-2025 trend | Distinguishes from AI templates |
| Placeholder text only | Visible labels + placeholder | WCAG best practice | Better accessibility |

**Current Design Trend (2025-2026):**
- "Intentional imperfection" as counter to AI-generated polish
- Editorial/magazine-style layouts over generic templates
- Typography as visual element, not just text
- Asymmetry signals human design intention

## Open Questions

1. **Julie's Photo Asset**
   - What we know: One photo available (Squarespace URL provided in PROJECT.md)
   - What's unclear: Resolution, aspect ratio, quality for large display
   - Recommendation: Download and evaluate before planning exact layout

2. **Website Services Pricing Details**
   - What we know: Design and Maintenance tiers mentioned
   - What's unclear: Exact pricing, feature breakdown
   - Recommendation: Use placeholder structure, confirm with client

3. **Mobile Navigation**
   - What we know: Desktop navigation exists and works
   - What's unclear: Whether hamburger menu needed for mobile
   - Recommendation: Test current nav on mobile; if adequate, defer menu to Phase 4

4. **Formspree Plan Limits**
   - What we know: Free tier allows 50 submissions/month
   - What's unclear: Client's expected volume
   - Recommendation: Start with free tier, upgrade if needed

## Sources

### Primary (HIGH confidence)
- [Formspree Next.js Guide](https://formspree.io/guides/nextjs/) - Official integration docs
- [Tailwind CSS Grid Template Columns](https://tailwindcss.com/docs/grid-template-columns) - Official utility docs
- [MDN details/summary](https://developer.mozilla.org/en-US/blog/html-details-exclusive-accordions/) - Native accordion patterns
- Phase 1 RESEARCH.md and implemented code - Existing design tokens

### Secondary (MEDIUM confidence)
- [CSS-Tricks Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/) - fr unit patterns
- [Smashing Magazine Form Validation](https://www.smashingmagazine.com/2023/02/guide-accessible-form-validation/) - Accessible form patterns
- [The Rise of Asymmetric Layouts (HypeEdge)](https://thehypedge.com/the-rise-of-asymmetric-layouts-breaking-the-mold-in-web-design/) - Design trends

### Tertiary (LOW confidence)
- Various 2025 web design trend articles - General aesthetic direction
- WebSearch results on "not AI-generated" design - Community sentiment

## Metadata

**Confidence breakdown:**
- Formspree integration: HIGH - Official documentation verified
- Asymmetric grid patterns: HIGH - CSS Grid fr units are standard
- Accessible form patterns: HIGH - WCAG guidelines verified
- FAQ accordion: HIGH - Native HTML, well-documented
- Editorial design patterns: MEDIUM - Trend-based, subjective
- Mobile responsiveness: HIGH - Standard Tailwind patterns

**Research date:** 2026-01-24
**Valid until:** 2026-02-24 (30 days - stable patterns)
