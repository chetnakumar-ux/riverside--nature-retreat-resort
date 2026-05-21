'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ROOMS } from '@/lib/constants'
import { IMAGES } from '@/lib/images'
import { AnimatedContent, BlurText, MagneticButton } from '@/components/animated'

const ROOM_IMAGES = [IMAGES.roomDeluxe, IMAGES.roomFamily, IMAGES.roomPremium]

export function Rooms() {
  return (
    <section className="section-padding bg-cream overflow-hidden">
      <div className="container-luxury">
        {/* Header */}
        <AnimatedContent direction="up" className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <p className="text-overline mb-4">Your Signature Stay</p>
          <h2 className="heading-section text-primary">
            <BlurText text="Cottages Crafted for Unhurried Living" animateBy="words" delay={0.06} />
          </h2>
          <hr className="divider-gold-center mt-6" />
          <p className="text-body-lg mt-6">
            Each cottage at Vrindavan Gopala is a private sanctuary — thoughtfully
            appointed with modern comforts, surrounded by the sights and sounds
            of the Narmada valley.
          </p>
        </AnimatedContent>

        {/* Room cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
          {ROOMS.map((room, i) => (
            <AnimatedContent key={room.id} direction="up" delay={i * 0.15} className="group">
              <div className="card-luxury card-tilt bg-white">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={ROOM_IMAGES[i]}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                    <span className="text-cream text-xs tracking-[0.2em] uppercase font-body font-medium">
                      View Details &rarr;
                    </span>
                  </div>
                </div>

                <div className="p-5 md:p-6 lg:p-8">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display text-lg md:text-xl text-primary">{room.name}</h3>
                    <span className="text-[0.65rem] text-stone tracking-wide">{room.size}</span>
                  </div>
                  <p className="text-stone text-xs sm:text-sm leading-relaxed mb-5">{room.shortDesc}</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5">
                    {room.features.slice(0, 4).map((f) => (
                      <span key={f} className="text-[0.6rem] sm:text-[0.7rem] text-stone-light border border-cream-dark px-2 py-0.5 sm:px-2.5 sm:py-1 tracking-wide">
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-cream-dark">
                    <span className="text-[0.65rem] sm:text-xs text-stone">{room.capacity}</span>
                    <Link href={`/stay#${room.slug}`} className="link-animated text-xs font-medium text-emerald tracking-widest uppercase">
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedContent>
          ))}
        </div>

        <AnimatedContent direction="up" delay={0.5} className="text-center mt-10 md:mt-12">
          <MagneticButton>
            <Link href="/stay" className="btn-primary !bg-forest hover:!bg-forest-light">
              <span>View All Accommodations</span>
            </Link>
          </MagneticButton>
        </AnimatedContent>
      </div>
    </section>
  )
}
