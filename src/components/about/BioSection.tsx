'use client'

import Image from 'next/image'
import { AnimateOnScroll } from '@/components/ui'

export function BioSection() {
  return (
    <section className="py-section-lg">
      <div className="mx-auto max-w-[var(--width-content)] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16 items-center">
          {/* Photo - takes 40% on large screens */}
          <div className="relative aspect-[3/4] lg:aspect-[4/5]">
            <Image
              src="/julie.jpg"
              alt="Julie Asfeld, Founder of MadMedia"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>

          {/* Bio text - 60% on large screens */}
          <div>
            <AnimateOnScroll>
              <h1 className="font-display text-4xl lg:text-5xl">
                Meet Julie
              </h1>
            </AnimateOnScroll>
            <p className="mt-8 text-lg text-text-muted leading-relaxed">
              As a small business owner myself, I know how hard it is to find time
              for social media while running everything else. That's why I started
              MadMedia - to help businesses in Madison, MN and beyond show up
              online without the stress.
            </p>
            <p className="mt-6 text-lg text-text-muted leading-relaxed">
              I believe every small business deserves a professional online
              presence. Whether you need help with social media, a new website,
              or both, I'm here to make it happen.
            </p>
            <p className="mt-6 text-lg text-text-muted leading-relaxed">
              When I'm not creating content or building websites, you'll find me
              exploring our beautiful Minnesota lakes and spending time with family.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
