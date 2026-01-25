import type { Metadata } from 'next'
import { playfair, dmSans } from '@/lib/fonts'
import { Navigation, Footer } from '@/components/layout'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://madmedia.social'),
  title: {
    template: '%s | MadMedia',
    default: 'MadMedia - Social Media Management & Website Services',
  },
  description: 'Professional social media management and website services for small businesses in Minnesota and beyond.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'MadMedia',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
