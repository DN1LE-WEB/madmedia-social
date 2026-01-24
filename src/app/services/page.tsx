import type { Metadata } from 'next'
import { SocialPackages, WebsiteServices, FAQ } from '@/components/services'

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

export default function ServicesPage() {
  return (
    <>
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
