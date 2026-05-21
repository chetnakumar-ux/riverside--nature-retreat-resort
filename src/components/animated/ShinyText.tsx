'use client'

interface ShinyTextProps {
  text: string
  className?: string
  speed?: number
}

export function ShinyText({ text, className = '', speed = 3 }: ShinyTextProps) {
  return (
    <span
      className={`relative inline-block ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(120deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 70%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'inherit',
        animation: `shinySlide ${speed}s linear infinite`,
      }}
    >
      <style>{`
        @keyframes shinySlide {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      {text}
    </span>
  )
}
