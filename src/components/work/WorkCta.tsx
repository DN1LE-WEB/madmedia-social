import { Container, Button, AnimateOnScroll } from '@/components/ui'

export function WorkCta() {
  return (
    <section className="py-section bg-background-warm">
      <Container className="text-center">
        <AnimateOnScroll>
          <h2 className="font-display text-3xl md:text-4xl">
            Have a project in mind?
          </h2>
        </AnimateOnScroll>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-muted">
          Let&apos;s talk about what a website like this could do for your
          business.
        </p>
        <AnimateOnScroll delay={100}>
          <div className="mt-8">
            <Button href="/contact">Get in Touch</Button>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  )
}
