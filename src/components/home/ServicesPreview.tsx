'use client'

import Link from 'next/link'
import { Container, AnimateOnScroll } from '@/components/ui'

const services = [
  {
    title: 'Social Media Management',
    description:
      'From content creation to community engagement, we handle your social presence so you can focus on running your business.',
    number: '01',
  },
  {
    title: 'Website Services',
    description:
      'Custom, mobile-responsive websites designed to convert visitors into customers, plus ongoing maintenance to keep everything running smoothly.',
    number: '02',
  },
]

export function ServicesPreview() {
  return (
    <section className="py-section bg-background-warm">
      <Container>
        <AnimateOnScroll>
          <h2 className="font-display text-3xl md:text-4xl">What We Do</h2>
        </AnimateOnScroll>

        {/* Editorial two-column layout */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative"
            >
              {/* Large editorial number with gold accent */}
              <div className="flex items-start gap-6">
                <span className="font-display text-6xl md:text-7xl text-accent/20 leading-none select-none group-hover:text-accent/40 transition-colors duration-500">
                  {service.number}
                </span>

                <div className="pt-2 flex-1">
                  {/* Gold accent line */}
                  <div className="w-12 h-0.5 bg-accent mb-4" />

                  <h3 className="font-display text-xl md:text-2xl">{service.title}</h3>
                  <p className="mt-4 text-text-muted leading-relaxed">
                    {service.description}
                  </p>

                  <AnimateOnScroll delay={100 + index * 100}>
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-2 mt-6 text-primary hover:text-accent transition-colors duration-300 font-medium group/link"
                    >
                      <span>Learn more</span>
                      <span
                        aria-hidden="true"
                        className="transform group-hover/link:translate-x-1 transition-transform duration-300"
                      >
                        &rarr;
                      </span>
                    </Link>
                  </AnimateOnScroll>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
