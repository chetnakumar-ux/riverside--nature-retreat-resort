'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface FadeContentProps {
  children: React.ReactNode
  className?: string
  delay?: number
  staggerChildren?: number
  blur?: boolean
}

export function FadeContent({
  children,
  className = '',
  delay = 0,
  staggerChildren = 0.1,
  blur = false,
}: FadeContentProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5%' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren, delayChildren: delay } },
      }}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 30,
                  filter: blur ? 'blur(6px)' : 'blur(0px)',
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
                },
              }}
            >
              {child}
            </motion.div>
          ))
        : (
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30, filter: blur ? 'blur(6px)' : 'blur(0px)' },
              visible: {
                opacity: 1, y: 0, filter: 'blur(0px)',
                transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
              },
            }}
          >
            {children}
          </motion.div>
        )}
    </motion.div>
  )
}
