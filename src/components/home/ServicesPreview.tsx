'use client'

import Link from 'next/link'
import { Container, AnimateOnScroll } from '@/components/ui'

const services = [
  {
    title: 'Social Media Management',
    description:
      'From content creation to community engagement, we handle your social presence so you can focus on running your business.',
    icon: 'SM',
  },
  {
    title: 'Website Services',
    description:
      'Custom, mobile-responsive websites designed to convert visitors into customers, plus ongoing maintenance to keep everything running smoothly.',
    icon: 'WS',
  },
]

export function ServicesPreview() {
  return (
    <section className="py-section bg-background-warm">
      <Container>
        <AnimateOnScroll>
          <h2 className="font-display text-3xl md:text-4xl">What We Do</h2>
        </AnimateOnScroll>

        {/* Two-column grid for services - NOT generic cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="border-t-2 border-primary/20 pt-6"
            >
              {/* Icon placeholder */}
              <span className="inline-block w-12 h-12 bg-primary text-background font-display text-lg flex items-center justify-center mb-4">
                {service.icon}
              </span>

              <h3 className="font-display text-xl">{service.title}</h3>
              <p className="mt-4 text-text-muted leading-relaxed">
                {service.description}
              </p>

              <AnimateOnScroll delay={100 + index * 100}>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 mt-6 text-primary hover:text-accent transition-colors duration-300 font-medium"
                >
                  Learn more
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </AnimateOnScroll>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
