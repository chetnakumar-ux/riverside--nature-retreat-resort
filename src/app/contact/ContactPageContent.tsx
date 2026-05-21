'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { RESORT_INFO } from '@/lib/constants'
import { IMAGES } from '@/lib/images'
import { fadeUp, fadeLeft, fadeRight, scaleOnScroll } from '@/lib/animations'

const FAQS = [
  { q: 'How far is the resort from Jabalpur city?', a: 'Riverside Nature Retreat, Central India is located in Bhedaghat, approximately 20 km from Jabalpur city center. The drive takes about 30\u201340 minutes.' },
  { q: 'What is the best time to visit?', a: 'The best time to visit is between October and March when the weather is pleasant. The monsoon season (July\u2013September) offers dramatic views of the swollen Narmada and thundering falls, but boat rides may be suspended.' },
  { q: 'Do you arrange transportation from Jabalpur station/airport?', a: 'Yes, our travel desk can arrange cab pickups from Jabalpur Railway Station and Jabalpur Airport (Dumna). Please share your travel details in advance.' },
  { q: 'Can you host destination weddings?', a: 'Absolutely. We specialize in destination weddings with our green marriage lawn, conference halls, catering, and full event coordination. Contact us for a customized quote.' },
  { q: 'Is the resort family-friendly?', a: 'Yes, we welcome families. Our Family Suite Cottages offer spacious accommodation, and the nearby attractions \u2014 boat rides, ropeway, nature walks \u2014 are ideal for all ages.' },
  { q: 'What dining options are available?', a: 'We have a multi-cuisine on-site restaurant serving Indian, Mughlai, and continental dishes. In-room dining is available during select hours. Special dietary requests can be accommodated with advance notice.' },
]

export function ContactPageContent() {
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

      // Form from left
      const form = pageRef.current!.querySelector('.contact-form')
      if (form) fadeLeft(form, { delay: 0.1 })

      // Sidebar from right
      const sidebar = pageRef.current!.querySelector('.contact-sidebar')
      if (sidebar) fadeRight(sidebar, { delay: 0.2 })

      // FAQ header
      const faqHeader = pageRef.current!.querySelector('.faq-header')
      if (faqHeader) fadeUp(faqHeader)

      // FAQ items stagger
      const faqItems = pageRef.current!.querySelectorAll('.faq-item')
      gsap.fromTo(faqItems,
        { opacity: 0, y: 20, x: -10 },
        {
          opacity: 1, y: 0, x: 0,
          duration: 0.5, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: faqItems[0] as gsap.DOMTarget, start: 'top 85%' },
        }
      )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef}>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-end overflow-hidden">
        <Image src={IMAGES.contactHero} alt="Contact Vrindavan Gopala Resort" fill className="hero-img object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
        <div className="relative z-10 section-padding pb-12 w-full">
          <div className="container-luxury">
            <p className="hero-reveal text-overline text-gold mb-3">Get in Touch</p>
            <h1 className="hero-reveal heading-hero text-cream">Contact & Book</h1>
          </div>
        </div>
      </section>

      {/* Contact grid */}
      <section className="section-padding bg-warm-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <div className="contact-form lg:col-span-3">
              <h2 className="heading-subsection text-primary mb-2">Send Us a Message</h2>
              <p className="text-stone text-sm mb-8">
                Whether you&apos;re booking a stay, planning an event, or simply have a question — we&apos;d love to hear from you.
              </p>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()} aria-label="Contact form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField label="Full Name" name="name" type="text" required />
                  <FormField label="Email Address" name="email" type="email" required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField label="Phone Number" name="phone" type="tel" />
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-stone mb-2">Inquiry Type</label>
                    <select name="type" className="w-full border border-cream-dark bg-transparent px-4 py-3.5 text-sm text-primary focus:outline-none focus:border-gold transition-colors appearance-none">
                      <option value="booking">Room Booking</option>
                      <option value="wedding">Wedding / Event</option>
                      <option value="dining">Dining Reservation</option>
                      <option value="experience">Experience / Tour</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="other">General Inquiry</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField label="Check-in Date" name="checkin" type="date" />
                  <FormField label="Check-out Date" name="checkout" type="date" />
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-stone mb-2">Message</label>
                  <textarea name="message" rows={5} className="w-full border border-cream-dark bg-transparent px-4 py-3 text-sm text-primary focus:outline-none focus:border-gold transition-colors resize-none" placeholder="Tell us about your plans, preferences, or questions..." />
                </div>
                <button type="submit" className="btn-primary"><span>Send Inquiry</span></button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="contact-sidebar lg:col-span-2">
              <div className="bg-cream p-8 lg:p-10 mb-8">
                <h3 className="font-display text-lg text-primary mb-6">Contact Details</h3>
                <div className="space-y-5 text-sm">
                  <ContactItem label="Address" value={RESORT_INFO.address} />
                  <ContactItem label="Phone" value={
                    <div className="flex flex-col gap-1">
                      {RESORT_INFO.phone.map((p) => (
                        <a key={p} href={`tel:${p}`} className="hover:text-gold transition-colors">{p}</a>
                      ))}
                    </div>
                  } />
                  <ContactItem label="Email" value={<a href={`mailto:${RESORT_INFO.email}`} className="hover:text-gold transition-colors">{RESORT_INFO.email}</a>} />
                  <ContactItem label="Hours" value={RESORT_INFO.hours} />
                </div>
                <div className="mt-8 flex gap-3">
                  <a href={`https://wa.me/${RESORT_INFO.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-gold !py-2.5 !px-4 !text-xs"><span>WhatsApp</span></a>
                  <a href={`tel:${RESORT_INFO.phone[0]}`} className="btn-primary !py-2.5 !px-4 !text-xs"><span>Call Now</span></a>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="aspect-[4/3] bg-cream-dark flex items-center justify-center relative overflow-hidden">
                <Image src={IMAGES.marbleRocks} alt="Resort location" fill className="object-cover opacity-30" sizes="400px" />
                <div className="relative text-center z-10">
                  <svg className="w-8 h-8 mx-auto text-stone mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <p className="text-primary text-xs tracking-wide uppercase font-semibold">Bhedaghat, Jabalpur</p>
                  <p className="text-stone text-[0.65rem] mt-1">Replace with Google Maps embed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-cream">
        <div className="container-luxury max-w-3xl">
          <div className="faq-header text-center mb-12">
            <p className="text-overline mb-3">Common Questions</p>
            <h2 className="heading-section text-primary">Frequently Asked Questions</h2>
          </div>
          <div>
            {FAQS.map((faq) => (
              <AccordionItem key={faq.q} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function FormField({ label, name, type, required }: { label: string; name: string; type: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-semibold tracking-widest uppercase text-stone mb-2">
        {label} {required && <span className="text-sunset">*</span>}
      </label>
      <input id={name} name={name} type={type} required={required} className="w-full border border-cream-dark bg-transparent px-4 py-3.5 text-sm text-primary focus:outline-none focus:border-gold transition-colors" />
    </div>
  )
}

function ContactItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-widest uppercase text-gold mb-1">{label}</p>
      <div className="text-primary/80">{value}</div>
    </div>
  )
}

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="faq-item accordion-item">
      <button className="accordion-trigger" onClick={() => setOpen(!open)} aria-expanded={open}>
        {question}
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>
      <div className={`accordion-content ${open ? 'open' : ''}`}>
        <p>{answer}</p>
      </div>
    </div>
  )
}
