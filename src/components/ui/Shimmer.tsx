'use client'

/**
 * Subtle shimmer/sparkle background effect
 * Very faint gold particles that drift slowly for an elegant, polished feel
 */
export function Shimmer() {
  return (
    <div className="shimmer-container" aria-hidden="true">
      {/* Soft radial gradient for depth */}
      <div className="shimmer-gradient" />

      {/* Floating gold particles */}
      <div className="shimmer-particle shimmer-particle-1" />
      <div className="shimmer-particle shimmer-particle-2" />
      <div className="shimmer-particle shimmer-particle-3" />
      <div className="shimmer-particle shimmer-particle-4" />
      <div className="shimmer-particle shimmer-particle-5" />
      <div className="shimmer-particle shimmer-particle-6" />
      <div className="shimmer-particle shimmer-particle-7" />
      <div className="shimmer-particle shimmer-particle-8" />
    </div>
  )
}
