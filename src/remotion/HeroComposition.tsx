import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from 'remotion'

// 4K hero — 3840x2560, Lanczos3 upscaled, sharpened, color-boosted
const HERO_IMAGE = '/images/resort-hd/hero-resort.jpg'

/**
 * Background-only composition: Ken Burns image + aurora blobs + particles + grain.
 * All text and CTAs live in the React layer (RemotionHero.tsx), NOT here.
 */
export const HeroComposition: React.FC = () => {
  const frame = useCurrentFrame()

  const scale = interpolate(frame, [0, 300], [1.25, 1], { extrapolateRight: 'clamp' })

  const overlayOpacity = interpolate(frame, [0, 40, 80], [0.9, 0.55, 0.5], { extrapolateRight: 'clamp' })

  const aurora1X = Math.sin(frame * 0.008) * 15
  const aurora1Y = Math.cos(frame * 0.006) * 10
  const aurora2X = Math.cos(frame * 0.007) * 12
  const aurora2Y = Math.sin(frame * 0.009) * 15
  const aurora3X = Math.sin(frame * 0.005) * 10
  const aurora3Y = Math.cos(frame * 0.01) * 12

  const vignettePulse = interpolate(Math.sin(frame * 0.015), [-1, 1], [0.35, 0.55])

  const particles = Array.from({ length: 15 }).map((_, i) => {
    const baseX = (i * 137.508) % 100
    const baseY = (i * 73.305) % 100
    const speed = 0.3 + (i % 5) * 0.15
    const size = 1.5 + (i % 3) * 1.5
    const offsetX = Math.sin(frame * 0.01 * speed + i) * 25
    const offsetY = Math.cos(frame * 0.008 * speed + i * 0.7) * 20
    const opacity = interpolate(Math.sin(frame * 0.02 + i * 0.5), [-1, 1], [0.08, 0.4])
    return { x: baseX + offsetX * 0.3, y: baseY + offsetY * 0.3, size, opacity }
  })

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a1a0f' }}>
      {/* Background image — Ken Burns zoom */}
      <AbsoluteFill>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMAGE}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${scale})` }}
        />
      </AbsoluteFill>

      {/* Aurora gradients */}
      <AbsoluteFill style={{ opacity: 0.3, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(45,107,74,0.5) 0%, transparent 70%)',
          top: `${-8 + aurora1Y}%`, left: `${-8 + aurora1X}%`, filter: 'blur(100px)',
        }} />
        <div style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,150,90,0.25) 0%, transparent 70%)',
          bottom: `${-8 + aurora2Y}%`, right: `${5 + aurora2X}%`, filter: 'blur(80px)',
        }} />
        <div style={{
          position: 'absolute', width: 350, height: 350, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(26,58,36,0.4) 0%, transparent 70%)',
          top: `${40 + aurora3Y}%`, left: `${50 + aurora3X}%`, filter: 'blur(90px)',
        }} />
      </AbsoluteFill>

      {/* Dark overlay */}
      <AbsoluteFill style={{
        background: `linear-gradient(to bottom, rgba(10,26,15,${overlayOpacity}), rgba(10,26,15,0.25) 50%, rgba(10,26,15,0.75) 100%)`,
        pointerEvents: 'none',
      }} />

      {/* Vignette */}
      <AbsoluteFill style={{
        background: `radial-gradient(ellipse at center, transparent 40%, rgba(10,26,15,${vignettePulse}) 100%)`,
        pointerEvents: 'none',
      }} />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div key={i} style={{
          position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
          width: p.size, height: p.size, borderRadius: '50%',
          backgroundColor: i % 3 === 0 ? '#b8965a' : '#3a8a5e',
          opacity: p.opacity, pointerEvents: 'none',
        }} />
      ))}

      {/* Film grain */}
      <AbsoluteFill style={{
        opacity: 0.035, mixBlendMode: 'overlay', pointerEvents: 'none',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
      }} />
    </AbsoluteFill>
  )
}
