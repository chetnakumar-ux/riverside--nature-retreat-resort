'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { IMAGES } from '@/lib/images'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      // === HEAVY ANIMATION SEQUENCE ===

      // 1. Ken Burns slow zoom on background
      gsap.fromTo('.hero-bg-img', { scale: 1.25 }, { scale: 1, duration: 12, ease: 'power1.out' })

      // 2. Aurora overlay pulse
      gsap.to('.aurora-1', { x: '30%', y: '-20%', duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.aurora-2', { x: '-25%', y: '15%', duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 })
      gsap.to('.aurora-3', { x: '20%', y: '25%', duration: 12, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 4 })

      // 3. Main timeline
      const tl = gsap.timeline({ delay: 1.8 })

      // Location badge slides in from top
      tl.fromTo('.hero-badge',
        { opacity: 0, y: -30, scale: 0.8, filter: 'blur(10px)' },
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out' }
      )

      // Main title — character by character stagger with 3D rotation
      .fromTo('.hero-char',
        { opacity: 0, y: 120, rotationX: -90, filter: 'blur(12px)', transformOrigin: 'bottom' },
        { opacity: 1, y: 0, rotationX: 0, filter: 'blur(0px)', duration: 1.2, stagger: 0.03, ease: 'power4.out' },
        '-=0.6'
      )

      // Accent line draws across
      .fromTo('.hero-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: 'power2.inOut' },
        '-=0.5'
      )

      // Subtitle words fade in one by one
      .fromTo('.hero-sub-word',
        { opacity: 0, y: 25, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, stagger: 0.05, ease: 'power3.out' },
        '-=0.6'
      )

      // CTA buttons — slide up with spring
      .fromTo('.hero-cta-btn',
        { opacity: 0, y: 40, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(1.8)' },
        '-=0.3'
      )

      // Side decorative elements
      .fromTo('.hero-side-text',
        { opacity: 0, x: -20 },
        { opacity: 0.4, x: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      )

      // Scroll indicator
      .fromTo('.hero-scroll',
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.3'
      )

      // 4. Continuous animations
      // Floating particles (decorative dots)
      gsap.utils.toArray('.hero-particle').forEach((el) => {
        const particle = el as HTMLElement
        gsap.to(particle, {
          y: `random(-30, 30)`,
          x: `random(-20, 20)`,
          opacity: `random(0.2, 0.6)`,
          duration: `random(3, 6)`,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: `random(0, 3)`,
        })
      })

      // Scroll indicator bob
      gsap.to('.hero-scroll-line', {
        y: 12, opacity: 0.2, duration: 1.5, repeat: -1, yoyo: true, ease: 'power1.inOut',
      })

      // 5. Scroll-driven effects
      // Parallax image on scroll
      gsap.to('.hero-bg-img', {
        yPercent: 25, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })

      // Content fades out and blurs on scroll
      gsap.to('.hero-content', {
        opacity: 0, y: -80, filter: 'blur(15px)', ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: '50% top', end: 'bottom top', scrub: true },
      })

      // Aurora intensifies on scroll
      gsap.to('.aurora-overlay', {
        opacity: 0.6, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: '30% top', end: 'bottom top', scrub: true },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Split title into characters for animation
  const titleLine1 = 'Where the Narmada'
  const titleLine2 = 'Whispers Luxury'

  const renderChars = (text: string, className: string = '') =>
    text.split('').map((char, i) => (
      <span
        key={i}
        className={`hero-char inline-block ${char === ' ' ? 'w-[0.3em]' : ''} ${className}`}
        style={{ perspective: '800px' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))

  const subtitleWords = 'A premium nature resort at the edge of India\'s most majestic waterfall — where marble cliffs meet sacred waters'.split(' ')

  return (
    <section ref={sectionRef} className="relative h-screen min-h-[750px] flex items-center justify-center overflow-hidden bg-primary">
      {/* Background image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={IMAGES.hero}
          alt="Vrindavan Gopala Resort — Luxury retreat at Dhuandhar Falls"
          fill
          className="hero-bg-img object-cover"
          priority
          sizes="100vw"
          quality={90}
        />
      </div>

      {/* Aurora gradient overlay — animated */}
      <div className="aurora-overlay absolute inset-0 z-[1] opacity-40">
        <div className="aurora-1 absolute w-[600px] h-[600px] rounded-full bg-emerald/30 blur-[120px] top-[-10%] left-[-10%]" />
        <div className="aurora-2 absolute w-[500px] h-[500px] rounded-full bg-forest/40 blur-[100px] bottom-[-10%] right-[-5%]" />
        <div className="aurora-3 absolute w-[400px] h-[400px] rounded-full bg-gold/15 blur-[80px] top-[30%] right-[20%]" />
      </div>

      {/* Dark overlays */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-primary/50 via-primary/30 to-primary/80" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-primary/40 via-transparent to-primary/30" />

      {/* Film grain */}
      <div className="absolute inset-0 z-[3] opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 z-[3] pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="hero-particle absolute w-1 h-1 rounded-full bg-gold/30"
            style={{
              top: `${15 + Math.random() * 70}%`,
              left: `${10 + Math.random() * 80}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
            }}
          />
        ))}
      </div>

      {/* Side decorative text */}
      <div className="hero-side-text absolute left-6 top-1/2 -translate-y-1/2 z-[4] hidden xl:block">
        <p className="text-cream/40 text-[0.6rem] tracking-[0.4em] uppercase font-body rotate-[-90deg] origin-left whitespace-nowrap">
          Bhedaghat &middot; Madhya Pradesh &middot; India
        </p>
      </div>

      {/* Main content */}
      <div className="hero-content relative z-[5] text-center max-w-6xl px-6">
        {/* Location badge */}
        <div className="hero-badge inline-flex items-center gap-3 border border-cream/15 backdrop-blur-sm bg-cream/5 px-6 py-2.5 mb-10 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
          <span className="text-cream/70 text-[0.65rem] tracking-[0.3em] uppercase font-body font-medium">
            Dhuandhar Falls &middot; Narmada Valley
          </span>
        </div>

        {/* Title — character animation */}
        <h1 className="heading-hero text-cream mb-4">
          <span className="block">
            {renderChars(titleLine1)}
          </span>
          <span className="block mt-2">
            {renderChars(titleLine2, 'text-gradient-gold')}
          </span>
        </h1>

        {/* Accent line */}
        <div className="hero-line w-32 h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent mx-auto my-8 origin-center" style={{ transform: 'scaleX(0)' }} />

        {/* Subtitle — word by word */}
        <p className="max-w-2xl mx-auto mb-12 leading-relaxed">
          {subtitleWords.map((word, i) => (
            <span key={i} className="hero-sub-word inline-block text-cream/60 text-base md:text-lg font-light mr-[0.35em]">
              {word}
            </span>
          ))}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Link href="/contact" className="hero-cta-btn group relative overflow-hidden bg-emerald text-cream px-10 py-4 text-[0.75rem] font-medium tracking-[0.2em] uppercase font-body transition-all duration-500 hover:bg-emerald-light hover:shadow-[0_0_40px_rgba(45,107,74,0.4)]">
            <span className="relative z-10">Reserve Your Stay</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-light to-emerald opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>
          <Link href="/stay" className="hero-cta-btn group border border-cream/20 text-cream/80 px-10 py-4 text-[0.75rem] font-medium tracking-[0.2em] uppercase font-body transition-all duration-500 hover:border-gold/50 hover:text-gold hover:bg-cream/5 backdrop-blur-sm">
            <span>Explore Rooms</span>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-[5]">
        <span className="text-cream/30 text-[0.6rem] tracking-[0.3em] uppercase font-body font-light">
          Discover
        </span>
        <div className="relative">
          <div className="w-[1px] h-12 bg-gradient-to-b from-emerald/50 to-transparent" />
          <div className="hero-scroll-line absolute top-0 left-0 w-[1px] h-5 bg-gold" />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-warm-white to-transparent z-[4]" />
    </section>
  )
}
