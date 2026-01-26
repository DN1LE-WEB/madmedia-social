'use client'

import Image from 'next/image'
import { Container, AnimateOnScroll } from '@/components/ui'

export function Hero() {
  return (
    <>
      {/* === ORIGINAL HERO (active) === */}
      <section className="py-section">
        <Container>
          <AnimateOnScroll>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
              MadMedia
              <br />
              <span className="text-accent">Social Media That Works</span>
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll delay={100}>
            <p className="mt-6 text-lg md:text-xl text-text-muted max-w-md ml-auto text-right">
              Helping small businesses in Madison, MN and beyond grow their online presence.
            </p>
          </AnimateOnScroll>

          <div className="mt-8 h-px bg-primary/20 w-1/2" />
        </Container>
      </section>

      {/* === HERO WITH BACKGROUND IMAGE (uncomment to use header overlap version) ===
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/hero-bg.png"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <Container className="pt-72 pb-section-lg">
          <AnimateOnScroll>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-white">
              MadMedia
              <br />
              <span className="text-accent">Social Media That Works</span>
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll delay={100}>
            <p className="mt-8 text-xl md:text-2xl text-white/80 max-w-xl ml-auto text-right">
              Helping small businesses in Madison, MN and beyond grow their online presence.
            </p>
          </AnimateOnScroll>

          <div className="mt-12 h-px bg-white/30 w-2/3" />
        </Container>
      </section>
      === END HERO WITH BACKGROUND IMAGE === */}
    </>
  )
}
