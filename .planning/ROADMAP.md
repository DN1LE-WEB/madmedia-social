# Roadmap: MadMedia.social

## Overview

This roadmap delivers a custom Next.js website for MadMedia LLC that looks unmistakably human-designed. The journey progresses from establishing a typography-forward design system, through building all pages with editorial layouts, implementing comprehensive SEO, and finishing with crafted animations and production optimization. The critical constraint throughout: nothing should look AI-generated.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3, 4): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [x] **Phase 1: Foundation & Design System** - Project scaffolding, typography, and reusable components ✓
- [x] **Phase 2: Core Pages** - Homepage, Services, About, and Contact pages with editorial layouts ✓
- [x] **Phase 3: SEO Implementation** - Meta tags, schema markup, sitemap, and social cards ✓
- [x] **Phase 4: Polish & Production** - Animations, performance optimization, and deployment readiness ✓

## Phase Details

### Phase 1: Foundation & Design System
**Goal**: Establish the technical foundation and design system that makes the site look unmistakably human-designed
**Depends on**: Nothing (first phase)
**Requirements**: TECH-01, TECH-02, TECH-03, DSGN-01, DSGN-03, DSGN-04, DSGN-08, DSGN-09
**Success Criteria** (what must be TRUE):
  1. Next.js 14+ project runs locally with TypeScript and Tailwind configured
  2. Typography uses character fonts (Fraunces/Playfair/similar), not generic system fonts
  3. Navigation component displays logo and links consistently
  4. Footer component shows contact info and placeholder social links
  5. Design tokens (colors, spacing, typography scales) are defined and documented

**Plans:** 2 plans

Plans:
- [x] 01-01-PLAN.md — Project setup with Next.js 15, TypeScript, Tailwind v4, fonts, and design tokens ✓
- [x] 01-02-PLAN.md — Navigation and Footer layout components ✓

### Phase 2: Core Pages
**Goal**: Build all four pages with editorial layouts that demonstrate intentional design choices
**Depends on**: Phase 1
**Requirements**: PAGE-01, PAGE-02, PAGE-03, PAGE-04, PAGE-05, PAGE-06, PAGE-07, PAGE-08, PAGE-09, DSGN-02, DSGN-06, DSGN-07
**Success Criteria** (what must be TRUE):
  1. Homepage displays editorial hero, services overview, and about preview with asymmetric layouts
  2. Services page shows all three social media packages with pricing and FAQ section
  3. About page features Julie with large photo moment and warm, personal copy
  4. Contact form submits to madmedia56256@gmail.com via Formspree and shows confirmation
  5. All pages render correctly from 320px to 1920px viewport widths

**Plans:** 3 plans

Plans:
- [x] 02-01-PLAN.md — Homepage with editorial hero, services overview, and about preview ✓
- [x] 02-02-PLAN.md — Services page with packages, website services, and FAQ ✓
- [x] 02-03-PLAN.md — About page with Julie bio and Contact page with Formspree form ✓

### Phase 3: SEO Implementation
**Goal**: Implement comprehensive SEO so search engines and social platforms understand and display the site correctly
**Depends on**: Phase 2
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, SEO-07, SEO-08, SEO-09, SEO-10, SEO-11, SEO-12, SEO-13, SEO-14
**Success Criteria** (what must be TRUE):
  1. Each page has unique title (50-60 chars), meta description (150-160 chars), and canonical tag
  2. Schema markup validates: LocalBusiness + WebSite (homepage), FAQPage (services), Person (about), BreadcrumbList (all)
  3. sitemap.xml and robots.txt exist and are accurate
  4. Social sharing preview (Open Graph + Twitter Cards) displays correctly when URL is shared

**Plans:** 2 plans

Plans:
- [x] 03-01-PLAN.md — Meta tags, Open Graph, Twitter Cards, sitemap, and robots.txt ✓
- [x] 03-02-PLAN.md — JSON-LD schema markup (LocalBusiness, FAQPage, Person, BreadcrumbList) ✓

### Phase 4: Polish & Production
**Goal**: Add crafted animations and ensure the site is production-ready with excellent performance
**Depends on**: Phase 3
**Requirements**: DSGN-05, TECH-04, TECH-05, TECH-06, TECH-07
**Success Criteria** (what must be TRUE):
  1. Page elements animate with staggered reveals and custom easing (no bounce, no parallax)
  2. Static export builds successfully and can be deployed to any hosting platform
  3. Lighthouse Performance score is 90+ and Accessibility score is 95+
  4. No console errors in production build

**Plans:** 2 plans

Plans:
- [x] 04-01-PLAN.md — AnimateOnScroll component, Button hover effects, and entrance animations on all pages ✓
- [x] 04-02-PLAN.md — Reduced motion accessibility, Lighthouse audits, and production verification ✓

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Design System | 2/2 | Complete ✓ | 2026-01-24 |
| 2. Core Pages | 3/3 | Complete ✓ | 2026-01-24 |
| 3. SEO Implementation | 2/2 | Complete ✓ | 2026-01-24 |
| 4. Polish & Production | 2/2 | Complete ✓ | 2026-01-24 |

---
*Roadmap created: 2026-01-24*
*Last updated: 2026-01-24 — Milestone v1 Complete*
