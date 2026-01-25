'use client'

import Image from 'next/image'
import { AnimateOnScroll } from '@/components/ui'

export function BioSection() {
  return (
    <section className="py-section-lg">
      <div className="mx-auto max-w-[var(--width-content)] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16 items-center">
          {/* Photo - takes 40% on large screens */}
          <div className="relative aspect-square">
            <Image
              src="/julie-promo.jpg"
              alt="Julie Asfeld, Founder of MadMedia"
              fill
              className="object-contain"
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
              Hi, I'm Julie Asfeld, the founder of MadMedia, where I provide social
              media management services. MadMedia was established in 2023, but my
              passion for social media began long before that. Over the years, I've
              honed my skills in content creation, strategy development, community
              engagement, and performance analytics.
            </p>
            <p className="mt-6 text-lg text-text-muted leading-relaxed">
              Throughout my career, I've worked with businesses in various fields,
              gaining a versatile understanding of what it takes to succeed on
              different platforms.
            </p>
            <p className="mt-6 text-lg text-text-muted leading-relaxed">
              I'm a strong believer in the power of social media to connect people
              and drive business growth, and I love tackling new challenges. Whether
              it's developing a brand-new social strategy, running paid ad campaigns,
              or creating eye-catching content, I'm always up for the next challenge.
            </p>
            <p className="mt-6 text-lg text-text-muted leading-relaxed">
              At MadMedia, my goal is to create personalized, innovative strategies
              that help businesses thrive in the digital world. I look forward to
              working with you to take your brand to new heights!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
