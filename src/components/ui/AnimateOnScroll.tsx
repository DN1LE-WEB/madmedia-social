'use client'

import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

interface AnimateOnScrollProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function AnimateOnScroll({
  children,
  className = '',
  delay = 0,
}: AnimateOnScrollProps) {
  // Start hydrated as false - content visible on SSR for LCP
  const [isHydrated, setIsHydrated] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  useEffect(() => {
    setIsHydrated(true)
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  }, [])

  // Before hydration or if reduced motion, show content immediately
  const shouldAnimate = isHydrated && !prefersReducedMotion
  const isVisible = !shouldAnimate || inView

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.95)',
        transition: shouldAnimate
          ? `opacity 500ms var(--ease-out-expo), transform 500ms var(--ease-out-expo)`
          : 'none',
        transitionDelay: shouldAnimate ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  )
}
