'use client'

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
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'scale(1)' : 'scale(0.95)',
        transition: `opacity 500ms var(--ease-out-expo), transform 500ms var(--ease-out-expo)`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
