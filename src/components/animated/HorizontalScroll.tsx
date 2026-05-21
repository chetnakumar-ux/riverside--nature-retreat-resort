'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

interface HorizontalScrollProps {
  children: React.ReactNode
  className?: string
  height?: string
}

/** Pinned section that scrolls content horizontally — GSAP ScrollTrigger */
export function HorizontalScroll({
  children,
  className = '',
  height = '80vh',
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const scrollWidth = track.scrollWidth - window.innerWidth

    const tween = gsap.to(track, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    return () => { tween.kill() }
  }, [])

  return (
    <div ref={containerRef} className={className}>
      <div className="overflow-hidden" style={{ height }}>
        <div
          ref={trackRef}
          className="flex items-center gap-4 sm:gap-6 md:gap-8 h-full pl-4 sm:pl-8 pr-[20vw]"
          style={{ width: 'max-content' }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
