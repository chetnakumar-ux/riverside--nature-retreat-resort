'use client'

import Link from 'next/link'
import { Logo } from './Logo'
import { RESORT_INFO, NAV_LINKS } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-primary text-cream/80">
      {/* Main footer */}
      <div className="section-padding container-luxury">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo className="h-16 w-auto mb-6" light />
            <p className="text-sm leading-relaxed text-cream/60 max-w-xs">
              A premium nature resort at the edge of Dhuandhar Falls, where the
              ancient marble cliffs meet the sacred waters of the Narmada.
            </p>
            <div className="flex gap-4 mt-6">
              <SocialIcon label="Instagram" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6z" />
              <SocialIcon label="Facebook" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
              <SocialIcon label="YouTube" d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
              <SocialIcon label="TripAdvisor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-cream font-body text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              Explore
            </h4>
            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-cream/60 hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-cream font-body text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              Contact
            </h4>
            <address className="not-italic flex flex-col gap-3 text-sm text-cream/60">
              <p>{RESORT_INFO.address}</p>
              <a
                href={`tel:${RESORT_INFO.phone[0]}`}
                className="hover:text-gold transition-colors"
              >
                {RESORT_INFO.phone[0]}
              </a>
              <a
                href={`tel:${RESORT_INFO.phone[1]}`}
                className="hover:text-gold transition-colors"
              >
                {RESORT_INFO.phone[1]}
              </a>
              <a
                href={`mailto:${RESORT_INFO.email}`}
                className="hover:text-gold transition-colors"
              >
                {RESORT_INFO.email}
              </a>
              <p className="text-cream/40">{RESORT_INFO.hours}</p>
            </address>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-cream font-body text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              Stay Inspired
            </h4>
            <p className="text-sm text-cream/60 mb-4">
              Receive curated offers, seasonal escapes, and stories from the
              Narmada valley.
            </p>
            <form
              className="flex gap-0"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-primary-light border border-cream/10 px-4 py-3 text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold/50 transition-colors"
                required
              />
              <button
                type="submit"
                className="bg-gold text-primary px-5 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-gold-dark transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="container-luxury px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/40">
          <p>&copy; {new Date().getFullYear()} Riverside Nature Retreat. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-cream transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-cream transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ label, d }: { label: string; d: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-300"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d={d} />
      </svg>
    </a>
  )
}
