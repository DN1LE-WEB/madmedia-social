# Phase 4: Polish & Production - Research

**Researched:** 2026-01-24
**Domain:** Animations, Performance Optimization, Accessibility, Static Export
**Confidence:** HIGH

## Summary

This phase adds scroll-triggered animations to headlines and CTAs, implements hover microinteractions, and ensures production readiness with Lighthouse 90+ Performance and 95+ Accessibility scores. The project already has a clean static export configuration and passes build without errors.

Research identified that CSS-based animations with Intersection Observer provide the best balance of performance and simplicity for this use case. The `react-intersection-observer` library (v10.0.2) is the standard React solution, providing a clean `useInView` hook with TypeScript support. For the animation style specified (fade + scale from 95% to 100%, 400-600ms, custom easing), CSS transitions controlled by state are the optimal approach -- no animation library needed.

The existing codebase already has custom easing curves defined in `globals.css` (`--ease-out-expo` and `--ease-out-quart`), fonts optimized with `next/font` and `display: 'swap'`, and static export properly configured. The focus is adding animation utilities without disrupting the existing architecture.

**Primary recommendation:** Use `react-intersection-observer` with CSS transitions and Tailwind classes. Create a reusable `AnimateOnScroll` client component that wraps content and applies fade/scale animations when 30% visible.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react-intersection-observer | ^10.0.2 | Scroll-triggered visibility detection | Most popular React IO solution, ~3M weekly downloads, excellent TypeScript support, clean hook API |
| CSS transitions | Native | Animation execution | GPU-accelerated, no JS runtime overhead, respects `prefers-reduced-motion` |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @next/bundle-analyzer | ^16.0.0 | Bundle size analysis | Pre-deployment verification |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| react-intersection-observer | Custom hook with native IO API | More code, less tested edge cases |
| CSS transitions | Framer Motion | Adds ~50kb to bundle, requires 'use client', overkill for fade/scale |
| CSS transitions | GSAP | Heavy (~60kb), complex, designed for complex choreography |

**Installation:**
```bash
npm install react-intersection-observer
npm install --save-dev @next/bundle-analyzer
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   └── ui/
│       └── AnimateOnScroll.tsx    # Reusable scroll animation wrapper
├── styles/
│   └── globals.css               # Animation keyframes + easing (already exists)
```

### Pattern 1: AnimateOnScroll Wrapper Component
**What:** A client component that wraps content and animates it when scrolled into view
**When to use:** Headlines, section titles, CTAs, any element needing entrance animation

```typescript
// Source: react-intersection-observer official API + project CONTEXT.md requirements
'use client'

import { useInView } from 'react-intersection-observer'

interface AnimateOnScrollProps {
  children: React.ReactNode
  className?: string
  delay?: number // stagger delay in ms
}

export function AnimateOnScroll({
  children,
  className = '',
  delay = 0
}: AnimateOnScrollProps) {
  const { ref, inView } = useInView({
    threshold: 0.3,      // 30% visible triggers animation
    triggerOnce: true,   // Only animate once
  })

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'scale(1)' : 'scale(0.95)',
        transition: `opacity 500ms var(--ease-out-expo) ${delay}ms, transform 500ms var(--ease-out-expo) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
```

### Pattern 2: CSS-Only Hover Microinteractions
**What:** Subtle hover effects using Tailwind transition utilities
**When to use:** Buttons, links, interactive elements

```typescript
// Button hover pattern (enhance existing Button component)
// transition-all duration-300 ease-out
// hover:translate-y-[-2px] hover:shadow-md

// Link hover pattern
// transition-colors duration-300
// hover:text-accent
```

### Pattern 3: Reduced Motion Support
**What:** Respecting user's motion preferences
**When to use:** All animated elements

```css
/* In globals.css */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

```typescript
// In AnimateOnScroll component - check for reduced motion
const prefersReducedMotion = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// If reduced motion, show content immediately without animation
```

