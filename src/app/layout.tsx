import type { Metadata } from 'next'
import { fraunces, dmSans } from '@/lib/fonts'
import { Navigation, Footer } from '@/components/layout'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'MadMedia - Social Media Management & Website Services',
  description: 'Professional social media management and website services for small businesses in Madison, MN and beyond.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
