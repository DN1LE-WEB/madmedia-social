import type { Metadata } from 'next'
import { SocialPackages, WebsiteServices, FAQ } from '@/components/services'
import { JsonLd } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Social media management packages starting at $300/month. Website design and maintenance services. Starter, Standard, and Premium options available.',
  alternates: {
    canonical: '/services/',
  },
  openGraph: {
    title: 'Services | MadMedia',
    description: 'Social media management packages starting at $300/month. Website design and maintenance services. Starter, Standard, and Premium options available.',
    url: '/services/',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How many social media platforms can you manage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Depends on your package. Starter includes 1 platform, Standard includes 2, and Premium covers up to 3 platforms of your choice.',
      },
    },
    {
      '@type': 'Question',
      name: 'What kind of content do you create?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We create custom graphics, write engaging captions, develop hashtag strategies, and ensure everything aligns with your brand voice.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to provide content ideas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "No, we handle the entire content strategy for you. However, we always welcome your input and ideas if you have them.",
      },
    },
    {
      '@type': 'Question',
      name: 'How long does website design take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Typically 4-6 weeks from kickoff to launch, depending on the complexity and scope of the project.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you work with my existing website?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, our maintenance services work with websites on any platform. We can also help migrate your site if needed.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if I need both social media and website services?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer bundle pricing for clients who need both services. Contact us for a custom quote tailored to your needs.',
      },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, item: { '@id': 'https://madmedia.social/', name: 'Home' } },
    { '@type': 'ListItem', position: 2, item: { '@id': 'https://madmedia.social/services/', name: 'Services' } },
  ],
}

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      {/* Hero Section */}
      <section className="py-section-lg">
        <div className="mx-auto max-w-[var(--width-content)] px-6">
          <h1 className="font-display text-5xl md:text-6xl">Services</h1>
          <p className="text-xl text-text-muted mt-6 max-w-2xl">
            Social media management and website services for small businesses
          </p>
        </div>
      </section>

      {/* Social Media Packages */}
      <SocialPackages />

      {/* Website Services */}
      <WebsiteServices />

      {/* FAQ */}
      <FAQ />
    </>
  )
}
