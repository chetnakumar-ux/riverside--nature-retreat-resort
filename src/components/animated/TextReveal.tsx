'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

interface TextRevealProps {
  text: string
  className?: string
}

/** Scroll-driven word-by-word opacity reveal — GSAP powered */
export function TextReveal({ text, className = '' }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.querySelectorAll('.tr-word').forEach(w => {
        (w as HTMLElement).style.opacity = '1'
      })
      return
    }

    const words = el.querySelectorAll('.tr-word')

    const ctx = gsap.context(() => {
      gsap.fromTo(words,
        { opacity: 0.15, filter: 'blur(2px)' },
        {
          opacity: 1,
          filter: 'blur(0px)',
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'bottom 50%',
            scrub: true,
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  const words = text.split(' ')

  return (
    <div ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="tr-word inline-block mr-[0.35em] mb-[0.15em] opacity-[0.15]">
          {word}
        </span>
      ))}
    </div>
  )
}
