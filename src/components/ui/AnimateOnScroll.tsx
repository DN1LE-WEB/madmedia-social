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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  }, [])

  // If reduced motion, show immediately without animation
  const shouldAnimate = !prefersReducedMotion
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
