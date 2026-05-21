'use client'

import { useEffect, useRef } from 'react'
import { Player } from '@remotion/player'
import { gsap } from 'gsap'
import Link from 'next/link'
import { HeroComposition } from '@/remotion/HeroComposition'

export function RemotionHero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      sectionRef.current.querySelectorAll('.anim-init').forEach(el => {
        (el as HTMLElement).style.opacity = '1'
      })
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2 })

      tl.fromTo('.hero-location', { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
        .fromTo('.hero-word', { opacity: 0, y: 50, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, stagger: 0.05, ease: 'power4.out' }, '-=0.3')
        .fromTo('.hero-divider-line', { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'power2.inOut' }, '-=0.3')
        .fromTo('.hero-desc', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
        .fromTo('.hero-booking-bar', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
        .fromTo('.hero-scroll-hint', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.1')

      gsap.to('.scroll-dot', { y: 6, duration: 1.2, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative h-[100svh] min-h-[580px] flex flex-col justify-end overflow-hidden bg-primary">
      {/*
        Remotion background — force full coverage.
        The player container is made absolute+inset-0 so it fills the section.
        We also add a CSS cover hack: scale the internal player to always fill,
        even when aspect ratios don't match (like tall phones).
      */}
      <div
        className="absolute inset-0 z-0"
        style={{
          /* Force the Remotion player iframe/div to cover like a background image */
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'max(100%, calc(100vh * 1920 / 1080))',
            height: 'max(100%, calc(100vw * 1080 / 1920))',
          }}
        >
          <Player
            component={HeroComposition}
            compositionWidth={1920}
            compositionHeight={1080}
            durationInFrames={300}
            fps={30}
            autoPlay
            loop
            style={{ width: '100%', height: '100%' }}
            controls={false}
            clickToPlay={false}
            showVolumeControls={false}
            doubleClickToFullscreen={false}
            acknowledgeRemotionLicense
          />
        </div>
      </div>

      {/* Content — bottom-aligned editorial */}
      <div className="relative z-10 w-full">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 pb-6 sm:pb-10">
          {/* Location */}
          <p className="hero-location anim-init opacity-0 text-emerald-light text-[0.6rem] sm:text-[0.65rem] tracking-[0.3em] uppercase font-body font-medium mb-3 sm:mb-4">
            Bhedaghat &middot; Dhuandhar Falls &middot; Narmada Valley
          </p>

          {/* Title */}
          <h1 className="mb-3 sm:mb-4">
            {['Where', 'the', 'Narmada'].map((w, i) => (
              <span key={i} className="hero-word anim-init opacity-0 inline-block font-display text-cream font-light text-[2rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] leading-[1.05] mr-[0.2em] sm:mr-[0.22em] tracking-[-0.02em]">
                {w}
              </span>
            ))}
            <br className="hidden sm:block" />
            {['Whispers', 'Luxury'].map((w, i) => (
              <span key={i} className="hero-word anim-init opacity-0 inline-block font-display font-light text-[2rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] leading-[1.05] mr-[0.2em] sm:mr-[0.22em] tracking-[-0.02em] italic text-gradient-gold">
                {w}
              </span>
            ))}
          </h1>

          {/* Divider */}
          <div className="hero-divider-line anim-init w-12 sm:w-16 h-[1px] bg-emerald/60 mb-3 sm:mb-5 origin-left" style={{ transform: 'scaleX(0)' }} />

          {/* Description */}
          <p className="hero-desc anim-init opacity-0 text-cream/45 text-[0.75rem] sm:text-sm md:text-base font-body font-light max-w-md leading-relaxed mb-5 sm:mb-8">
            A premium nature resort at the edge of India&apos;s most majestic waterfall — marble cliffs, sacred waters, unhurried elegance.
          </p>

          {/* Booking bar */}
          <div className="hero-booking-bar anim-init opacity-0 flex flex-col sm:flex-row items-stretch sm:items-center bg-primary/40 backdrop-blur-md border border-cream/10 max-w-2xl">
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 divide-x divide-cream/10">
              <div className="px-3 sm:px-5 py-2.5 sm:py-4">
                <label className="block text-cream/30 text-[0.5rem] sm:text-[0.6rem] tracking-[0.15em] uppercase font-body mb-0.5 sm:mb-1">Check in</label>
                <input type="date" className="bg-transparent text-cream/70 text-[0.65rem] sm:text-xs font-body w-full outline-none cursor-pointer" />
              </div>
              <div className="px-3 sm:px-5 py-2.5 sm:py-4">
                <label className="block text-cream/30 text-[0.5rem] sm:text-[0.6rem] tracking-[0.15em] uppercase font-body mb-0.5 sm:mb-1">Check out</label>
                <input type="date" className="bg-transparent text-cream/70 text-[0.65rem] sm:text-xs font-body w-full outline-none cursor-pointer" />
              </div>
              <div className="hidden sm:block px-3 sm:px-5 py-2.5 sm:py-4">
                <label className="block text-cream/30 text-[0.5rem] sm:text-[0.6rem] tracking-[0.15em] uppercase font-body mb-0.5 sm:mb-1">Guests</label>
                <select className="bg-transparent text-cream/70 text-[0.65rem] sm:text-xs font-body w-full outline-none cursor-pointer appearance-none">
                  <option value="2">2 Adults</option>
                  <option value="1">1 Adult</option>
                  <option value="3">3 Adults</option>
                  <option value="4">4+ Adults</option>
                </select>
              </div>
            </div>
            <Link
              href="/contact"
              className="bg-emerald hover:bg-emerald-light text-cream px-5 sm:px-8 py-2.5 sm:py-4 text-[0.6rem] sm:text-[0.7rem] font-body font-medium tracking-[0.15em] uppercase text-center transition-colors duration-300 shrink-0"
            >
              Check Availability
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll hint — right side, desktop only */}
      <div className="hero-scroll-hint anim-init opacity-0 absolute bottom-6 sm:bottom-8 right-4 sm:right-8 z-10 hidden sm:flex flex-col items-center gap-2">
        <span className="text-cream/20 text-[0.5rem] tracking-[0.3em] uppercase font-body [writing-mode:vertical-lr]">Scroll</span>
        <div className="scroll-dot w-1 h-1 rounded-full bg-emerald/60" />
      </div>

      {/* Bottom gradient — uses primary color, NOT white, to avoid visible white strip */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-warm-white z-[5]" />
    </section>
  )
}
