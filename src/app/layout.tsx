import type { Metadata } from 'next'
import { fraunces, dmSans } from '@/lib/fonts'
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
      <body>{children}</body>
    </html>
  )
}
