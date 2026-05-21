'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Logo } from './Logo'
import { NAV_LINKS } from '@/lib/constants'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[9995] transition-all duration-700 ease-out ${
          scrolled
            ? 'bg-primary/90 backdrop-blur-xl py-2.5 sm:py-3 shadow-[0_2px_30px_rgba(0,0,0,0.15)]'
            : 'bg-transparent py-3 sm:py-5'
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-12">
          {/* Logo */}
          <Link href="/" aria-label="Home" onClick={() => setMenuOpen(false)}>
            <Logo className="h-22 sm:h-14 w-auto" light />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link-underline text-cream/70 hover:text-cream text-sm font-body font-normal tracking-[0.04em] transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-3 bg-emerald/90 hover:bg-emerald text-cream px-6 py-2.5 text-xs font-body font-semibold tracking-[0.15em] uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(45,107,74,0.3)]"
            >
              Book Now
            </Link>
          </nav>

          {/* Hamburger — mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden relative z-[9996] w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`block w-5 h-[1.5px] bg-cream transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-cream transition-all duration-300 ${menuOpen ? 'opacity-0 scale-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-cream transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </header>

      {/* Fullscreen nav overlay */}
      <div
        className={`nav-overlay ${menuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <nav className="flex flex-col items-center gap-1 sm:gap-2">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <div className="mt-4 sm:mt-6">
            <Link
              href="/contact"
              className="bg-emerald text-cream px-8 py-3 text-[0.7rem] font-body font-medium tracking-[0.2em] uppercase inline-block"
              onClick={() => setMenuOpen(false)}
            >
              Book Now
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}
