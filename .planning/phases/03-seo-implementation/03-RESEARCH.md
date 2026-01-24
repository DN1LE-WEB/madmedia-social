# Phase 3: SEO Implementation - Research

**Researched:** 2026-01-24
**Domain:** Next.js App Router SEO (Metadata API, JSON-LD Schema, Sitemap/Robots)
**Confidence:** HIGH

## Summary

Next.js 16 App Router provides a comprehensive, built-in Metadata API for SEO that replaces the older `next/head` approach. The API supports static `metadata` exports and dynamic `generateMetadata` functions for per-page SEO configuration. JSON-LD structured data is implemented by rendering `<script type="application/ld+json">` tags directly in page components - there is no special API for this.

For static export (`output: 'export'`), there is a **known compatibility issue** with `sitemap.ts` and `robots.ts` files. The workaround is to add `export const dynamic = 'force-static'` to these files, or alternatively use static `.xml`/`.txt` files in the `public` folder or the `next-sitemap` package for post-build generation.

**Primary recommendation:** Use Next.js built-in Metadata API for all meta tags (title, description, canonical, Open Graph, Twitter Cards). Implement JSON-LD as script tags in page components with XSS sanitization. For sitemap/robots with static export, use static files in `public/` folder for simplicity.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js Metadata API | 16.x | All meta tags, OG, Twitter Cards | Built-in, type-safe, supports static + dynamic |
| `schema-dts` | latest | TypeScript types for JSON-LD | Google-maintained, type-safe schemas |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `next-sitemap` | latest | Sitemap/robots.txt generation | If static export issues persist with built-in approach |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Built-in sitemap.ts | next-sitemap package | More features but adds dependency; built-in works with `force-static` |
| Manual JSON-LD | next-seo package | next-seo is Pages Router focused, Metadata API is recommended for App Router |

**Installation:**
```bash
npm install schema-dts
```

Note: `schema-dts` is optional but recommended for TypeScript type safety on JSON-LD.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── layout.tsx           # Base metadata (metadataBase, title template)
│   ├── page.tsx             # Homepage metadata + LocalBusiness/WebSite schema
│   ├── services/
│   │   └── page.tsx         # Services metadata + FAQPage schema
│   ├── about/
│   │   └── page.tsx         # About metadata + Person schema
│   ├── contact/
│   │   └── page.tsx         # Contact metadata
│   ├── sitemap.ts           # Sitemap generation (with force-static)
│   └── robots.ts            # Robots.txt generation (with force-static)
├── lib/
│   └── schema.ts            # Shared JSON-LD helper functions
└── public/
    └── opengraph-image.png  # Default OG image (1200x630)
```

### Pattern 1: Root Layout Base Metadata
**What:** Define `metadataBase` and title template in root layout
**When to use:** Always - provides defaults for entire site
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// src/app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://madmedia.social'),
  title: {
    template: '%s | MadMedia',
    default: 'MadMedia - Social Media Management & Website Services',
  },
  description: 'Professional social media management and website services for small businesses.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'MadMedia',
  },
  twitter: {
    card: 'summary_large_image',
  },
}
```

### Pattern 2: Per-Page Static Metadata
**What:** Export `metadata` object for pages with known, fixed content
**When to use:** All pages in this project (no dynamic routes)
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// src/app/services/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services', // Becomes "Services | MadMedia" via template
  description: 'Social media management and website services for small businesses.',
  alternates: {
    canonical: '/services/',
  },
  openGraph: {
    title: 'Services | MadMedia',
    description: 'Social media management and website services for small businesses.',
    url: '/services/',
  },
}
```

### Pattern 3: JSON-LD Schema Component
**What:** Render JSON-LD as script tag with XSS sanitization
**When to use:** Any page requiring structured data
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/guides/json-ld
// src/lib/schema.ts
export function JsonLd<T extends Record<string, unknown>>({ data }: { data: T }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}
```

### Pattern 4: Sitemap with Static Export Workaround
**What:** Use `force-static` export for static export compatibility
**When to use:** When using `output: 'export'` in next.config.js
**Example:**
```typescript
// Source: https://github.com/vercel/next.js/issues/68667
// src/app/sitemap.ts
import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://madmedia.social'

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/services/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/about/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]
}
```

