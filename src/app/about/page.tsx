import type { Metadata } from 'next'
import { BioSection } from '@/components/about'

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

export default function AboutPage() {
  return <BioSection />
}
