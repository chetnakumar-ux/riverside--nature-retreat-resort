'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  type?: 'fade' | 'clip-up' | 'clip-left' | 'mask' | 'zoom'
  delay?: number
}

/** Viewport-triggered reveal with clip-path, opacity, and scale */
export function ScrollReveal({ children, className = '', type = 'fade', delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  const variants = {
    fade: {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 },
    },
    'clip-up': {
      hidden: { clipPath: 'inset(100% 0 0 0)' },
      visible: { clipPath: 'inset(0% 0 0 0)' },
    },
    'clip-left': {
      hidden: { clipPath: 'inset(0 100% 0 0)' },
      visible: { clipPath: 'inset(0 0% 0 0)' },
    },
    mask: {
      hidden: { clipPath: 'inset(15% 15% 15% 15% round 50%)' },
      visible: { clipPath: 'inset(0% 0% 0% 0% round 0%)' },
    },
    zoom: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
  }

  const v = variants[type]

  return (
    <motion.div
      ref={ref}
      initial={v.hidden}
      animate={isInView ? v.visible : v.hidden}
      transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
