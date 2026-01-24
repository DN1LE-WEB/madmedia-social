import type { Metadata } from 'next'
import { Container } from '@/components/ui'
import { ContactForm } from '@/components/contact'
import { JsonLd } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with MadMedia for social media management and website services. Email, phone, or use our contact form to start growing your business.',
  alternates: {
    canonical: '/contact/',
  },
  openGraph: {
    title: 'Contact | MadMedia',
    description: 'Get in touch with MadMedia for social media management and website services. Email, phone, or use our contact form to start growing your business.',
    url: '/contact/',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, item: { '@id': 'https://madmedia.social/', name: 'Home' } },
    { '@type': 'ListItem', position: 2, item: { '@id': 'https://madmedia.social/contact/', name: 'Contact' } },
  ],
}

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <section className="py-section-lg">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16">
          {/* Left column - Contact info (40%) */}
          <div>
            <h1 className="font-display text-4xl lg:text-5xl">Get in Touch</h1>
            <p className="text-lg text-text-muted mt-6">
              Ready to grow your online presence? Let's talk about how MadMedia can help your business.
            </p>

            <div className="mt-12">
              <p className="font-medium mb-4">Or reach out directly:</p>
              <ul className="space-y-3 text-text-muted">
                <li>
                  <a
                    href="mailto:madmedia56256@gmail.com"
                    className="hover:text-accent transition-colors duration-300"
                  >
                    madmedia56256@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:320-204-5840"
                    className="hover:text-accent transition-colors duration-300"
                  >
                    320-204-5840
                  </a>
                </li>
                <li>Madison, MN 56256</li>
              </ul>
            </div>
          </div>

          {/* Right column - Form (60%) */}
          <div>
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
    </>
  )
}
