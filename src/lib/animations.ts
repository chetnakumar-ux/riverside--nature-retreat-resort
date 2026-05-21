/**
 * GSAP Animation Architecture
 * ============================
 * - All animations respect `prefers-reduced-motion`
 * - ScrollTrigger-based reveals use intersection with viewport
 * - Motion values: opacity, y-transform, blur, clip-path, scale, rotation
 * - Stagger patterns for typography and card grids
 * - Pinned storytelling in 1-2 sections
 * - Magnetic hover effects on CTAs
 * - Text split character/word animations
 * - Image mask and reveal transitions
 */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register immediately when this module loads
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function registerGSAP() {
  if (typeof window === 'undefined') return
  gsap.registerPlugin(ScrollTrigger)
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Fade up reveal for sections */
export function fadeUp(
  element: string | Element | Element[],
  options?: { delay?: number; duration?: number; y?: number; stagger?: number }
) {
  if (prefersReducedMotion()) return
  const { delay = 0, duration = 1, y = 60, stagger = 0 } = options ?? {}
  return gsap.fromTo(
    element,
    { opacity: 0, y, filter: 'blur(4px)' },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration,
      delay,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element as gsap.DOMTarget,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  )
}

/** Fade in from left */
export function fadeLeft(element: string | Element, options?: { delay?: number; x?: number }) {
  if (prefersReducedMotion()) return
  const { delay = 0, x = -80 } = options ?? {}
  return gsap.fromTo(
    element,
    { opacity: 0, x, filter: 'blur(4px)' },
    {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element as gsap.DOMTarget,
        start: 'top 85%',
      },
    }
  )
}

/** Fade in from right */
export function fadeRight(element: string | Element, options?: { delay?: number; x?: number }) {
  if (prefersReducedMotion()) return
  const { delay = 0, x = 80 } = options ?? {}
  return gsap.fromTo(
    element,
    { opacity: 0, x, filter: 'blur(4px)' },
    {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element as gsap.DOMTarget,
        start: 'top 85%',
      },
    }
  )
}

/** Staggered text line reveal */
export function staggerLines(container: string | Element, lineSelector: string) {
  if (prefersReducedMotion()) return
  const lines = gsap.utils.toArray(`${typeof container === 'string' ? container : ''} ${lineSelector}`)
  return gsap.fromTo(
    lines,
    { opacity: 0, y: 40, filter: 'blur(2px)' },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container as gsap.DOMTarget,
        start: 'top 80%',
      },
    }
  )
}

/** Split text into words and animate each */
export function splitTextReveal(element: Element) {
  if (prefersReducedMotion()) return
  const text = element.textContent || ''
  const words = text.split(' ')
  element.innerHTML = words
    .map((w) => `<span class="inline-block overflow-hidden"><span class="split-word inline-block">${w}</span></span>`)
    .join(' ')

  const wordSpans = element.querySelectorAll('.split-word')
  return gsap.fromTo(
    wordSpans,
    { y: '110%', rotation: 8, opacity: 0 },
    {
      y: '0%',
      rotation: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.04,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element as gsap.DOMTarget,
        start: 'top 85%',
      },
    }
  )
}

/** Parallax effect for images */
export function parallax(element: string | Element, speed: number = 0.3) {
  if (prefersReducedMotion()) return
  return gsap.to(element, {
    yPercent: speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: element as gsap.DOMTarget,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}

/** Scale image on scroll — zooms out as you scroll through */
export function scaleOnScroll(element: string | Element) {
  if (prefersReducedMotion()) return
  return gsap.fromTo(
    element,
    { scale: 1.2 },
    {
      scale: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: element as gsap.DOMTarget,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    }
  )
}

/** Clip-path reveal from bottom */
export function clipReveal(element: string | Element) {
  if (prefersReducedMotion()) return
  return gsap.fromTo(
    element,
    { clipPath: 'inset(100% 0 0 0)' },
    {
      clipPath: 'inset(0% 0 0 0)',
      duration: 1.2,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: element as gsap.DOMTarget,
        start: 'top 80%',
      },
    }
  )
}

/** Clip-path reveal from left */
export function clipRevealLeft(element: string | Element) {
  if (prefersReducedMotion()) return
  return gsap.fromTo(
    element,
    { clipPath: 'inset(0 100% 0 0)' },
    {
      clipPath: 'inset(0 0% 0 0)',
      duration: 1.4,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: element as gsap.DOMTarget,
        start: 'top 80%',
      },
    }
  )
}

