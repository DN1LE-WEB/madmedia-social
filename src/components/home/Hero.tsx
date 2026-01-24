'use client'

import { Container, AnimateOnScroll } from '@/components/ui'

export function Hero() {
  return (
    <section className="py-section-lg">
      <Container>
        {/* Oversized headline - typography IS the visual */}
        <AnimateOnScroll>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight">
            MadMedia
            <br />
            <span className="text-accent">Social Media That Works</span>
          </h1>
        </AnimateOnScroll>

        {/* Asymmetric subheadline positioned right */}
        <AnimateOnScroll delay={100}>
          <p className="mt-8 text-xl md:text-2xl text-text-muted max-w-xl ml-auto text-right">
            Helping small businesses in Madison, MN and beyond grow their online presence.
          </p>
        </AnimateOnScroll>

        {/* Decorative line element */}
        <div className="mt-12 h-px bg-primary/20 w-2/3" />
      </Container>
    </section>
  )
}