### Anti-Patterns to Avoid
- **Animating every element:** Per CONTEXT.md, only animate headlines and CTAs
- **Long animation durations:** Max 600ms per PROJECT.md, stick to 400-500ms
- **Parallax effects:** Explicitly forbidden in PROJECT.md
- **Bounce easing:** Explicitly forbidden in CONTEXT.md
- **Re-animating on scroll back:** Use `triggerOnce: true`
- **Animating properties other than opacity/transform:** These trigger repaints, causing jank

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Intersection Observer logic | Custom useEffect + native IO | react-intersection-observer | Edge cases (cleanup, SSR, ref merging) already handled |
| Animation timing | Manual setTimeout chains | CSS transitions with delay | GPU-accelerated, respects reduced-motion |
| Staggered reveals | Individual timeouts | CSS transition-delay or stagger prop | Cleaner, more maintainable |
| Bundle analysis | Manual inspection | @next/bundle-analyzer | Visual treemap shows issues immediately |

**Key insight:** CSS transitions handle 95% of entrance animation needs without adding JS bundle weight. The only JS needed is visibility detection, which react-intersection-observer handles perfectly.

## Common Pitfalls

### Pitfall 1: Layout Shift from Animations
**What goes wrong:** Elements start invisible/scaled, causing CLS when they animate in
**Why it happens:** Content reserving no space until animation completes
**How to avoid:** Always reserve space with explicit dimensions or use `scale()` (doesn't affect layout)
**Warning signs:** Lighthouse CLS score drops, content jumps on scroll

### Pitfall 2: Animation Blocking SSR/Static Export
**What goes wrong:** Using animation libraries that require hydration before showing content
**Why it happens:** Framer Motion and similar need client-side React to render initial state
**How to avoid:** Use CSS transitions with inline styles; content is visible in static HTML
**Warning signs:** Flash of unstyled content, content invisible until JS loads

### Pitfall 3: Ignoring Reduced Motion Preference
**What goes wrong:** Users with vestibular disorders experience motion sickness
**Why it happens:** Forgetting to check `prefers-reduced-motion` media query
**How to avoid:** Add global CSS rule or check in JS before animating
**Warning signs:** Lighthouse accessibility audit flags motion issues

### Pitfall 4: Over-Animating
**What goes wrong:** Site feels chaotic, slow, or "AI-generated"
**Why it happens:** Animating every element, using bouncy/playful easing
**How to avoid:** Per CONTEXT.md - only headlines, CTAs; use elegant ease-out curves
**Warning signs:** User testing feedback, design review concerns

### Pitfall 5: Static Export Image Optimization
**What goes wrong:** Images not optimized, large file sizes hurt performance
**Why it happens:** Default `next/image` optimization requires server
**How to avoid:** Project already uses `images: { unoptimized: true }`; manually optimize images with WebP, appropriate sizes
**Warning signs:** Lighthouse flags large images, slow LCP

## Code Examples

Verified patterns from official sources:

### Complete AnimateOnScroll Component
```typescript
// Source: react-intersection-observer v10 API + CONTEXT.md requirements
'use client'

import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'

interface AnimateOnScrollProps {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: keyof JSX.IntrinsicElements
}

export function AnimateOnScroll({
  children,
  className = '',
  delay = 0,
  as: Component = 'div'
}: AnimateOnScrollProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  }, [])

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  // If reduced motion, show immediately
  const shouldAnimate = !prefersReducedMotion
  const isVisible = !shouldAnimate || inView

  return (
    <Component
      ref={ref}
      className={className}
      style={shouldAnimate ? {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.95)',
        transition: `opacity 500ms var(--ease-out-expo) ${delay}ms, transform 500ms var(--ease-out-expo) ${delay}ms`,
      } : undefined}
    >
      {children}
    </Component>
  )
}
```

### Usage in Hero Component
```typescript
// Source: Pattern application to existing Hero.tsx
import { AnimateOnScroll } from '@/components/ui'

export function Hero() {
  return (
    <section className="py-section-lg">
      <Container>
        <AnimateOnScroll>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight">
            MadMedia
            <br />
            <span className="text-accent">Social Media That Works</span>
          </h1>
        </AnimateOnScroll>

        <AnimateOnScroll delay={100}>
          <p className="mt-8 text-xl md:text-2xl text-text-muted max-w-xl ml-auto text-right">
            Helping small businesses in Madison, MN and beyond grow their online presence.
          </p>
        </AnimateOnScroll>
      </Container>
    </section>
  )
}
```

### Button Hover Enhancement
```typescript
// Source: Tailwind CSS transition utilities
// Enhance existing Button component

const baseStyles = `
  inline-block px-8 py-4 font-medium
  transition-all duration-300 ease-out
  hover:translate-y-[-2px] hover:shadow-md
`
```

### Reduced Motion CSS
```css
/* Source: MDN prefers-reduced-motion documentation */
/* Add to globals.css */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Custom Easing Values
```css
/* Source: easings.net + existing globals.css */
/* Already defined in globals.css */

@theme {
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);   /* Sharp start, smooth end */
  --ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1); /* Slightly less dramatic */
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Framer Motion for everything | CSS + IO for simple animations | 2024-2025 | 50kb+ bundle reduction |
| scroll event listeners | Intersection Observer API | 2020+ | Better performance, async |
| jQuery animations | CSS transitions/animations | 2015+ | GPU acceleration |
| Global CSS animation reset | Per-component reduced-motion check | 2024+ | More nuanced accessibility |

