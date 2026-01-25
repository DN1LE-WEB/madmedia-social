'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Transparent header on homepage (for hero overlap version)
  // const isHomepage = pathname === '/'

  return (
    <>
      {/* === ORIGINAL SINGLE HEADER (active) === */}
      <header className="border-b border-primary/10">
        <nav className="mx-auto max-w-[var(--width-content)] px-4 md:px-6 flex items-center justify-between">
          {/* Logo - responsive sizing */}
          <Link href="/" className="relative h-24 w-40 md:h-40 md:w-72 lg:h-60 lg:w-[480px]">
            <Image
              src="/logo.png"
              alt="MadMedia"
              fill
              className="object-contain object-left"
              priority
            />
          </Link>

          {/* Desktop navigation */}
          <ul className="hidden md:flex gap-6 lg:gap-8">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`
                    text-sm font-medium tracking-wide uppercase
                    transition-colors duration-300
                    ${pathname === href
                      ? 'text-accent'
                      : 'text-primary hover:text-accent'
                    }
                  `}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger button */}
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`block h-0.5 w-full bg-primary transition-all duration-300 origin-center ${
                  mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-primary transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0 scale-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-primary transition-all duration-300 origin-center ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </nav>

        {/* Mobile menu overlay */}
        <div
          className={`
            md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300
            ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Mobile menu panel */}
        <div
          className={`
            md:hidden fixed top-0 right-0 h-full w-64 bg-background z-50
            shadow-2xl transition-transform duration-300 ease-out
            ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <div className="p-6 pt-8">
            <button
              className="absolute top-4 right-4 p-2"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <ul className="mt-8 space-y-6">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      block text-lg font-medium tracking-wide uppercase
                      transition-colors duration-300
                      ${pathname === href
                        ? 'text-accent'
                        : 'text-primary hover:text-accent'
                      }
                    `}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      {/* === TRANSPARENT HEADER FOR HERO OVERLAP (uncomment to use with hero background) ===
      {isHomepage ? (
        <header className="absolute top-0 left-0 right-0 z-50">
          <nav className="mx-auto max-w-[var(--width-content)] px-6 flex items-center justify-between">
            <Link href="/" className="relative h-60 w-[480px]">
              <Image
                src="/logo.png"
                alt="MadMedia"
                fill
                className="object-contain object-left"
                priority
              />
            </Link>

            <ul className="flex gap-8">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`
                      text-sm font-medium tracking-wide uppercase
                      transition-colors duration-300
                      ${pathname === href
                        ? 'text-accent'
                        : 'text-white hover:text-accent'
                      }
                    `}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
      ) : (
        <header className="border-b border-primary/10">
          <nav className="mx-auto max-w-[var(--width-content)] px-6 flex items-center justify-between">
            <Link href="/" className="relative h-60 w-[480px]">
              <Image
                src="/logo.png"
                alt="MadMedia"
                fill
                className="object-contain object-left"
                priority
              />
            </Link>

            <ul className="flex gap-8">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`
                      text-sm font-medium tracking-wide uppercase
                      transition-colors duration-300
                      ${pathname === href
                        ? 'text-accent'
                        : 'text-primary hover:text-accent'
                      }
                    `}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
      )}
      === END TRANSPARENT HEADER === */}
    </>
  )
}
