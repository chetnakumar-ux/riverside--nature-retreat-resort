'use client'

import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger globally — must happen before any component mounts
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Ensure registration in case SSR skipped it
    gsap.registerPlugin(ScrollTrigger)

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!prefersReducedMotion) {
      const lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
      })
      lenisRef.current = lenis

      lenis.on('scroll', ScrollTrigger.update)

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
      })
      gsap.ticker.lagSmoothing(0)
    }

    // Preloader
    const preloader = document.querySelector('.preloader')
    if (preloader) {
      gsap.to('.preloader-logo', { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out' })
      gsap.to('.preloader-line', { scaleX: 1, duration: 1.2, delay: 0.3, ease: 'power2.inOut' })
      gsap.to('.preloader', {
        opacity: 0, duration: 0.6, delay: 1.8, ease: 'power2.inOut',
        onComplete: () => {
          setLoaded(true)
          if (preloader instanceof HTMLElement) preloader.style.display = 'none'
          ScrollTrigger.refresh()
        },
      })
    } else {
      setLoaded(true)
    }

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }
    }
  }, [])

  return (
    <>
      <div className="preloader fixed inset-0 z-[99999] bg-primary flex flex-col items-center justify-center">
        <div className="preloader-logo opacity-0 scale-75 mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-site.png" alt="Vrindavan Gopala Resort" className="h-20 sm:h-24 w-auto" />
        </div>
        <div className="w-24 sm:w-32 h-[1px] bg-cream/8">
          <div className="preloader-line h-full bg-gradient-to-r from-emerald to-gold origin-left" style={{ transform: 'scaleX(0)' }} />
        </div>
      </div>

      <div className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </div>
    </>
  )
}
