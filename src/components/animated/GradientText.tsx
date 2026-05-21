'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface GradientTextProps {
  text: string
  className?: string
  from?: string
  via?: string
  to?: string
  animate?: boolean
  speed?: number
}

export function GradientText({
  text,
  className = '',
  from = '#b8965a',
  via = '#3a8a5e',
  to = '#cdb07a',
  animate = true,
  speed = 3,
}: GradientTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`inline-block ${className}`}
      style={{
        backgroundImage: `linear-gradient(135deg, ${from}, ${via}, ${to}, ${from})`,
        backgroundSize: animate ? '300% 300%' : '100% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: animate ? `gradientShift ${speed}s ease infinite` : 'none',
      }}
    >
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
      {text}
    </motion.span>
  )
}
