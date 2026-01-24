---
phase: 03-seo-implementation
plan: 01
subsystem: seo
tags: [next.js, metadata-api, sitemap, robots, opengraph, twitter-cards]
dependency-graph:
  requires: [02-01, 02-02, 02-03]
  provides: [meta-tags, sitemap, robots, canonical-urls, og-tags, twitter-cards]
  affects: [03-02]
tech-stack:
  added: []
  patterns: [metadata-api, metadataBase, title-template, force-static-export]
key-files:
  created:
    - src/app/sitemap.ts
    - src/app/robots.ts
  modified:
    - src/app/layout.tsx
    - src/app/page.tsx
    - src/app/services/page.tsx
    - src/app/about/page.tsx
    - src/app/contact/page.tsx
decisions:
  - id: metadataBase-url
    decision: "Use https://madmedia.social as metadataBase"
    rationale: "Required for proper canonical and OG URL resolution"
  - id: title-template
    decision: "Title template '%s | MadMedia' for subpages"
    rationale: "Consistent branding while keeping page names first for SEO"
  - id: force-static-sitemap
    decision: "Use force-static for sitemap.ts and robots.ts"
    rationale: "Required workaround for static export compatibility (Next.js issue #68667)"
metrics:
  duration: 3m 25s
  completed: 2026-01-24
---

# Phase 3 Plan 1: Meta Tags, Sitemap & Robots Summary

Next.js Metadata API configured with metadataBase, title template, and per-page exports for all 4 pages with unique titles, descriptions, canonical URLs, and Open Graph tags. Sitemap and robots.txt generated via force-static exports.

## Completed Tasks

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Configure root layout base metadata | c695c77 | src/app/layout.tsx |
| 2 | Add per-page metadata exports | f1b017d | src/app/page.tsx, services/page.tsx, about/page.tsx, contact/page.tsx |
| 3 | Create sitemap.ts and robots.ts | f3b5494 | src/app/sitemap.ts, src/app/robots.ts |

## What Was Built

### Root Layout Metadata (layout.tsx)
- `metadataBase: new URL('https://madmedia.social')` - required for URL resolution
- Title template: `'%s | MadMedia'` for subpages, default for homepage
- Default Open Graph: type='website', locale='en_US', siteName='MadMedia'
- Default Twitter Card: 'summary_large_image'

### Per-Page Metadata
| Page | Title | Description Length | Canonical |
|------|-------|-------------------|-----------|
| Homepage | MadMedia - Social Media Management & Website Services | 105 chars | / |
| Services | Services | MadMedia | 157 chars | /services/ |
| About | About | MadMedia | 147 chars | /about/ |
| Contact | Contact | MadMedia | 153 chars | /contact/ |

### Sitemap & Robots
- **sitemap.xml**: Lists all 4 pages with priorities (1.0, 0.8, 0.7, 0.7)
- **robots.txt**: Allows all crawlers, references sitemap URL
- Both use `export const dynamic = 'force-static'` for static export compatibility

## Verification Results

All success criteria verified:
- [x] Build completes without errors
- [x] Each page has unique title using template pattern
- [x] Each page has unique meta description (147-157 chars)
- [x] Each page has canonical tag with trailing slash
- [x] Open Graph tags render for all pages (title, description, url)
- [x] Twitter Card tags render for all pages
- [x] sitemap.xml lists all 4 pages with madmedia.social domain
- [x] robots.txt allows all crawlers and references sitemap

## Deviations from Plan

None - plan executed exactly as written.

## Decisions Made

1. **metadataBase URL**: Set to `https://madmedia.social` - required for proper resolution of relative canonical and OG URLs
2. **Title template pattern**: `'%s | MadMedia'` puts page name first (better for SEO) with brand suffix
3. **force-static export**: Used as per RESEARCH.md Pitfall 1 to ensure sitemap.ts and robots.ts work with static export

## Next Phase Readiness

**Ready for:** Plan 03-02 (JSON-LD Structured Data)

**Dependencies satisfied:**
- metadataBase established for URL resolution
- All pages have metadata exports where JSON-LD can be added
- Sitemap and robots complete

**Blockers:** None
