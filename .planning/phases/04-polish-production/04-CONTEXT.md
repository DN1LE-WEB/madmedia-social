# Phase 4: Polish & Production - Context

**Gathered:** 2026-01-24
**Status:** Ready for planning

<domain>
## Phase Boundary

Add crafted animations and ensure the site is production-ready with excellent performance. Includes entrance animations, hover microinteractions, static export configuration, and Lighthouse optimization. New features or pages are out of scope.

</domain>

<decisions>
## Implementation Decisions

### Animation Style
- Deliberate & elegant feel — moderate movements, 400-600ms durations, clearly intentional reveals
- Animate headlines & CTAs only — hero text, section titles, buttons (not every element)
- Fade + scale entrance motion — fade in while scaling from 95% to 100%
- No bounce easing, no parallax effects

### Animation Triggers
- Trigger on scroll into view — not on page load
- 30% threshold — animate when element is roughly one-third visible
- Once only — no replay when scrolling back up
- Reduced motion: disable all animations if prefers-reduced-motion is set (show instantly)

### Claude's Discretion
- Hover microinteractions on buttons/links — pick appropriate subtle effects
- Exact easing curves (ease-out, custom cubic-bezier)
- Specific animation library or vanilla CSS approach
- Image optimization strategy (WebP, srcset, lazy loading)
- Font loading strategy (swap, preload)
- Bundle optimization approach

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches for performance optimization and static export.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-polish-production*
*Context gathered: 2026-01-24*
