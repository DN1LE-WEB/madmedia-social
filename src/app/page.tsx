import type { Metadata } from 'next'
import { Hero, ServicesPreview, AboutPreview } from '@/components/home'
import { JsonLd } from '@/lib/schema'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'MadMedia - Social Media Management & Website Services',
    description: 'Professional social media management and website services for small businesses in Minnesota and beyond.',
    url: '/',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'MadMedia LLC',
  description: 'Professional social media management and website services for small businesses.',
  url: 'https://madmedia.social',
  telephone: '320-204-5840',
  email: 'madmedia56256@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Madison',
    addressRegion: 'MN',
    postalCode: '56256',
    addressCountry: 'US',
  },
  founder: {
    '@type': 'Person',
    name: 'Julie Asfeld',
  },
  areaServed: {
    '@type': 'State',
    name: 'Minnesota',
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'MadMedia',
  url: 'https://madmedia.social',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@id': 'https://madmedia.social/',
        name: 'Home',
      },
    },
  ],
}

export default function Home() {
  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Hero />
      <ServicesPreview />
      <AboutPreview />
    </>
  )
}
