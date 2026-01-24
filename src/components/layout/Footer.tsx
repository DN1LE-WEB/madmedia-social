import Link from 'next/link'

const socialLinks = [
  { href: '#', label: 'Facebook', placeholder: true },
  { href: '#', label: 'Instagram', placeholder: true },
  { href: '#', label: 'LinkedIn', placeholder: true },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-background py-section-sm mt-section">
      <div className="mx-auto max-w-[var(--width-content)] px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="font-display text-xl mb-4">Contact</h3>
            <address className="not-italic text-background/80 space-y-2 text-sm">
              <p>Madison, MN 56256</p>
              <p>
                <a
                  href="tel:320-204-5840"
                  className="hover:text-accent transition-colors duration-300"
                >
                  320-204-5840
                </a>
              </p>
              <p>
                <a
                  href="mailto:madmedia56256@gmail.com"
                  className="hover:text-accent transition-colors duration-300"
                >
                  madmedia56256@gmail.com
                </a>
              </p>
            </address>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display text-xl mb-4">Navigate</h3>
            <ul className="space-y-2 text-background/80 text-sm">
              <li>
                <Link href="/services" className="hover:text-accent transition-colors duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent transition-colors duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-display text-xl mb-4">Connect</h3>
            <ul className="space-y-2 text-background/80 text-sm">
              {socialLinks.map(({ href, label, placeholder }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="hover:text-accent transition-colors duration-300"
                    aria-label={placeholder ? `${label} (coming soon)` : label}
                  >
                    {label}
                    {placeholder && <span className="text-background/40 ml-2">(coming soon)</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-background/20 text-center text-sm text-background/60">
          <p>&copy; {currentYear} MadMedia LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
