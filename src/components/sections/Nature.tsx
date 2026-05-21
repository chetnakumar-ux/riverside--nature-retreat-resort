'use client'

import { IMAGES } from '@/lib/images'
import {
  AnimatedContent, BlurText, TextReveal,
  ParallaxImage, ScrollReveal, MouseParallax,
} from '@/components/animated'

export function Nature() {
  return (
    <section className="relative overflow-hidden bg-primary text-cream">
      {/* Multi-layer parallax background */}
      <div className="absolute inset-0 z-0">
        <ParallaxImage
          src={IMAGES.naturePanorama}
          alt="Narmada valley"
          speed={0.25}
          className="absolute inset-[-20%] w-[140%] h-[140%]"
        />
        <div className="absolute inset-0 bg-primary/75" />
      </div>

      <div className="relative z-10 section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <AnimatedContent direction="left">
                <p className="text-overline !text-emerald-light mb-4">The Destination</p>
              </AnimatedContent>

              <h2 className="heading-section text-cream mb-6">
                <BlurText text="Where Marble Meets the Sacred River" animateBy="words" delay={0.06} />
              </h2>

              <AnimatedContent direction="left" delay={0.2}>
                <hr className="divider-gold" />
              </AnimatedContent>

              {/* Scroll-driven text reveal — words light up as you scroll */}
              <div className="mt-6">
                <TextReveal
                  text="Bhedaghat is home to one of the world's three river-carved marble gorges — a geological marvel where towering white, grey, and pink marble cliffs rise 100 feet above the Narmada. The thundering Dhuandhar Falls, just steps from our resort, cascades 30 meters in a veil of mist."
                  className="text-cream/70 text-sm sm:text-base md:text-lg leading-relaxed"
                />
              </div>

              <AnimatedContent direction="up" delay={0.3}>
                <p className="text-cream/70 text-sm sm:text-base md:text-lg leading-relaxed mt-4">
                  This land sits on UNESCO&apos;s tentative heritage list, where the
                  10th-century Chaunsath Yogini Temple crowns a hilltop and moonlit
                  boat rides through the marble canyon reveal a landscape unlike any
                  other on earth.
                </p>
              </AnimatedContent>

              {/* Highlight cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-8 md:mt-10">
                {[
                  { title: 'Dhuandhar Falls', desc: '30m cascade, 300m from resort' },
                  { title: 'Marble Rocks', desc: 'One of three marble gorges worldwide' },
                  { title: 'Yogini Temple', desc: '10th-century circular temple' },
                  { title: 'River Boating', desc: 'Moonlit marble canyon cruises' },
                ].map((item, i) => (
                  <AnimatedContent key={item.title} direction="up" delay={0.4 + i * 0.1}>
                    <div className="border border-cream/10 p-4 sm:p-5 hover:border-emerald/30 hover:bg-cream/5 transition-all duration-500">
                      <h4 className="font-display text-sm sm:text-base text-emerald-light mb-1 sm:mb-2">{item.title}</h4>
                      <p className="text-cream/50 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </AnimatedContent>
                ))}
              </div>
            </div>

            {/* Image stack — parallax + mouse reactive + scroll reveal */}
            <div className="relative hidden lg:block">
              <ScrollReveal type="mask">
                <MouseParallax strength={12}>
                  <ParallaxImage
                    src={IMAGES.waterfallClose}
                    alt="Dhuandhar Falls"
                    speed={0.12}
                    className="relative aspect-[3/4]"
                    sizes="50vw"
                  />
                </MouseParallax>
              </ScrollReveal>

              <ScrollReveal type="clip-left" className="absolute top-1/2 -left-12 w-48 h-64 shadow-2xl border border-cream/10">
                <ParallaxImage
                  src={IMAGES.riverBoat}
                  alt="Narmada boat ride"
                  speed={-0.08}
                  className="w-full h-full"
                  sizes="192px"
                />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
