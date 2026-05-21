'use client'

import Image from 'next/image'
import Link from 'next/link'
import { EXPERIENCES } from '@/lib/constants'
import { IMAGES } from '@/lib/images'
import { AnimatedContent, BlurText, MagneticButton, HorizontalScroll } from '@/components/animated'

const EXP_IMAGES = [IMAGES.expBoat, IMAGES.expFalls, IMAGES.expRopeway, IMAGES.expTemple, IMAGES.expNature, IMAGES.expCulture]

export function Experiences() {
  return (
    <section className="bg-cream overflow-hidden">
      {/* Header — above the pinned section */}
      <div className="section-padding pb-0">
        <div className="container-luxury">
          <AnimatedContent direction="up" className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <p className="text-overline mb-4">Beyond the Resort</p>
            <h2 className="heading-section text-primary">
              <BlurText text="Curated Experiences" animateBy="words" delay={0.08} />
            </h2>
            <hr className="divider-gold-center mt-4 sm:mt-6" />
            <p className="text-body-lg mt-4 sm:mt-6">
              From the thundering falls to ancient temples — discover the extraordinary
              attractions that surround Vrindavan Gopala.
            </p>
          </AnimatedContent>
        </div>
      </div>

      {/* Horizontal pinned scroll gallery */}
      <HorizontalScroll height="80vh" className="bg-cream">
        {EXPERIENCES.map((exp, i) => (
          <div
            key={exp.title}
            className="group flex-shrink-0 w-[70vw] sm:w-[50vw] md:w-[35vw] lg:w-[28vw] h-[65vh] relative overflow-hidden"
          >
            <Image
              src={EXP_IMAGES[i]}
              alt={exp.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="35vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-emerald-light text-[0.55rem] sm:text-[0.6rem] tracking-[0.25em] uppercase font-body font-medium mb-1 sm:mb-2">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="font-display text-lg sm:text-xl md:text-2xl text-cream font-light mb-1 sm:mb-2">{exp.title}</h3>
              <p className="text-cream/50 text-[0.65rem] sm:text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 max-w-xs">
                {exp.description}
              </p>
            </div>
          </div>
        ))}

        {/* Final CTA card */}
        <div className="flex-shrink-0 w-[50vw] sm:w-[30vw] h-[65vh] bg-forest flex items-center justify-center">
          <div className="text-center px-6">
            <p className="font-display text-xl sm:text-2xl text-cream font-light mb-4 sm:mb-6">Explore All</p>
            <MagneticButton>
              <Link href="/experiences" className="bg-emerald hover:bg-emerald-light text-cream px-6 sm:px-8 py-2.5 sm:py-3 text-[0.6rem] sm:text-[0.7rem] font-body font-medium tracking-[0.15em] uppercase inline-block transition-colors">
                View Experiences
              </Link>
            </MagneticButton>
          </div>
        </div>
      </HorizontalScroll>
    </section>
  )
}
