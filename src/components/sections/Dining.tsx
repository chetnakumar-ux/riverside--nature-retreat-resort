'use client'

import Image from 'next/image'
import Link from 'next/link'
import { IMAGES } from '@/lib/images'
import { AnimatedContent, BlurText, MagneticButton, FadeContent } from '@/components/animated'

export function Dining() {
  return (
    <section className="section-padding bg-warm-white overflow-hidden">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Image */}
          <AnimatedContent direction="left" className="lg:col-span-5 relative">
            <div className="aspect-[3/4] overflow-hidden relative">
              <Image src={IMAGES.diningHero} alt="Fine dining" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 42vw" />
            </div>
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-24 h-24 sm:w-32 sm:h-32 bg-emerald/10 hidden md:block" />
          </AnimatedContent>

          {/* Content */}
          <div className="lg:col-span-7 lg:pl-8">
            <AnimatedContent direction="right">
              <p className="text-overline mb-4">Culinary Journey</p>
            </AnimatedContent>

            <h2 className="heading-section text-primary mb-6">
              <BlurText text="Flavours of the Narmada Valley" animateBy="words" delay={0.06} />
            </h2>

            <AnimatedContent direction="right" delay={0.2}>
              <hr className="divider-gold" />
              <p className="text-body-lg mt-6">
                Our on-site restaurant celebrates the rich culinary heritage of
                Madhya Pradesh while embracing contemporary Indian and
                international flavours. Every meal is crafted from fresh,
                locally-sourced ingredients.
              </p>
              <p className="text-body-lg mt-4">
                From traditional Bundeli thalis and aromatic biryanis to
                continental breakfasts overlooking the gardens, each dining moment
                is a celebration of taste and place.
              </p>
            </AnimatedContent>

            <FadeContent delay={0.3} staggerChildren={0.15} blur className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 md:mt-10">
              <div className="border-t border-emerald/30 pt-4">
                <h4 className="font-display text-sm sm:text-base text-primary mb-2">Multi-Cuisine Restaurant</h4>
                <p className="text-stone text-xs sm:text-sm leading-relaxed">Indian, Mughlai, and continental dishes</p>
              </div>
              <div className="border-t border-emerald/30 pt-4">
                <h4 className="font-display text-sm sm:text-base text-primary mb-2">In-Room Dining</h4>
                <p className="text-stone text-xs sm:text-sm leading-relaxed">Curated meals to your cottage</p>
              </div>
              <div className="border-t border-emerald/30 pt-4">
                <h4 className="font-display text-sm sm:text-base text-primary mb-2">Event Catering</h4>
                <p className="text-stone text-xs sm:text-sm leading-relaxed">Bespoke menus for celebrations</p>
              </div>
            </FadeContent>

            <AnimatedContent direction="up" delay={0.5} className="mt-8 md:mt-10">
              <MagneticButton>
                <Link href="/dining" className="btn-primary !bg-forest hover:!bg-forest-light">
                  <span>Explore Our Menu</span>
                </Link>
              </MagneticButton>
            </AnimatedContent>
          </div>
        </div>
      </div>
    </section>
  )
}
