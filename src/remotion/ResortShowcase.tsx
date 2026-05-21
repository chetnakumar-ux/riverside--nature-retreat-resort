import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from 'remotion'

const SHOWCASE_IMAGES = [
  { src: '/images/resort-hd/entrance-hd.jpg', label: 'The Resort' },
  { src: '/images/resort-hd/room-1.jpg', label: 'Luxury Cottages' },
  { src: '/images/resort-hd/scenic-hd.jpg', label: 'Scenic Views' },
  { src: '/images/resort-hd/dining-1.jpg', label: 'Fine Dining' },
  { src: '/images/resort-hd/event-1.jpg', label: 'Celebrations' },
]

const SLIDE_DURATION = 90 // frames per slide

export const ResortShowcase: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a1a0f' }}>
      {SHOWCASE_IMAGES.map((img, i) => {
        const start = i * SLIDE_DURATION

        return (
          <Sequence key={i} from={start} durationInFrames={SLIDE_DURATION}>
            <SlideTransition frame={frame - start} fps={fps} duration={SLIDE_DURATION}>
              {/* Image with Ken Burns */}
              <AbsoluteFill>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.label}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: `scale(${interpolate(
                      frame - start,
                      [0, SLIDE_DURATION],
                      [1.15, 1],
                      { extrapolateRight: 'clamp' }
                    )})`,
                  }}
                />
              </AbsoluteFill>

              {/* Gradient overlay */}
              <AbsoluteFill
                style={{
                  background: 'linear-gradient(to top, rgba(10,26,15,0.8) 0%, rgba(10,26,15,0.2) 40%, rgba(10,26,15,0.3) 100%)',
                }}
              />

              {/* Label */}
              <AbsoluteFill style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: 60 }}>
                <LabelReveal frame={frame - start} fps={fps} label={img.label} index={i} total={SHOWCASE_IMAGES.length} />
              </AbsoluteFill>
            </SlideTransition>
          </Sequence>
        )
      })}

      {/* Progress dots */}
      <div style={{
        position: 'absolute',
        bottom: 30,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 8,
        zIndex: 10,
      }}>
        {SHOWCASE_IMAGES.map((_, i) => {
          const isActive = Math.floor(frame / SLIDE_DURATION) === i
          return (
            <div
              key={i}
              style={{
                width: isActive ? 24 : 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: isActive ? '#3a8a5e' : 'rgba(240,245,239,0.3)',
                transition: 'all 0.3s ease',
              }}
            />
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

function SlideTransition({
  children,
  frame,
  duration,
}: {
  children: React.ReactNode
  frame: number
  fps: number
  duration: number
}) {
  // Fade in
  const enterOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' })
  // Fade out
  const exitOpacity = interpolate(frame, [duration - 15, duration], [1, 0], { extrapolateLeft: 'clamp' })
  const opacity = Math.min(enterOpacity, exitOpacity)

  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>
}

function LabelReveal({
  frame,
  fps,
  label,
  index,
  total,
}: {
  frame: number
  fps: number
  label: string
  index: number
  total: number
}) {
  const progress = spring({ frame: frame - 10, fps, config: { damping: 25 } })
  const y = interpolate(progress, [0, 1], [40, 0])
  const opacity = progress

  return (
    <div style={{ textAlign: 'center', transform: `translateY(${y}px)`, opacity }}>
      <p style={{
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize: 10,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: '#3a8a5e',
        marginBottom: 8,
        fontWeight: 500,
      }}>
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </p>
      <h2 style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 36,
        fontWeight: 300,
        color: '#f0f5ef',
        margin: 0,
        letterSpacing: '0.02em',
      }}>
        {label}
      </h2>
    </div>
  )
}
