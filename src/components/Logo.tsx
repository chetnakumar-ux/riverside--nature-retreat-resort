'use client'

import Image from 'next/image'

interface LogoProps {
  className?: string
  light?: boolean
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <Image
      src="/logo-site.png"
      alt="Vrindavan Gopala Resort"
      width={380}
      height={250}
      className={className}
      style={{ objectFit: 'contain' }}
      priority
    />
  )
}
