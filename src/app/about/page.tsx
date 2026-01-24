import type { Metadata } from 'next'
import { BioSection } from '@/components/about'
import { JsonLd } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'About',
  description: 'Meet Julie Asfeld, founder of MadMedia. Bringing warmth and strategy to social media management and website services for small businesses.',
  alternates: {
    canonical: '/about/',
  },
  openGraph: {
    title: 'About | MadMedia',
    description: 'Meet Julie Asfeld, founder of MadMedia. Bringing warmth and strategy to social media management and website services for small businesses.',
    url: '/about/',
  },
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Julie Asfeld',
  jobTitle: 'Founder & Social Media Specialist',
  url: 'https://madmedia.social/about/',
  worksFor: {
    '@type': 'Organization',
    name: 'MadMedia LLC',
  },
  knowsAbout: ['Social Media Marketing', 'Website Design', 'Small Business Marketing'],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, item: { '@id': 'https://madmedia.social/', name: 'Home' } },
    { '@type': 'ListItem', position: 2, item: { '@id': 'https://madmedia.social/about/', name: 'About' } },
  ],
}

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personSchema} />
      <JsonLd data={breadcrumbSchema} />
      <BioSection />
    </>
  )
}