### Anti-Patterns to Avoid
- **Mixing next-seo with Metadata API:** Don't use both - Metadata API is the standard for App Router
- **Forgetting metadataBase:** Without it, relative URLs in OG/canonical won't resolve correctly
- **Duplicate meta tags:** Don't manually add `<meta>` tags that the Metadata API generates
- **Unsanitized JSON-LD:** Always escape `<` characters to prevent XSS
- **Missing canonical on all pages:** Each page needs explicit canonical even if it's the same as URL

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Meta tag generation | Manual `<meta>` tags | Metadata API export | Type-safe, handles merging, automatic OG/Twitter |
| Title templating | String concatenation | `title.template` | Built-in, consistent, handles edge cases |
| Sitemap XML | Manual XML string | `sitemap.ts` with MetadataRoute.Sitemap | Type-safe, proper XML formatting |
| OG image tags | Manual meta tags | Static file or opengraph-image.tsx | Automatic dimension detection |
| Schema validation | Manual testing | schema-dts types | Compile-time validation |

**Key insight:** Next.js Metadata API handles all the complexity of meta tag deduplication, merging across layouts, and proper HTML escaping. JSON-LD is the only area requiring manual implementation.

## Common Pitfalls

### Pitfall 1: Static Export + sitemap.ts/robots.ts Failure
**What goes wrong:** Build fails with "export const dynamic = 'force-static' not configured" error
**Why it happens:** Known Next.js bug where metadata route handlers don't auto-detect static export mode
**How to avoid:** Add `export const dynamic = 'force-static'` to sitemap.ts and robots.ts
**Warning signs:** Build error mentioning `/robots.txt` or `/sitemap.xml` during "Collecting page data"

### Pitfall 2: OpenGraph Images Missing on Social Share
**What goes wrong:** Social media previews show no image or wrong image
**Why it happens:** Missing `metadataBase`, wrong image path, or missing `twitter:card` type
**How to avoid:** Set `metadataBase` in root layout, use absolute URLs or properly resolved relative paths, ensure `openGraph.type` is set
**Warning signs:** Facebook/Twitter debugger shows no image

### Pitfall 3: Metadata Shallow Merging Overwrites Parent
**What goes wrong:** Child page loses parent's openGraph settings
**Why it happens:** Metadata objects are shallow merged, not deep merged
**How to avoid:** Explicitly spread shared properties or define complete objects per page
**Warning signs:** Missing properties that were defined in parent layout

### Pitfall 4: JSON-LD XSS Vulnerability
**What goes wrong:** Malicious content in schema data could execute scripts
**Why it happens:** `JSON.stringify` doesn't escape `</script>` sequences
**How to avoid:** Replace `<` with `\u003c` in stringified JSON
**Warning signs:** Schema contains user-generated content without sanitization

### Pitfall 5: Canonical URLs Missing Trailing Slash
**What goes wrong:** Search engines see duplicate content (with/without slash)
**Why it happens:** Next.js `trailingSlash: true` config not reflected in canonical
**How to avoid:** Ensure canonical URLs include trailing slash to match `trailingSlash` config
**Warning signs:** Google Search Console shows duplicate pages

### Pitfall 6: FAQ Schema on Non-Authoritative Sites
**What goes wrong:** FAQPage schema validates but no rich results appear
**Why it happens:** Google restricts FAQ rich results to authoritative government/health sites
**How to avoid:** Implement schema anyway for semantic value, but don't expect rich snippets
**Warning signs:** Rich Results Test passes but no rich results in actual search

## Code Examples

Verified patterns from official sources:

### LocalBusiness Schema (Homepage)
```typescript
// Source: https://developers.google.com/search/docs/appearance/structured-data/local-business
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'MadMedia LLC',
  description: 'Professional social media management and website services for small businesses.',
  url: 'https://madmedia.social',
  telephone: '320-204-5840',
  email: 'madmedia56256@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Iron River',
    addressRegion: 'WI',
    addressCountry: 'US',
  },
  founder: {
    '@type': 'Person',
    name: 'Julie Asfeld',
  },
  areaServed: {
    '@type': 'State',
    name: 'Minnesota',
  },
}
```

### WebSite Schema (Homepage)
```typescript
// Source: https://schema.org/WebSite
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'MadMedia',
  url: 'https://madmedia.social',
}
```

### FAQPage Schema (Services Page)
```typescript
// Source: https://developers.google.com/search/docs/appearance/structured-data/faqpage
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How many social media platforms can you manage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Depends on your package. Starter includes 1 platform, Standard includes 2, and Premium covers up to 3 platforms of your choice.',
      },
    },
    // ... more questions
  ],
}
```

