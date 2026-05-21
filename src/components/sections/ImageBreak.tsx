'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

interface ImageBreakProps {
  src: string
  alt: string
  quote?: string
  author?: string
}

/** Fullwidth cinematic parallax image break — GSAP powered */
export function ImageBreak({ src, alt, quote, author }: ImageBreakProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Image parallax
      gsap.to('.break-img', {
        yPercent: 25,
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      })

      // Quote text parallax (opposite direction)
      if (quote) {
        gsap.fromTo('.break-quote',
          { y: 40, opacity: 0 },
          {
            y: -30, opacity: 1, ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 20%', scrub: true },
          }
        )
      }
    }, el)

    return () => ctx.revert()
  }, [quote])

  return (
    <section ref={sectionRef} className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] overflow-hidden">
      <div className="absolute inset-[-25%] w-[150%] h-[150%]">
        <Image src={src} alt={alt} fill className="break-img object-cover scale-110" sizes="100vw" />
      </div>
      <div className="absolute inset-0 bg-primary/50" />

      {quote && (
        <div className="break-quote absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
          <div className="max-w-2xl">
            <p className="font-display text-cream text-base sm:text-xl md:text-2xl lg:text-3xl font-light italic leading-relaxed">
              &ldquo;{quote}&rdquo;
            </p>
            {author && (
              <p className="text-cream/40 text-[0.6rem] sm:text-xs tracking-[0.2em] uppercase font-body mt-3 sm:mt-4">{author}</p>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
