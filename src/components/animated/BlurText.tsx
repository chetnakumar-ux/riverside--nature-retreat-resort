'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface BlurTextProps {
  text: string
  className?: string
  delay?: number
  animateBy?: 'words' | 'letters'
  direction?: 'top' | 'bottom'
  stepDuration?: number
}

export function BlurText({
  text,
  className = '',
  delay = 0.04,
  animateBy = 'words',
  direction = 'bottom',
  stepDuration = 0.4,
}: BlurTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const [segments, setSegments] = useState<string[]>([])

  useEffect(() => {
    if (animateBy === 'words') {
      setSegments(text.split(' '))
    } else {
      setSegments(text.split(''))
    }
  }, [text, animateBy])

  const yFrom = direction === 'top' ? -20 : 20

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {segments.map((segment, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: 'blur(12px)', y: yFrom }}
          animate={isInView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
          transition={{
            duration: stepDuration,
            delay: i * delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="inline-block"
          style={{ marginRight: animateBy === 'words' ? '0.3em' : undefined }}
        >
          {segment}
        </motion.span>
      ))}
    </span>
  )
}
