'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface MouseParallaxProps {
  children: React.ReactNode
  strength?: number
  className?: string
}

/** Content shifts subtly based on mouse position — creates depth */
export function MouseParallax({ children, strength = 20, className = '' }: MouseParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e: MouseEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const x = ((e.clientX - centerX) / rect.width) * strength
      const y = ((e.clientY - centerY) / rect.height) * strength
      setOffset({ x, y })
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [strength])

  return (
    <motion.div
      ref={ref}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 100, damping: 30, mass: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
