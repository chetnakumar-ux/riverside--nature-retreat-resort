'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { IMAGES } from '@/lib/images'
import { fadeUp, fadeLeft, fadeRight, clipReveal, scaleOnScroll } from '@/lib/animations'

const VENUES = [
  { name: 'The Grand Lawn', desc: 'Our expansive green marriage lawn, flanked by lush gardens and framed by the Narmada landscape. Perfect for grand ceremonies and receptions under the open sky.', capacity: 'Up to 500 guests', image: IMAGES.grandLawn },
  { name: 'Conference Hall', desc: 'A modern, air-conditioned hall equipped with AV facilities, ideal for corporate events, seminars, and intimate celebrations.', capacity: 'Up to 150 guests', image: IMAGES.conferenceHall },
  { name: 'Riverside Setup', desc: 'An exclusive arrangement near the Narmada, with the sound of the river and views of the marble cliffs. Available for intimate gatherings and curated experiences.', capacity: 'Up to 80 guests', image: IMAGES.riversideSetup },
]

const SERVICES = [
  'Dedicated wedding coordinator', 'Custom menu planning & catering', 'Floral arrangements & decor', 'Sound & lighting systems',
  'Guest accommodation management', 'Airport/station transfers', 'Cultural entertainment', 'Photography coordination',
]

export function WeddingsPageContent() {
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

      // Venue sections
      pageRef.current!.querySelectorAll('.venue-section').forEach((section, i) => {
        const img = section.querySelector('.venue-img')
        const content = section.querySelector('.venue-content')
        if (img) clipReveal(img)
        if (content) { i % 2 === 0 ? fadeRight(content, { delay: 0.2 }) : fadeLeft(content, { delay: 0.2 }) }

        const divider = section.querySelector('.divider-animate')
        if (divider) {
          gsap.fromTo(divider, { scaleX: 0, transformOrigin: 'left' },
            { scaleX: 1, duration: 1, ease: 'power2.inOut', scrollTrigger: { trigger: divider as gsap.DOMTarget, start: 'top 85%' } }
          )
        }
      })

      // Services text
      pageRef.current!.querySelectorAll('.services-reveal').forEach((el, i) =>
        fadeLeft(el, { delay: i * 0.1 })
      )

      // Service items stagger
      const items = pageRef.current!.querySelectorAll('.service-item')
      gsap.fromTo(items,
        { opacity: 0, x: 30, scale: 0.95 },
        {
          opacity: 1, x: 0, scale: 1,
          duration: 0.5, stagger: 0.06, ease: 'power2.out',
          scrollTrigger: { trigger: items[0] as gsap.DOMTarget, start: 'top 85%' },
        }
      )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef}>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <Image src={IMAGES.weddingCeremony} alt="Wedding at Vrindavan Gopala" fill className="hero-img object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
        <div className="relative z-10 section-padding pb-12 w-full">
          <div className="container-luxury">
            <p className="hero-reveal text-overline text-gold mb-3">Celebrations</p>
            <h1 className="hero-reveal heading-hero text-cream">Where Love Meets Legend</h1>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding bg-warm-white">
        <div className="container-luxury max-w-3xl text-center">
          <p className="intro-text text-body-lg">
            Set against the awe-inspiring backdrop of Dhuandhar Falls and the ancient marble gorge, Riverside Nature Retreat offers a truly extraordinary setting for destination weddings, milestone celebrations, and corporate retreats.
          </p>
        </div>
      </section>

      {/* Venues */}
      <section className="section-padding bg-cream">
        <div className="container-luxury">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-overline mb-4">Our Venues</p>
            <h2 className="heading-section text-primary">Spaces for Every Occasion</h2>
            <hr className="divider-gold-center mt-6" />
          </div>
          <div className="space-y-16">
            {VENUES.map((venue, i) => (
              <div key={venue.name} className={`venue-section grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
                <div className={`venue-img overflow-hidden ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="aspect-[16/10] relative">
                    <Image src={venue.image} alt={venue.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  </div>
                </div>
                <div className={`venue-content ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h3 className="heading-subsection text-primary mb-3">{venue.name}</h3>
                  <span className="text-overline text-gold-dark">{venue.capacity}</span>
                  <hr className="divider-animate divider-gold mt-4" />
                  <p className="text-body-lg mt-4">{venue.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-forest text-cream">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="services-reveal text-overline text-gold-light mb-4">Our Promise</p>
              <h2 className="services-reveal heading-section text-cream mb-6">Every Detail, Perfected</h2>
              <hr className="divider-gold" />
              <p className="services-reveal text-cream/70 text-lg mt-6">
                From the first consultation to the final farewell, our event team works closely with you to bring your vision to life.
              </p>
            </div>
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SERVICES.map((s) => (
                  <div key={s} className="service-item flex items-center gap-3 border border-cream/10 px-4 py-3">
                    <svg className="w-4 h-4 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-cream/80 text-sm">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-warm-white text-center">
        <div className="container-luxury max-w-2xl">
          <h2 className="heading-section text-primary mb-4">Start Planning Your Celebration</h2>
          <p className="text-stone text-lg mb-8">Share your vision with us and let&apos;s create something extraordinary together.</p>
          <Link href="/contact" className="btn-primary"><span>Send an Inquiry</span></Link>
        </div>
      </section>
    </div>
  )
}
