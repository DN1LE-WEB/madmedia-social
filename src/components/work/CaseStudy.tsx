import Image from 'next/image'
import { Container, AnimateOnScroll } from '@/components/ui'

export interface CaseStudyData {
  number: string
  name: string
  url: string
  domain: string
  slug: string
  summary: string
  features: string[]
}

interface CaseStudyProps extends CaseStudyData {
  imageExists: boolean
  flip?: boolean
  warm?: boolean
  priority?: boolean
}

function ScreenshotFrame({
  name,
  slug,
  domain,
  imageExists,
  priority,
}: Pick<CaseStudyProps, 'name' | 'slug' | 'domain' | 'imageExists' | 'priority'>) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden border border-primary/10 bg-white shadow-lg transition-all duration-500 group-hover:translate-y-[-4px] group-hover:shadow-xl">
      {imageExists ? (
        <Image
          src={`/work/${slug}-desktop.png`}
          alt={`Homepage of the ${name} website`}
          fill
          priority={priority}
          className="object-cover object-top"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background-warm px-6 text-center">
          <span className="font-display text-2xl md:text-3xl">{name}</span>
          <div className="mt-4 h-0.5 w-12 bg-accent" aria-hidden="true" />
          <span className="mt-4 text-sm uppercase tracking-wide text-text-muted">
            {domain}
          </span>
        </div>
      )}
    </div>
  )
}

export function CaseStudy({
  number,
  name,
  url,
  domain,
  slug,
  summary,
  features,
  imageExists,
  flip = false,
  warm = false,
  priority = false,
}: CaseStudyProps) {
  return (
    <section className={`py-section ${warm ? 'bg-background-warm' : ''}`}>
      <Container>
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Screenshot preview linking to the live site */}
          <AnimateOnScroll className={flip ? 'lg:order-last' : ''}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit the ${name} website (opens in a new tab)`}
              className="group block"
            >
              <ScreenshotFrame
                name={name}
                slug={slug}
                domain={domain}
                imageExists={imageExists}
                priority={priority}
              />
            </a>
          </AnimateOnScroll>

          {/* Case study details */}
          <div>
            <div className="flex items-start gap-6">
              <span
                className="select-none font-display text-6xl leading-none text-accent/20 md:text-7xl"
                aria-hidden="true"
              >
                {number}
              </span>
              <div className="flex-1 pt-2">
                <div className="mb-4 h-0.5 w-12 bg-accent" aria-hidden="true" />
                <h2 className="font-display text-2xl md:text-3xl">{name}</h2>
                <p className="mt-4 text-lg leading-relaxed text-text-muted">
                  {summary}
                </p>

                <ul className="mt-6 space-y-3">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span
                        className="mt-2 h-2 w-2 shrink-0 bg-accent"
                        aria-hidden="true"
                      />
                      <span className="leading-relaxed text-text-muted">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <AnimateOnScroll delay={100}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link mt-6 inline-flex items-center gap-2 font-medium text-primary transition-colors duration-300 hover:text-accent"
                  >
                    <span>Visit {domain}</span>
                    <span
                      aria-hidden="true"
                      className="transform transition-transform duration-300 group-hover/link:translate-x-1"
                    >
                      &rarr;
                    </span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </AnimateOnScroll>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
