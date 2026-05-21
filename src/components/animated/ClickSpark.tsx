'use client'

import { useRef, useEffect } from 'react'

interface ClickSparkProps {
  children: React.ReactNode
  color?: string
  particleCount?: number
}

export function ClickSpark({
  children,
  color = '#2d6b4a',
  particleCount = 8,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Array<{
    x: number; y: number; vx: number; vy: number;
    life: number; size: number
  }>>([])
  const animFrame = useRef<number>(0)
  const colorRef = useRef(color)
  const countRef = useRef(particleCount)

  colorRef.current = color
  countRef.current = particleCount

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onWindowClick = (e: MouseEvent) => {
      const count = countRef.current
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5
        const speed = 2 + Math.random() * 3
        particles.current.push({
          x: e.clientX, y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          size: 2 + Math.random() * 3,
        })
      }
    }
    window.addEventListener('click', onWindowClick)

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.current = particles.current.filter((p) => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.1
        p.life -= 0.02
        if (p.life <= 0) return false
        ctx.globalAlpha = p.life
        ctx.fillStyle = colorRef.current
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fill()
        return true
      })
      animFrame.current = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(animFrame.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('click', onWindowClick)
    }
  }, []) // stable deps — color/count read from refs

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[900] pointer-events-none"
      />
      {children}
    </>
  )
}
