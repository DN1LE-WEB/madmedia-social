import { SocialPackages, WebsiteServices, FAQ } from '@/components/services'

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
