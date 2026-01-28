import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-background py-section-sm mt-section">
      <div className="mx-auto max-w-[var(--width-content)] px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div role="group" aria-labelledby="footer-contact">
            <p id="footer-contact" className="font-display text-xl mb-4">Contact</p>
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
          <nav aria-labelledby="footer-navigate">
            <p id="footer-navigate" className="font-display text-xl mb-4">Navigate</p>
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
          </nav>

          {/* Social Links */}
          <div role="group" aria-labelledby="footer-connect">
            <p id="footer-connect" className="font-display text-xl mb-4">Connect</p>
            <a
              href="https://www.facebook.com/profile.php?id=61567329454572#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-background/80 hover:text-accent transition-colors duration-300 text-sm"
              aria-label="Follow us on Facebook"
            >
              <FontAwesomeIcon icon={faFacebook} className="w-5 h-5" />
              <span>Facebook</span>
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-background/20 text-center text-sm text-background/60">
          <p>&copy; {currentYear} MadMedia LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
