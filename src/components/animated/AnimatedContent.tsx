'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface AnimatedContentProps {
  children: React.ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'none'
  delay?: number
  duration?: number
  distance?: number
  blur?: boolean
  once?: boolean
}

export function AnimatedContent({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 50,
  blur = true,
  once = true,
}: AnimatedContentProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-8%' })

  const directionMap = {
    up: { y: distance, x: 0, scale: 1 },
    down: { y: -distance, x: 0, scale: 1 },
    left: { y: 0, x: distance, scale: 1 },
    right: { y: 0, x: -distance, scale: 1 },
    scale: { y: 0, x: 0, scale: 0.85 },
    none: { y: 0, x: 0, scale: 1 },
  }

  const initial = directionMap[direction]

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: initial.y,
        x: initial.x,
        scale: initial.scale,
        filter: blur ? 'blur(8px)' : 'blur(0px)',
      }}
      animate={
        isInView
          ? { opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' }
          : {}
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
