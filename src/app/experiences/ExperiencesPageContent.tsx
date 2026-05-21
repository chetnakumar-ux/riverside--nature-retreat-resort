'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { EXPERIENCES } from '@/lib/constants'
import { IMAGES } from '@/lib/images'
import { fadeUp, fadeLeft, fadeRight, clipReveal, scaleOnScroll } from '@/lib/animations'

const EXP_IMAGES = [
  IMAGES.expBoat, IMAGES.expFalls, IMAGES.expRopeway,
  IMAGES.expTemple, IMAGES.expNature, IMAGES.expCulture,
]

export function ExperiencesPageContent() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!pageRef.current) return
    const ctx = gsap.context(() => {
      // Hero
      const heroImg = pageRef.current!.querySelector('.hero-img')
      if (heroImg) scaleOnScroll(heroImg)
      pageRef.current!.querySelectorAll('.hero-reveal').forEach((el, i) =>
        fadeUp(el, { delay: 0.3 + i * 0.15 })
      )

      // Intro
      const intro = pageRef.current!.querySelector('.intro-text')
      if (intro) fadeUp(intro)

      // Experience sections
      pageRef.current!.querySelectorAll('.exp-section').forEach((section, i) => {
        const img = section.querySelector('.exp-img')
        const content = section.querySelector('.exp-content')
        if (img) clipReveal(img)
        if (content) { i % 2 === 0 ? fadeRight(content, { delay: 0.2 }) : fadeLeft(content, { delay: 0.2 }) }

        const divider = section.querySelector('.divider-animate')
        if (divider) {
          gsap.fromTo(divider, { scaleX: 0, transformOrigin: 'left' },
            { scaleX: 1, duration: 1, ease: 'power2.inOut', scrollTrigger: { trigger: divider as gsap.DOMTarget, start: 'top 85%' } }
          )
        }
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef}>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <Image src={IMAGES.experiencesHero} alt="Bhedaghat experiences" fill className="hero-img object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
        <div className="relative z-10 section-padding pb-12 w-full">
          <div className="container-luxury">
            <p className="hero-reveal text-overline text-gold mb-3">Beyond the Resort</p>
            <h1 className="hero-reveal heading-hero text-cream">Curated Experiences</h1>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding bg-warm-white">
        <div className="container-luxury max-w-3xl text-center">
          <p className="intro-text text-body-lg">
            Bhedaghat and the Narmada valley are home to some of India&apos;s most
            extraordinary natural and cultural attractions. From our resort, each
            is within easy reach — many just minutes away.
          </p>
        </div>
      </section>

      {/* Experience details */}
      {EXPERIENCES.map((exp, i) => (
        <section key={exp.title} className={`exp-section section-padding ${i % 2 === 0 ? 'bg-cream' : 'bg-warm-white'}`}>
          <div className="container-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className={`exp-img overflow-hidden ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="aspect-[4/3] relative">
                  <Image src={EXP_IMAGES[i]} alt={exp.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
              </div>
              <div className={`exp-content ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <p className="text-overline mb-3">Experience {String(i + 1).padStart(2, '0')}</p>
                <h2 className="heading-subsection text-primary mb-4">{exp.title}</h2>
                <hr className="divider-animate divider-gold" />
                <p className="text-body-lg mt-6">{exp.description}</p>
                <div className="mt-6">
                  <Link href="/contact" className="text-sm font-semibold text-gold tracking-widest uppercase hover:text-gold-dark transition-colors group/link">
                    Arrange This Experience <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Travel desk */}
      <section className="section-padding bg-water text-center">
        <div className="container-luxury max-w-2xl">
          <h2 className="heading-section text-cream mb-4">Your Personal Travel Desk</h2>
          <p className="text-cream/70 text-lg mb-8">
            Our concierge can arrange guided tours, cab services, safari bookings, railway and flight reservations.
          </p>
          <Link href="/contact" className="btn-gold"><span>Plan Your Itinerary</span></Link>
        </div>
      </section>
    </div>
  )
}
