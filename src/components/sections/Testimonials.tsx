'use client'

import { useEffect, useState } from 'react'
import { TESTIMONIALS } from '@/lib/constants'
import { AnimatedContent, BlurText, GradientText } from '@/components/animated'

export function Testimonials() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setActive((p) => (p + 1) % TESTIMONIALS.length), 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="section-padding bg-warm-white relative overflow-hidden">
      {/* Decorative quote */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 font-display text-[12rem] sm:text-[16rem] md:text-[20rem] text-primary/[0.04] leading-none select-none pointer-events-none">
        &ldquo;
      </div>

      <div className="container-luxury max-w-4xl relative z-10">
        <AnimatedContent direction="up" className="text-center">
          <p className="text-overline mb-4">Guest Stories</p>
          <h2 className="heading-section text-primary mb-10 md:mb-12">
            <BlurText text="Voices of Our Guests" animateBy="words" delay={0.08} />
          </h2>
        </AnimatedContent>

        <AnimatedContent direction="up" delay={0.2} className="relative min-h-[250px] sm:min-h-[280px]">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className={`absolute inset-0 flex flex-col items-center text-center transition-all duration-700 ${i === active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
              <div className="flex gap-1 mb-4 sm:mb-6">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <svg key={s} className="w-3 h-3 sm:w-4 sm:h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="font-display text-lg sm:text-xl md:text-2xl text-primary leading-relaxed mb-6 sm:mb-8 max-w-2xl italic px-4">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <p className="font-body text-xs sm:text-sm font-medium text-primary tracking-wide">
                <GradientText text={t.author} from="#2d6b4a" via="#b8965a" to="#2d6b4a" speed={4} />
              </p>
              <p className="text-stone text-[0.65rem] sm:text-xs tracking-widest uppercase mt-1">{t.context}</p>
            </div>
          ))}
        </AnimatedContent>

        <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} aria-label={`Testimonial ${i + 1}`}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${i === active ? 'bg-emerald w-6 sm:w-8' : 'bg-stone-light/40 hover:bg-stone-light w-1.5 sm:w-2'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
