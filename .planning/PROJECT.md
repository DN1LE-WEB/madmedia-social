# MadMedia.social Website Rebuild

## What This Is

A complete website rebuild for MadMedia LLC — a social media management and website services company based in Madison, MN. Replacing the current Squarespace site with a custom-built, self-hosted Next.js solution that elevates the brand with sophisticated, editorial design that distinctly does NOT look AI-generated.

## Core Value

**The site must look unmistakably human-designed** — a designer would believe another designer made it. Everything else (SEO, performance, features) serves this constraint.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Homepage with editorial hero, services overview, and about preview
- [ ] Services page with social media packages (Starter/Standard/Premium with pricing) and website services (design/maintenance with pricing)
- [ ] About page featuring Julie Asfeld with large photo moment and personal warmth
- [ ] Contact page with form submissions to madmedia56256@gmail.com
- [ ] Navigation and footer consistent across all pages
- [ ] Mobile-responsive design (320px - 1920px)
- [ ] Full SEO implementation (meta tags, schema markup, sitemap, robots.txt)
- [ ] FAQ section on services page for SEO/AEO
- [ ] Design that passes the "not AI-generated" test — asymmetry, typography with character, intentional whitespace, crafted animations
- [ ] Deployable to Hostinger or similar hosting platforms

### Out of Scope

- E-commerce/cart functionality — not needed despite cart icon on current site
- Blog — not mentioned, can be v2
- Client portal/dashboard — simple contact form only
- CMS integration — static content is fine for v1
- Multi-language support — English only

## Context

### Client

- **Company:** MadMedia LLC
- **Owner:** Julie Asfeld, Founder
- **Location:** Madison, MN 56256
- **Phone:** 320-204-5840
- **Email:** madmedia56256@gmail.com
- **Domain:** madmedia.social (keeping existing domain)

### Current State

- Site currently on Squarespace
- Functional but doesn't reflect the professional, elevated brand Julie wants
- Has logo (gold/black) and one photo of Julie available as assets

### Services Offered

**Social Media Management:**
| Package | Price | Posts/Month | Content | Engagement | Platforms |
|---------|-------|-------------|---------|------------|-----------|
| Starter | $300/mo | 8 | Basic | Community | 1 |
| Standard | $600/mo | 16 | Advanced | Community | 2 |
| Premium | $900/mo | 24 | Comprehensive | Strategic | 3 |

**Website Services:** (pricing to be structured similarly)
- Website Design — custom, mobile-responsive sites for small businesses
- Website Maintenance — updates, security, backups, technical support
- Bundling available with social media packages

### Design Direction

**Aesthetic:** Refined editorial minimalism with character. High-end design studio meets boutique agency. NOT a SaaS landing page.

**Typography (AVOID):** Inter, Roboto, Poppins, Open Sans, Montserrat, Lato, Nunito
**Typography (CONSIDER):** Fraunces, Playfair Display, Sora, Plus Jakarta Sans, DM Sans, Work Sans

**Color Palette:**
- Primary: Near-black (#1a1a1a), soft dark (#2d2d2d)
- Accent: Gold (#c9a227), light gold (#e8d48a), dark gold (#9a7b1c)
- Background: Off-white (#fafafa), warm cream (#f5f3ef)
- Text: #1a1a1a, muted #6b6b6b

**Layout Principles:**
- Max width 1200px (tighter = more editorial)
- Asymmetric grids, 60/40 splits
- Dramatic whitespace (120px+ between sections)
- Full-bleed moments, intentional overlap

**Animation Philosophy:**
- Staggered reveals, subtle fades
- Custom easing (ease-out-expo, ease-out-quart)
- NO bounce, NO parallax, NO scroll-jacking
- Max 600ms duration

### Available Assets

- Logo: `https://images.squarespace-cdn.com/content/v1/67d8ced18226dc60625a0c27/0a31c5cb-90b2-4960-8b7e-d7d15c02181e/20240131_222722_B257B2C0-3867-4C38-AFDD-646637.png`
- Julie's photo: `https://images.squarespace-cdn.com/content/v1/67d8ced18226dc60625a0c27/f2d01c6f-46f2-4331-856f-cf2396010ada/White+Yellow+Modern+Social+Media+Marketing+Instagram+Post.png`
- That's it — design must carry the weight

### SEO Requirements

- Unique title/meta per page
- One H1 per page, semantic HTML
- LocalBusiness schema (Homepage)
- FAQPage schema (Services)
- BreadcrumbList schema (all pages)
- WebSite schema (Homepage)
- Person schema (About - Julie)
- Open Graph + Twitter Card tags
- sitemap.xml, robots.txt
- Target keywords defined per page

## Constraints

- **Design:** Must NOT look AI-generated — this is the primary constraint driving all decisions
- **Tech Stack:** Next.js 14+ with App Router, TypeScript, Tailwind CSS
- **Hosting:** Must be deployable to Hostinger or similar (not Vercel-locked)
- **Assets:** Limited to 1 logo + 1 photo — typography and layout must do heavy lifting
- **Contact:** Form submissions via Formspree to existing email, no backend needed
- **Skills:** Must follow `/mnt/skills/public/frontend-design/SKILL.md` and `/mnt/skills/user/weblaunchpad-seo-aeo/SKILL.md`

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js 14+ with App Router | Modern React, great SEO, flexible deployment | — Pending |
| Formspree for contact form | No backend needed, reliable, simple | — Pending |
| Static export for hosting flexibility | Can deploy anywhere, not Vercel-locked | — Pending |
| Typography-forward design | Limited photos means type must carry visual weight | — Pending |

---
*Last updated: 2026-01-24 after initialization*
