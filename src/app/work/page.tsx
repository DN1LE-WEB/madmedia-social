import type { Metadata } from 'next'
import { JsonLd } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Our Work',
  description: 'Recent client projects from MadMedia — school district websites, custom online stores, and small business sites built to serve their owners and visitors.',
  alternates: {
    canonical: '/work/',
  },
  openGraph: {
    title: 'Our Work | MadMedia',
    description: 'Recent client projects from MadMedia — school district websites, custom online stores, and small business sites built to serve their owners and visitors.',
    url: '/work/',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, item: { '@id': 'https://madmedia.social/', name: 'Home' } },
    { '@type': 'ListItem', position: 2, item: { '@id': 'https://madmedia.social/work/', name: 'Our Work' } },
  ],
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'MadMedia Client Projects',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'West Central Area Schools', url: 'https://isd2342.org' },
    { '@type': 'ListItem', position: 2, name: "Rockin' W Hat Bar", url: 'https://rockin-w-hatbar.com' },
    { '@type': 'ListItem', position: 3, name: 'Four Paws Resort', url: 'https://four-pawsresort.com' },
    { '@type': 'ListItem', position: 4, name: 'The Main Madison', url: 'https://themainmadison.com' },
  ],
}

export default function WorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={itemListSchema} />
      {/* Hero Section */}
      <section className="py-section-lg">
        <div className="mx-auto max-w-[var(--width-content)] px-6">
          <h1 className="font-display text-5xl md:text-6xl">Our Work</h1>
          <p className="text-xl text-text-muted mt-6 max-w-2xl">
            A look at recent client projects — and what each site does for the
            business behind it.
          </p>
        </div>
      </section>

      {/* Case studies are added in the next step */}
    </>
  )
}