**Deprecated/outdated:**
- `scroll` event for visibility detection: Use Intersection Observer instead
- Web Animation API for simple transitions: CSS handles this more efficiently
- Heavy animation libraries for entrance effects: Overkill for fade/scale

## Lighthouse Optimization Checklist

### Performance (90+ target)
- [x] Fonts use `next/font` with `display: 'swap'` (already configured)
- [x] Static export enabled (already configured)
- [ ] Images optimized (WebP, appropriate sizes)
- [ ] Minimal JS bundle (no heavy animation libraries)
- [ ] CSS transitions instead of JS animations

### Accessibility (95+ target)
- [ ] `prefers-reduced-motion` respected
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] All images have alt text (already done in Phase 2)
- [ ] Semantic HTML structure (already done)
- [ ] Focus states visible on interactive elements

### Best Practices
- [ ] No console errors in production build
- [ ] HTTPS (deployment concern)
- [ ] No deprecated APIs

## Open Questions

Things that couldn't be fully resolved:

1. **Image optimization strategy for static export**
   - What we know: `next/image` with default loader requires server; project uses `unoptimized: true`
   - What's unclear: Best approach for manual optimization (build tool? external service?)
   - Recommendation: Manually convert images to WebP and create responsive sizes, or use a cloud image service (Cloudinary, imgix) with custom loader

2. **Bundle analyzer integration with Next.js 16**
   - What we know: @next/bundle-analyzer works with Next.js
   - What's unclear: Any compatibility issues with v16 specifically
   - Recommendation: Install and test during implementation; fallback to `next build --debug` if issues

## Sources

### Primary (HIGH confidence)
- Next.js Official Docs - Static Exports: https://nextjs.org/docs/app/guides/static-exports
- Next.js Production Checklist: https://nextjs.org/docs/app/guides/production-checklist
- react-intersection-observer GitHub (v10.0.2): https://github.com/thebuilder/react-intersection-observer
- MDN prefers-reduced-motion: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- easings.net (cubic-bezier values): https://easings.net/

### Secondary (MEDIUM confidence)
- Chrome Developers - Lighthouse Accessibility Scoring: https://developer.chrome.com/docs/lighthouse/accessibility/scoring
- Builder.io - React Intersection Observer Guide: https://www.builder.io/blog/react-intersection-observer
- Josh Comeau - Accessible Animations in React: https://www.joshwcomeau.com/react/prefers-reduced-motion/

### Tertiary (LOW confidence - WebSearch only)
- Various Medium articles on Next.js performance optimization
- Community discussions on Framer Motion vs CSS

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - react-intersection-observer is well-established, API verified
- Architecture: HIGH - Patterns derived from official docs and CONTEXT.md constraints
- Pitfalls: MEDIUM - Based on common issues, may be others specific to this project
- Static export: HIGH - Verified against current next.config.js and test build

**Research date:** 2026-01-24
**Valid until:** 2026-02-24 (30 days - stable technologies)
