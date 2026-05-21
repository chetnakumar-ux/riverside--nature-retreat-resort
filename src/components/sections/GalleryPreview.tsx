'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { IMAGES } from '@/lib/images'
import { RESORT_INFO } from '@/lib/constants'
import { AnimatedContent, BlurText, MagneticButton } from '@/components/animated'

const GALLERY_ITEMS = [
  { label: 'Resort Entrance', src: IMAGES.galleryEntrance },
  { label: 'Cottage Interior', src: IMAGES.galleryCottage },
  { label: 'Dhuandhar Falls', src: IMAGES.galleryFalls },
  { label: 'Garden Pathway', src: IMAGES.galleryGarden },
  { label: 'Dining Hall', src: IMAGES.galleryDining },
  { label: 'Wedding Lawn', src: IMAGES.galleryWedding },
]

export function GalleryPreview() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.to('.play-btn-ring', {
        scale: 1.3, opacity: 0, duration: 1.8, repeat: -1, ease: 'power1.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section-padding bg-primary text-cream overflow-hidden">
      <div className="container-luxury">
        <AnimatedContent direction="up" className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <p className="text-overline !text-emerald-light mb-4">Visual Journey</p>
          <h2 className="heading-section text-cream">
            <BlurText text="A Glimpse of Paradise" animateBy="words" delay={0.08} />
          </h2>
          <hr className="divider-gold-center mt-6" />
        </AnimatedContent>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          {GALLERY_ITEMS.map((item, i) => (
            <AnimatedContent key={item.label} direction="scale" delay={i * 0.08} className={`group relative overflow-hidden cursor-pointer ${i === 2 ? 'row-span-2' : 'aspect-square'}`}>
              <Image src={item.src} alt={item.label} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 50vw, 33vw" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-all duration-500 flex items-center justify-center">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-cream opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                </svg>
              </div>
            </AnimatedContent>
          ))}
        </div>

        {/* Virtual Tour — cinematic video player card */}
        <AnimatedContent direction="up" delay={0.3} className="mt-10 sm:mt-12 md:mt-16">
          <a
            href={RESORT_INFO.virtualTour}
            target="_blank"
            rel="noopener noreferrer"
            className="group block relative overflow-hidden rounded-sm"
          >
            {/* Background image — responsive height */}
            <div className="aspect-[4/3] sm:aspect-[16/9] md:aspect-[2/1] relative">
              <Image src={IMAGES.tourPreview} alt="Virtual tour preview" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" sizes="100vw" />
            </div>

            {/* Overlay — darkens on hover */}
            <div className="absolute inset-0 bg-primary/50 group-hover:bg-primary/65 transition-colors duration-700" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center text-center px-4">
                {/* Play button — large, animated */}
                <div className="relative mb-5 sm:mb-6 md:mb-8">
                  {/* Pulsing outer ring */}
                  <div className="play-btn-ring absolute -inset-3 sm:-inset-4 rounded-full border border-cream/20" />
                  <div className="play-btn-ring absolute -inset-6 sm:-inset-8 rounded-full border border-cream/10" style={{ animationDelay: '0.6s' }} />

                  {/* Main play circle */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-cream/10 backdrop-blur-sm border border-cream/30 flex items-center justify-center group-hover:bg-emerald/20 group-hover:border-emerald/50 group-hover:scale-110 transition-all duration-500">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-cream ml-0.5 sm:ml-1 group-hover:text-emerald-light transition-colors duration-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Text */}
                <p className="font-body text-[0.6rem] sm:text-[0.65rem] text-emerald-light tracking-[0.3em] uppercase font-semibold mb-2 sm:mb-3">360&deg; Virtual Experience</p>
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl text-cream font-light mb-2 sm:mb-3">
                  Take a Virtual Tour
                </h3>
                <p className="font-body text-cream/40 text-[0.7rem] sm:text-xs md:text-sm font-light max-w-xs sm:max-w-md leading-relaxed mb-4 sm:mb-6">
                  Walk through every corner of our resort from the comfort of your screen
                </p>

                {/* CTA label — appears on hover */}
                <span className="font-body text-[0.6rem] sm:text-[0.65rem] text-cream/50 tracking-[0.2em] uppercase font-medium group-hover:text-emerald-light transition-colors duration-500">
                  Click to explore &rarr;
                </span>
              </div>
            </div>

            {/* Corner accents */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-5 h-5 sm:w-7 sm:h-7 border-t border-l border-cream/15 group-hover:border-emerald/30 transition-colors duration-500 pointer-events-none" />
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-5 h-5 sm:w-7 sm:h-7 border-t border-r border-cream/15 group-hover:border-emerald/30 transition-colors duration-500 pointer-events-none" />
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-5 h-5 sm:w-7 sm:h-7 border-b border-l border-cream/15 group-hover:border-emerald/30 transition-colors duration-500 pointer-events-none" />
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-5 h-5 sm:w-7 sm:h-7 border-b border-r border-cream/15 group-hover:border-emerald/30 transition-colors duration-500 pointer-events-none" />
          </a>
        </AnimatedContent>

        <AnimatedContent direction="up" delay={0.4} className="text-center mt-10 md:mt-12">
          <MagneticButton>
            <Link href="/gallery" className="btn-outline !border-cream/30 !text-cream hover:!text-emerald-light hover:!border-emerald/50"><span>View Full Gallery</span></Link>
          </MagneticButton>
        </AnimatedContent>
      </div>
    </section>
  )
}