/** Image reveal with sliding mask overlay */
export function imageReveal(element: Element) {
  if (prefersReducedMotion()) return
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element as gsap.DOMTarget,
      start: 'top 80%',
    },
  })
  tl.fromTo(
    element,
    { clipPath: 'inset(0 0 100% 0)' },
    { clipPath: 'inset(0 0 0% 0)', duration: 1, ease: 'power3.inOut' }
  ).fromTo(
    element.querySelector('img'),
    { scale: 1.3 },
    { scale: 1, duration: 1.4, ease: 'power3.out' },
    0
  )
  return tl
}

/** Counter animation for stats */
export function animateCounter(
  element: Element,
  target: number,
  suffix: string = ''
) {
  if (prefersReducedMotion()) {
    element.textContent = `${target}${suffix}`
    return
  }
  const obj = { val: 0 }
  return gsap.to(obj, {
    val: target,
    duration: 2.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element as gsap.DOMTarget,
      start: 'top 85%',
    },
    onUpdate: () => {
      element.textContent = `${Math.round(obj.val)}${suffix}`
    },
  })
}

/** Stagger card grid with different entry directions */
export function staggerCards(container: Element, cardSelector: string) {
  if (prefersReducedMotion()) return
  const cards = container.querySelectorAll(cardSelector)
  return gsap.fromTo(
    cards,
    { opacity: 0, y: 80, scale: 0.95, filter: 'blur(4px)' },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.9,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container as gsap.DOMTarget,
        start: 'top 80%',
      },
    }
  )
}

/** Rotate in element */
export function rotateIn(element: string | Element) {
  if (prefersReducedMotion()) return
  return gsap.fromTo(
    element,
    { opacity: 0, rotation: -5, scale: 0.9 },
    {
      opacity: 1,
      rotation: 0,
      scale: 1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element as gsap.DOMTarget,
        start: 'top 85%',
      },
    }
  )
}

/** Draw SVG line on scroll */
export function drawLine(element: Element) {
  if (prefersReducedMotion()) return
  return gsap.fromTo(
    element,
    { width: '0%' },
    {
      width: '100%',
      duration: 1.2,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: element as gsap.DOMTarget,
        start: 'top 85%',
      },
    }
  )
}

/** Horizontal scroll section */
export function horizontalScroll(container: string | Element, track: string | Element) {
  if (prefersReducedMotion()) return
  const trackEl = typeof track === 'string' ? document.querySelector(track) : track
  if (!trackEl) return
  const scrollWidth = trackEl.scrollWidth - window.innerWidth

  return gsap.to(track, {
    x: -scrollWidth,
    ease: 'none',
    scrollTrigger: {
      trigger: container as gsap.DOMTarget,
      start: 'top top',
      end: () => `+=${scrollWidth}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
  })
}

/** Scrub-based opacity for scroll-driven storytelling */
export function scrubOpacity(element: string | Element) {
  if (prefersReducedMotion()) return
  return gsap.fromTo(
    element,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: element as gsap.DOMTarget,
        start: 'top 90%',
        end: 'top 40%',
        scrub: true,
      },
    }
  )
}

/** Kill all ScrollTriggers (for cleanup) */
export function killAllTriggers() {
  ScrollTrigger.getAll().forEach((t) => t.kill())
}
