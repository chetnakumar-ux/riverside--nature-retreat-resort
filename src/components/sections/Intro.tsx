'use client'

import { IMAGES } from '@/lib/images'
import {
  AnimatedContent, BlurText, CountUp,
  ParallaxImage, ScrollReveal, MouseParallax,
} from '@/components/animated'

export function Intro() {
  return (
    <section className="section-padding bg-warm-white overflow-hidden">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center">
          {/* Text */}
          <div>
            <AnimatedContent direction="left">
              <p className="text-overline mb-4">Welcome to Vrindavan Gopala</p>
            </AnimatedContent>

            <h2 className="heading-section text-primary mb-6">
              <BlurText text="A Sanctuary at the Heart of Nature" animateBy="words" delay={0.06} />
            </h2>

            <AnimatedContent direction="left" delay={0.2}>
              <hr className="divider-gold" />
            </AnimatedContent>

            <AnimatedContent direction="up" delay={0.3}>
              <p className="text-body-lg mt-6">
                Nestled at the foot of the thundering Dhuandhar Falls in Bhedaghat,
                Riverside Nature Retreat offers a rare confluence of natural grandeur
                and refined hospitality. Here, the Narmada river carves through
                ancient marble cliffs — one of only three such gorges in the world.
              </p>
            </AnimatedContent>

            <AnimatedContent direction="up" delay={0.4}>
              <p className="text-body-lg mt-4">
                Whether you seek a peaceful retreat, a family vacation, or a
                destination celebration set against nature&apos;s finest backdrop,
                every moment here is designed to be extraordinary.
              </p>
            </AnimatedContent>

            {/* Counters */}
            <AnimatedContent direction="up" delay={0.5}>
              <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-10 pt-8 border-t border-cream-dark">
                <div className="text-center">
                  <p className="font-display text-2xl sm:text-3xl lg:text-4xl text-primary">
                    <CountUp target={300} suffix="m" duration={2.5} />
                  </p>
                  <p className="text-[0.6rem] sm:text-xs text-stone mt-1 tracking-wide">From Dhuandhar Falls</p>
                </div>
                <div className="text-center">
                  <p className="font-display text-2xl sm:text-3xl lg:text-4xl text-primary">
                    <CountUp target={13} suffix="+" duration={2} />
                  </p>
                  <p className="text-[0.6rem] sm:text-xs text-stone mt-1 tracking-wide">Luxury Cottages</p>
                </div>
                <div className="text-center">
                  <p className="font-display text-2xl sm:text-3xl lg:text-4xl text-primary">
                    <CountUp target={10} suffix="+" duration={2} />
                  </p>
                  <p className="text-[0.6rem] sm:text-xs text-stone mt-1 tracking-wide">Years of Hospitality</p>
                </div>
              </div>
            </AnimatedContent>
          </div>

          {/* Image composition — multi-layer parallax */}
          <div className="relative">
            <ScrollReveal type="clip-up">
              <MouseParallax strength={15}>
                <ParallaxImage
                  src={IMAGES.resortAerial}
                  alt="Vrindavan Gopala Resort"
                  speed={0.15}
                  className="relative aspect-[4/5]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </MouseParallax>
            </ScrollReveal>

            {/* Floating accent — opposite parallax direction */}
            <ScrollReveal type="clip-left" className="absolute -bottom-6 -left-6 w-36 h-36 sm:w-48 sm:h-48 lg:w-56 lg:h-56 shadow-2xl hidden md:block">
              <ParallaxImage
                src={IMAGES.marbleRocks}
                alt="Marble Rocks"
                speed={-0.1}
                className="w-full h-full"
                sizes="224px"
              />
            </ScrollReveal>

            {/* Corner decoration */}
            <AnimatedContent direction="scale" delay={0.7} className="absolute -top-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 border-t-2 border-r-2 border-emerald/30 hidden md:block">
              <span />
            </AnimatedContent>
          </div>
        </div>
      </div>
    </section>
  )
}
