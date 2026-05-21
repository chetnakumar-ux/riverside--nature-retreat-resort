'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { IMAGES } from '@/lib/images'
import { AnimatedContent, BlurText, MagneticButton } from '@/components/animated'
import { scaleOnScroll } from '@/lib/animations'

export function Weddings() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      const img = sectionRef.current!.querySelector('.wedding-img')
      if (img) scaleOnScroll(img)
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh] lg:min-h-[80vh]">
        {/* Image side */}
        <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
          <Image src={IMAGES.weddingCeremony} alt="Destination wedding" fill className="wedding-img object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/20 lg:to-forest/30" />
        </div>

        {/* Content side */}
        <div className="bg-forest text-cream flex items-center">
          <div className="p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 max-w-xl">
            <AnimatedContent direction="right">
              <p className="text-overline !text-emerald-light mb-4">Celebrations</p>
            </AnimatedContent>

            <h2 className="heading-section text-cream mb-6">
              <BlurText text="Where Love Meets Legend" animateBy="words" delay={0.08} />
            </h2>

            <AnimatedContent direction="right" delay={0.2}>
              <hr className="divider-gold" />
              <p className="text-cream/70 text-sm sm:text-base md:text-lg leading-relaxed mt-6">
                Imagine your celebration set against the roar of Dhuandhar Falls
                and the ancient beauty of the Narmada valley. Our lush green
                marriage lawns and elegant conference halls transform every
                occasion into a landmark moment.
              </p>
            </AnimatedContent>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-8 md:mt-10">
              {[
                { title: 'Green Marriage Lawn', desc: 'Expansive gardens with falls backdrop' },
                { title: 'Conference Halls', desc: 'Modern facilities for corporate events' },
                { title: 'Catering', desc: 'Custom menus from our culinary team' },
                { title: 'Planning Support', desc: 'Dedicated coordinators' },
              ].map((item, i) => (
                <AnimatedContent key={item.title} direction="up" delay={0.3 + i * 0.1}>
                  <h4 className="font-display text-xs sm:text-sm text-emerald-light mb-1">{item.title}</h4>
                  <p className="text-cream/50 text-[0.65rem] sm:text-xs leading-relaxed">{item.desc}</p>
                </AnimatedContent>
              ))}
            </div>

            <AnimatedContent direction="up" delay={0.6} className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <MagneticButton>
                <Link href="/weddings" className="btn-gold"><span>Plan Your Event</span></Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="/contact" className="btn-outline"><span>Inquire</span></Link>
              </MagneticButton>
            </AnimatedContent>
          </div>
        </div>
      </div>
    </section>
  )
}
