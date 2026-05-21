import { RemotionHero } from '@/components/RemotionHero'
import { Intro } from '@/components/sections/Intro'
import { Rooms } from '@/components/sections/Rooms'
import { ImageBreak } from '@/components/sections/ImageBreak'
import { Nature } from '@/components/sections/Nature'
import { Dining } from '@/components/sections/Dining'
import { Weddings } from '@/components/sections/Weddings'
import { Experiences } from '@/components/sections/Experiences'
import { RemotionShowcase } from '@/components/RemotionShowcase'
import { GalleryPreview } from '@/components/sections/GalleryPreview'
import { Testimonials } from '@/components/sections/Testimonials'
import { BookingBanner } from '@/components/sections/BookingBanner'
import { IMAGES } from '@/lib/images'

export default function HomePage() {
  return (
    <>
      <RemotionHero />
      <Intro />
      <ImageBreak
        src={IMAGES.naturePanorama}
        alt="Narmada valley panoramic view"
        quote="The Narmada carved this marble gorge over millennia — one of only three such wonders on earth"
      />
      <Rooms />
      <Nature />
  
      <Dining />
      <Weddings />
      <Experiences />
      <RemotionShowcase />
      <GalleryPreview />
      <Testimonials />
      <BookingBanner />
    </>
  )
}
