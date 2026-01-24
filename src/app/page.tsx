import type { Metadata } from 'next'
import { Hero, ServicesPreview, AboutPreview } from '@/components/home'

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

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <AboutPreview />
    </>
  )
}
