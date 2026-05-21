'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { IMAGES } from '@/lib/images'
import { RESORT_INFO } from '@/lib/constants'
import { fadeUp, scaleOnScroll } from '@/lib/animations'

const CATEGORIES = ['All', 'Resort', 'Rooms', 'Dining', 'Nature', 'Events'] as const

const GALLERY_IMAGES = [
  { label: 'Resort Entrance & Welcome', category: 'Resort', src: IMAGES.galleryEntrance },
  { label: 'AC Deluxe Cottage Interior', category: 'Rooms', src: IMAGES.galleryCottage },
  { label: 'Dhuandhar Falls Panorama', category: 'Nature', src: IMAGES.galleryFalls },
  { label: 'Garden Pathway at Dusk', category: 'Resort', src: IMAGES.galleryGarden },
  { label: 'Restaurant Dining Area', category: 'Dining', src: IMAGES.galleryDining },
  { label: 'Wedding Ceremony on Lawn', category: 'Events', src: IMAGES.galleryWedding },
  { label: 'Marble Rocks from River', category: 'Nature', src: IMAGES.galleryMarble },
  { label: 'Family Suite Living Area', category: 'Rooms', src: IMAGES.gallerySuite },
  { label: 'Breakfast Spread', category: 'Dining', src: IMAGES.galleryFood },
  { label: 'Narmada River at Sunset', category: 'Nature', src: IMAGES.gallerySunset },
  { label: 'Premium Cottage Balcony View', category: 'Rooms', src: IMAGES.galleryBalcony },
  { label: 'Conference Hall Setup', category: 'Events', src: IMAGES.galleryConference },
  { label: 'Ropeway Over Marble Gorge', category: 'Nature', src: IMAGES.galleryRopeway },
  { label: 'Resort Pool Area', category: 'Resort', src: IMAGES.galleryPool },
  { label: 'Evening Cultural Program', category: 'Events', src: IMAGES.galleryCultural },
]

export function GalleryPageContent() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = activeCategory === 'All'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === activeCategory)

  useEffect(() => {
    if (!pageRef.current) return
    const ctx = gsap.context(() => {
      const heroImg = pageRef.current!.querySelector('.hero-img')
      if (heroImg) scaleOnScroll(heroImg)
      pageRef.current!.querySelectorAll('.hero-reveal').forEach((el, i) =>
        fadeUp(el, { delay: 0.3 + i * 0.15 })
      )

      // Filter buttons
      const filterBar = pageRef.current!.querySelector('.filter-bar')
      if (filterBar) fadeUp(filterBar, { delay: 0.2 })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  // Animate gallery items when filter changes
  useEffect(() => {
    const items = document.querySelectorAll('.gallery-grid-item')
    gsap.fromTo(items,
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.04, ease: 'power2.out' }
    )
  }, [activeCategory])

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  return (
    <div ref={pageRef}>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-end overflow-hidden">
        <Image src={IMAGES.galleryEntrance} alt="Gallery" fill className="hero-img object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
        <div className="relative z-10 section-padding pb-12 w-full">
          <div className="container-luxury">
            <p className="hero-reveal text-overline text-gold mb-3">Visual Journey</p>
            <h1 className="hero-reveal heading-hero text-cream">Our Gallery</h1>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding bg-warm-white">
        <div className="container-luxury">
          {/* Category filter */}
          <div className="filter-bar flex flex-wrap justify-center gap-3 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 text-xs font-semibold tracking-widest uppercase transition-all duration-300 border ${
                  activeCategory === cat
                    ? 'bg-primary text-cream border-primary'
                    : 'bg-transparent text-stone border-cream-dark hover:border-gold hover:text-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((img, i) => (
              <button
                key={`${activeCategory}-${img.label}`}
                onClick={() => setLightboxIndex(i)}
                className="gallery-grid-item group relative overflow-hidden aspect-square cursor-pointer"
                aria-label={`View ${img.label}`}
              >
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-all duration-500 flex items-end p-4">
                  <span className="text-cream text-xs opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 font-body tracking-wide">
                    {img.label}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* 3D Tour link */}
          <div className="text-center mt-16">
            <p className="text-stone text-sm mb-4">Want to explore the resort interactively?</p>
            <a href={RESORT_INFO.virtualTour} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <span>Launch 3D Virtual Tour</span>
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[10000] bg-primary/95 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            className="absolute top-6 right-6 text-cream/60 hover:text-cream transition-colors z-10"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close lightbox"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="max-w-4xl w-full aspect-[16/10] relative" onClick={(e) => e.stopPropagation()}>
            <Image
              src={filtered[lightboxIndex]?.src || ''}
              alt={filtered[lightboxIndex]?.label || ''}
              fill
              className="object-contain"
              sizes="80vw"
            />
          </div>

          <button
            className="absolute left-4 md:left-8 text-cream/60 hover:text-cream transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length) }}
            aria-label="Previous image"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            className="absolute right-4 md:right-8 text-cream/60 hover:text-cream transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % filtered.length) }}
            aria-label="Next image"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <p className="absolute bottom-6 text-cream/40 text-sm">
            {lightboxIndex + 1} / {filtered.length}
          </p>
        </div>
      )}
    </div>
  )
}
