import fs from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import { CaseStudy, WorkCta, type CaseStudyData } from '@/components/work'
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

const caseStudies: CaseStudyData[] = [
  {
    number: '01',
    name: 'West Central Area Schools',
    url: 'https://isd2342.org',
    domain: 'isd2342.org',
    slug: 'isd2342',
    summary: 'A complete rebuild of the district’s website, designed for the families who visit it and the staff who keep it up to date.',
    features: [
      'Easy content management so school staff can update pages themselves',
      'An AI-powered “Ask” assistant that answers visitor questions using the district’s own content',
      'Secure staff login with their existing Google accounts',
      'District announcements automatically pulled in from their messaging system',
      'An AI-assisted page builder for staff creating new content',
      'Fully accessible, meeting ADA standards for all visitors',
    ],
  },
  {
    number: '02',
    name: 'Rockin’ W Hat Bar',
    url: 'https://rockin-w-hatbar.com',
    domain: 'rockin-w-hatbar.com',
    slug: 'rockin-w-hatbar',
    summary: 'A custom online store for a western hat retailer, built to turn browsers into buyers.',
    features: [
      'A fully custom Shopify storefront designed around the brand',
      'An interactive Hat Builder that lets customers design and customize their own hat',
      'Seamless checkout and order management through Shopify',
    ],
  },
  {
    number: '03',
    name: 'Four Paws Resort',
    url: 'https://four-pawsresort.com',
    domain: 'four-pawsresort.com',
    slug: 'four-pawsresort',
    summary: 'A pet resort website with customer communication built right in.',
    features: [
      'Professional email set up on their own domain',
      'Automated text message notifications to customers',
    ],
  },
  {
    number: '04',
    name: 'The Main Madison',
    url: 'https://themainmadison.com',
    domain: 'themainmadison.com',
    slug: 'themainmadison',
    summary: 'A boutique vacation rental site built to get found in local search.',
    features: [
      'A clean, photo-forward design that showcases the property',
      'Optimized for local search so travelers can find it',
    ],
  },
]

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
  itemListElement: caseStudies.map((study, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: study.name,
    url: study.url,
  })),
}

// Evaluated at build time (static export), so a missing screenshot
// renders the styled placeholder instead of a broken image
function screenshotExists(slug: string): boolean {
  return fs.existsSync(
    path.join(process.cwd(), 'public', 'work', `${slug}-desktop.png`)
  )
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

      {/* Case Studies */}
      {caseStudies.map((study, index) => (
        <CaseStudy
          key={study.slug}
          {...study}
          imageExists={screenshotExists(study.slug)}
          flip={index % 2 === 1}
          warm={index % 2 === 0}
        />
      ))}

      {/* Contact CTA */}
      <WorkCta />
    </>
  )
}
