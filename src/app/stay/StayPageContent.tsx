'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ROOMS } from '@/lib/constants'
import { IMAGES } from '@/lib/images'
import { fadeUp, fadeLeft, fadeRight, clipReveal, scaleOnScroll } from '@/lib/animations'

const ROOM_IMAGES = [IMAGES.roomDeluxe, IMAGES.roomFamily, IMAGES.roomPremium]

export function StayPageContent() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!pageRef.current) return
    const ctx = gsap.context(() => {
      // Hero image Ken Burns
      const heroImg = pageRef.current!.querySelector('.hero-img')
      if (heroImg) scaleOnScroll(heroImg)

      // Hero text
      pageRef.current!.querySelectorAll('.hero-reveal').forEach((el, i) =>
        fadeUp(el, { delay: 0.3 + i * 0.15 })
      )

      // Intro text
      const intro = pageRef.current!.querySelector('.intro-text')
      if (intro) fadeUp(intro)

      // Room sections — alternate reveal directions
      pageRef.current!.querySelectorAll('.room-section').forEach((section, i) => {
        const img = section.querySelector('.room-img')
        const content = section.querySelector('.room-content')
        if (img) clipReveal(img)
        if (content) {
          if (i % 2 === 0) fadeRight(content, { delay: 0.2 })
          else fadeLeft(content, { delay: 0.2 })
        }

        // Feature items stagger
        const features = section.querySelectorAll('.feature-item')
        gsap.fromTo(features,
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out',
            scrollTrigger: { trigger: features[0] as gsap.DOMTarget, start: 'top 85%' },
          }
        )

        // Dividers
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
      {/* Page hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <Image
          src={IMAGES.roomsOverview}
          alt="Vrindavan Gopala Resort cottages"
          fill
          className="hero-img object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
        <div className="relative z-10 section-padding pb-12 w-full">
          <div className="container-luxury">
            <p className="hero-reveal text-overline text-gold mb-3">Accommodations</p>
            <h1 className="hero-reveal heading-hero text-cream">Your Signature Stay</h1>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding bg-warm-white">
        <div className="container-luxury max-w-3xl text-center">
          <p className="intro-text text-body-lg">
            Our collection of cottages and suites offers a rare blend of natural
            tranquility and modern comfort. Each accommodation is designed to
            frame the beauty of the Narmada valley — from the verdant gardens to
            the distant marble cliffs.
          </p>
        </div>
      </section>

      {/* Room details */}
      {ROOMS.map((room, i) => (
        <section
          key={room.id}
          id={room.slug}
          className={`room-section section-padding ${i % 2 === 0 ? 'bg-cream' : 'bg-warm-white'}`}
        >
          <div className="container-luxury">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center`}>
              {/* Image */}
              <div className={`room-img overflow-hidden ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="aspect-[4/3] relative">
                  <Image
                    src={ROOM_IMAGES[i]}
                    alt={room.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Content */}
              <div className={`room-content ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <p className="text-overline mb-3">{room.capacity} &middot; {room.size}</p>
                <h2 className="heading-subsection text-primary mb-4">{room.name}</h2>
                <hr className="divider-animate divider-gold" />
                <p className="text-body-lg mt-6">{room.description}</p>

                {/* Features grid */}
                <div className="grid grid-cols-2 gap-3 mt-8">
                  {room.features.map((f) => (
                    <div key={f} className="feature-item flex items-center gap-2">
                      <svg className="w-4 h-4 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-stone">{f}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Link href="/contact" className="btn-primary">
                    <span>Book This Room</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="section-padding bg-primary text-center">
        <div className="container-luxury max-w-2xl">
          <h2 className="heading-section text-cream mb-4">Need Help Choosing?</h2>
          <p className="text-cream/60 text-lg mb-8">
            Our team is happy to help you find the perfect room for your stay.
          </p>
          <Link href="/contact" className="btn-gold">
            <span>Get in Touch</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
