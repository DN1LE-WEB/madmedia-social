'use client'

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

  // Transparent header on homepage (for hero overlap version)
  // const isHomepage = pathname === '/'

  return (
    <>
      {/* === ORIGINAL SINGLE HEADER (active) === */}
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
