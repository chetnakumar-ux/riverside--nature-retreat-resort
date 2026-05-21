'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

interface ParallaxImageProps {
  src: string
  alt: string
  speed?: number
  className?: string
  sizes?: string
  priority?: boolean
}

/** Image with GSAP parallax — synced with Lenis smooth scroll */
export function ParallaxImage({
  src,
  alt,
  speed = 0.2,
  className = '',
  sizes = '100vw',
  priority = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const img = imgRef.current
    if (!container || !img) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Start slightly zoomed, parallax shift on scroll
    gsap.set(img, { scale: 1.15 })

    const tween = gsap.to(img, {
      yPercent: speed * 30,
      scale: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => { tween.kill() }
  }, [speed])

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={imgRef} className="relative w-full h-full">
        <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} priority={priority} />
      </div>
    </div>
  )
}
