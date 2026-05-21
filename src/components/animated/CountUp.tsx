'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'

interface CountUpProps {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
  decimals?: number
}

export function CountUp({
  target,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
  decimals = 0,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) =>
    decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString()
  )
  const [displayValue, setDisplayValue] = useState('0')

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, {
        duration,
        ease: [0.25, 0.46, 0.45, 0.94],
      })

      const unsubscribe = rounded.on('change', (v) => setDisplayValue(v))

      return () => {
        controls.stop()
        unsubscribe()
      }
    }
  }, [isInView, target, duration, count, rounded])

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: 'backOut' }}
      className={className}
    >
      {prefix}{displayValue}{suffix}
    </motion.span>
  )
}
