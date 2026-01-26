'use client'

import Image from 'next/image'
import { Container, Button, AnimateOnScroll } from '@/components/ui'

export function AboutPreview() {
  return (
    <section className="py-section">
      <Container>
        {/* Asymmetric 60/40 layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 items-center">
          {/* Left side - 60% on desktop */}
          <div>
            <AnimateOnScroll>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl">
                Meet Julie
              </h2>
            </AnimateOnScroll>
            <p className="mt-6 text-lg text-text-muted leading-relaxed">
              As a small business owner myself, I know how hard it is to find time
              for social media. That&apos;s why I started MadMedia.
            </p>
            <p className="mt-4 text-lg text-text-muted leading-relaxed">
              Based in Madison, MN, I help local businesses and entrepreneurs show
              up online without the stress — so you can focus on what you do best.
            </p>
            <AnimateOnScroll delay={100}>
              <div className="mt-8">
                <Button href="/about" variant="secondary">
                  About Julie
                </Button>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Right side - 40% on desktop */}
          <div className="order-first lg:order-last">
            <div className="relative aspect-square">
              <Image
                src="/julie-promo.jpg"
                alt="Julie Asfeld - MadMedia Social Media Management"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