### Person Schema (About Page)
```typescript
// Source: https://schema.org/Person
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Julie Asfeld',
  jobTitle: 'Founder & Social Media Specialist',
  url: 'https://madmedia.social/about/',
  worksFor: {
    '@type': 'Organization',
    name: 'MadMedia LLC',
  },
  knowsAbout: ['Social Media Marketing', 'Website Design', 'Small Business Marketing'],
}
```

### BreadcrumbList Schema (All Pages)
```typescript
// Source: https://schema.org/BreadcrumbList
// Example for /services/ page
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@id': 'https://madmedia.social/',
        name: 'Home',
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@id': 'https://madmedia.social/services/',
        name: 'Services',
      },
    },
  ],
}
```

### Complete Page Metadata Example
```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// src/app/services/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Social media management packages and website services for small businesses. Starter, Standard, and Premium packages available.',
  alternates: {
    canonical: '/services/',
  },
  openGraph: {
    title: 'Services | MadMedia',
    description: 'Social media management packages and website services for small businesses.',
    url: '/services/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services | MadMedia',
    description: 'Social media management packages and website services for small businesses.',
  },
}
```

### robots.ts with Static Export
```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
// src/app/robots.ts
import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://madmedia.social/sitemap.xml',
  }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `next/head` component | Metadata API exports | Next.js 13.2 (2023) | Type-safe, server-side, no client JS |
| `next-seo` package | Built-in Metadata API | Next.js 13+ | Simpler, no dependency |
| Manual sitemap.xml | sitemap.ts file | Next.js 13.3 (2023) | Type-safe, dynamic generation |
| Manual robots.txt | robots.ts file | Next.js 13.3 (2023) | Type-safe, programmatic |
| `@next/third-parties` for schema | Direct script rendering | Current | No special package needed |

**Deprecated/outdated:**
- `next/head`: Still works but Metadata API is recommended for App Router
- `next-seo`: Designed for Pages Router, not recommended for App Router
- Separate `<Head>` components: Use metadata export instead

## Open Questions

Things that couldn't be fully resolved:

1. **Static export + sitemap.ts long-term fix**
   - What we know: `export const dynamic = 'force-static'` is the current workaround
   - What's unclear: Whether Next.js will auto-detect this in future versions
   - Recommendation: Use the workaround, works reliably

2. **OG image generation with static export**
   - What we know: Static image files work, dynamic generation may have issues
   - What's unclear: Full compatibility of `opengraph-image.tsx` with `output: 'export'`
   - Recommendation: Use static image file (`public/opengraph-image.png`) for reliability

3. **FAQPage rich results eligibility**
   - What we know: Google restricts to authoritative sites
   - What's unclear: Whether a small business site would ever qualify
   - Recommendation: Implement schema for semantic SEO value, don't rely on rich results

## Sources

### Primary (HIGH confidence)
- [Next.js generateMetadata API Reference](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) - Full metadata options, merging behavior
- [Next.js JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld) - Official pattern for structured data
- [Next.js sitemap.ts Reference](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) - MetadataRoute.Sitemap type
- [Next.js robots.ts Reference](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) - MetadataRoute.Robots type
- [Next.js opengraph-image Reference](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image) - OG/Twitter image conventions

### Secondary (MEDIUM confidence)
- [Google LocalBusiness Documentation](https://developers.google.com/search/docs/appearance/structured-data/local-business) - Schema requirements
- [Google FAQPage Documentation](https://developers.google.com/search/docs/appearance/structured-data/faqpage) - FAQ schema structure
- [Next.js Issue #68667](https://github.com/vercel/next.js/issues/68667) - Static export workaround verification

### Tertiary (LOW confidence)
- [next-sitemap GitHub](https://github.com/iamvishnusankar/next-sitemap) - Alternative sitemap generation
- [schema-dts GitHub](https://github.com/google/schema-dts) - TypeScript types for Schema.org

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official Next.js documentation is comprehensive
- Architecture: HIGH - Patterns are well-documented and verified
- Pitfalls: HIGH - Static export issue confirmed via GitHub issue tracking
- Schema markup: MEDIUM - Based on Google/Schema.org docs, may need validation

**Research date:** 2026-01-24
**Valid until:** 2026-02-24 (30 days - Next.js is stable)
