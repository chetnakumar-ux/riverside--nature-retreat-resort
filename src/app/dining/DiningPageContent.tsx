'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { IMAGES } from '@/lib/images'
import { fadeUp, fadeLeft, clipReveal, scaleOnScroll } from '@/lib/animations'

const MENU_HIGHLIGHTS = [
  {
    category: 'Breakfast',
    items: ['Fresh Poha & Jalebi', 'Masala Dosa', 'Continental Platter', 'Fresh Fruit & Chai'],
  },
  {
    category: 'Lunch & Dinner',
    items: ['Bundeli Thali', 'Paneer Tikka', 'Narmada Fish Curry', 'Aromatic Biryanis'],
  },
  {
    category: 'Specialities',
    items: ['Bhedaghat Kebab Platter', 'Dal Bafla', 'Seasonal Local Delicacies', 'Chef\'s Special Desserts'],
  },
]

export function DiningPageContent() {
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

      // Intro image clip reveal
      const introImg = pageRef.current!.querySelector('.intro-img')
      if (introImg) clipReveal(introImg)

      // Text sections
      pageRef.current!.querySelectorAll('.reveal-left').forEach((el, i) =>
        fadeLeft(el, { delay: i * 0.1 })
      )

      // Menu cards stagger
      const menuCards = pageRef.current!.querySelectorAll('.menu-card')
      gsap.fromTo(menuCards,
        { opacity: 0, y: 60, rotation: -2 },
        {
          opacity: 1, y: 0, rotation: 0,
          duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: menuCards[0] as gsap.DOMTarget, start: 'top 85%' },
        }
      )

      // Service cards
      const serviceCards = pageRef.current!.querySelectorAll('.service-card')
      gsap.fromTo(serviceCards,
        { opacity: 0, scale: 0.9, y: 30 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 0.7, stagger: 0.12, ease: 'back.out(1.3)',
          scrollTrigger: { trigger: serviceCards[0] as gsap.DOMTarget, start: 'top 85%' },
        }
      )

      // Dividers
      pageRef.current!.querySelectorAll('.divider-animate').forEach((d) => {
        gsap.fromTo(d, { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: 'power2.inOut', scrollTrigger: { trigger: d as gsap.DOMTarget, start: 'top 85%' } }
        )
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef}>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <Image src={IMAGES.diningHero} alt="Dining at Vrindavan Gopala" fill className="hero-img object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
        <div className="relative z-10 section-padding pb-12 w-full">
          <div className="container-luxury">
            <p className="hero-reveal text-overline text-gold mb-3">Culinary Journey</p>
            <h1 className="hero-reveal heading-hero text-cream">Flavours of the Valley</h1>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding bg-warm-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="reveal-left text-overline mb-3">Our Restaurant</p>
              <h2 className="reveal-left heading-section text-primary mb-4">Where Every Meal Tells a Story</h2>
              <hr className="divider-animate divider-gold" />
              <p className="reveal-left text-body-lg mt-6">
                Our multi-cuisine restaurant draws from the rich culinary traditions of Madhya Pradesh while embracing contemporary Indian and international flavours. Using fresh, locally-sourced ingredients, our chefs create dishes that celebrate the region&apos;s heritage.
              </p>
              <p className="reveal-left text-body-lg mt-4">
                Dine indoors in our elegantly appointed restaurant or al fresco amidst the gardens, with the distant rumble of Dhuandhar Falls as your evening soundtrack.
              </p>
            </div>
            <div className="intro-img aspect-[4/3] relative overflow-hidden">
              <Image src={IMAGES.diningInterior} alt="Restaurant interior" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      {/* Menu highlights */}
      <section className="section-padding bg-cream">
        <div className="container-luxury">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-overline mb-4">The Menu</p>
            <h2 className="heading-section text-primary">Curated Selections</h2>
            <hr className="divider-animate divider-gold-center mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MENU_HIGHLIGHTS.map((section) => (
              <div key={section.category} className="menu-card bg-warm-white p-8">
                <h3 className="font-display text-xl text-primary mb-4 text-center">{section.category}</h3>
                <hr className="divider-gold-center" />
                <ul className="mt-6 space-y-4">
                  {section.items.map((item) => (
                    <li key={item} className="text-center text-stone text-sm">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-center text-stone text-sm mt-8 italic">
            Menu items are seasonal and subject to availability. Special dietary requirements can be accommodated with advance notice.
          </p>
        </div>
      </section>

      {/* Dining services */}
      <section className="section-padding bg-warm-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'In-Room Dining', desc: 'Enjoy curated meals delivered to the privacy of your cottage. Available during select hours for breakfast, lunch, and dinner.' },
              { title: 'Event Catering', desc: 'Bespoke menus crafted for weddings, celebrations, and corporate gatherings. Our team works closely with you to design the perfect spread.' },
              { title: 'Special Occasions', desc: 'Celebrate birthdays, anniversaries, or intimate dinners with customized setups — from garden candle-lit tables to private dining arrangements.' },
            ].map((item) => (
              <div key={item.title} className="service-card border border-cream-dark p-8 hover:border-gold/30 transition-colors duration-500">
                <h3 className="font-display text-lg text-primary mb-3">{item.title}</h3>
                <p className="text-stone text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-forest text-center">
        <div className="container-luxury max-w-2xl">
          <h2 className="heading-section text-cream mb-4">Reserve Your Table</h2>
          <p className="text-cream/60 mb-8">For special dining requests or event catering inquiries, contact our team.</p>
          <Link href="/contact" className="btn-gold"><span>Get in Touch</span></Link>
        </div>
      </section>
    </div>
  )
}
