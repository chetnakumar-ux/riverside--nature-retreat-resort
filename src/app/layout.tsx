import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { FloatingCTA } from '@/components/FloatingCTA'
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider'
import { ClickSpark } from '@/components/animated/ClickSpark'
import { CustomCursor } from '@/components/CustomCursor'

export const metadata: Metadata = {
title: 'Riverside Nature Retreat, Central India',
description:
  'A premium riverside nature retreat in Central India offering luxury cottages, scenic views, curated dining, and peaceful stays near iconic natural landmarks like Dhuandhar Falls and the Narmada valley.',
keywords:
  'Riverside Nature Retreat, Central India, Bhedaghat resort, Dhuandhar Falls stay, Jabalpur luxury retreat, Narmada valley resort, Marble Rocks accommodation, destination wedding Central India',
openGraph: {
  title: 'Riverside Nature Retreat | Luxury Nature Stay in Central India',
  description:
    'Escape into nature at Riverside Nature Retreat. Luxury cottages, serene river views, curated dining, and unforgettable stays near Dhuandhar Falls.',
  type: 'website',
  locale: 'en_IN',
  siteName: 'Riverside Nature Retreat',
}
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="cursor-none lg:cursor-none">
        <ClickSpark color="#2d6b4a" particleCount={6}>
          <SmoothScrollProvider>
            <CustomCursor />
            <Header />
            <main>{children}</main>
            <Footer />
            <FloatingCTA />
          </SmoothScrollProvider>
        </ClickSpark>
      </body>
    </html>
  )
}
