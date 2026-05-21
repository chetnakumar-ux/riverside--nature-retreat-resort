'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { IMAGES } from '@/lib/images'
import { RESORT_INFO } from '@/lib/constants'
import { AnimatedContent, BlurText, MagneticButton, ShinyText } from '@/components/animated'
import { parallax } from '@/lib/animations'

export function BookingBanner() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      const bg = sectionRef.current!.querySelector('.booking-bg')
      if (bg) parallax(bg, 0.15)
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="absolute inset-[-20%] w-[140%] h-[140%] overflow-hidden">
        <Image src={IMAGES.sunset} alt="Sunset" fill className="booking-bg object-cover" sizes="100vw" />
      </div>
      <div className="absolute inset-0 bg-primary/75" />

      <div className="relative z-10 section-padding text-center">
        <div className="container-luxury max-w-3xl">
          <AnimatedContent direction="up">
            <p className="text-overline !text-emerald-light mb-4 sm:mb-6">Begin Your Journey</p>
          </AnimatedContent>

          <h2 className="heading-section text-cream mb-4 sm:mb-6">
            <BlurText text="Your Narmada Escape Awaits" animateBy="words" delay={0.08} />
          </h2>

          <AnimatedContent direction="up" delay={0.3}>
            <p className="text-cream/60 text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-8 sm:mb-10">
              Whether a weekend retreat, a family vacation, or a destination celebration —
              let us craft your <ShinyText text="perfect stay" speed={2} /> at the edge of Dhuandhar Falls.
            </p>
          </AnimatedContent>

          <AnimatedContent direction="up" delay={0.4} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <MagneticButton>
              <Link href="/contact" className="btn-gold glow-gold"><span>Reserve Your Stay</span></Link>
            </MagneticButton>
            <MagneticButton>
              <a href={`tel:${RESORT_INFO.phone[0]}`} className="btn-outline !border-cream/40">
                <span>Call {RESORT_INFO.phone[0]}</span>
              </a>
            </MagneticButton>
          </AnimatedContent>
        </div>
      </div>
    </section>
  )
}
