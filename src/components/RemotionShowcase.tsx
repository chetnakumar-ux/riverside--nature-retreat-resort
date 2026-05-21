'use client'

import { Player } from '@remotion/player'
import { ResortShowcase } from '@/remotion/ResortShowcase'
import { AnimatedContent, BlurText } from '@/components/animated'

export function RemotionShowcase() {
  return (
    <section className="section-padding bg-primary text-cream overflow-hidden">
      <div className="container-luxury">
        <AnimatedContent direction="up" className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-16">
          <p className="text-overline !text-emerald-light mb-3 sm:mb-4">Cinematic Experience</p>
          <h2 className="heading-section text-cream">
            <BlurText text="Discover Our World" animateBy="words" delay={0.08} />
          </h2>
          <hr className="divider-gold-center mt-4 sm:mt-6" />
          <p className="text-cream/50 text-xs sm:text-sm md:text-base mt-4 sm:mt-6">
            An immersive journey through the resort, from luxury cottages to the
            thundering Dhuandhar Falls
          </p>
        </AnimatedContent>

        <AnimatedContent direction="scale" delay={0.2}>
          {/* Responsive aspect ratio: taller on mobile so content is visible */}
          <div className="relative overflow-hidden rounded-sm aspect-[4/3] sm:aspect-[16/10] md:aspect-video max-w-5xl mx-auto shadow-2xl shadow-primary/50">
            {/* Player wrapper — cover behavior */}
            <div
              className="absolute inset-0 z-0"
              style={{ overflow: 'hidden' }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 'max(100%, calc(100% * 16 / 9 * 3 / 4))',
                  height: 'max(100%, calc(100% * 9 / 16 * 4 / 3))',
                }}
              >
                <Player
                  component={ResortShowcase}
                  compositionWidth={1920}
                  compositionHeight={1080}
                  durationInFrames={450}
                  fps={30}
                  autoPlay
                  loop
                  style={{ width: '100%', height: '100%' }}
                  controls={false}
                  clickToPlay={false}
                  showVolumeControls={false}
                  doubleClickToFullscreen={false}
                  acknowledgeRemotionLicense
                />
              </div>
            </div>

            {/* Corner decorations — above player */}
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-t border-l border-cream/20 z-10 pointer-events-none" />
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-t border-r border-cream/20 z-10 pointer-events-none" />
            <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 md:bottom-4 md:left-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-b border-l border-cream/20 z-10 pointer-events-none" />
            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 md:bottom-4 md:right-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-b border-r border-cream/20 z-10 pointer-events-none" />
          </div>
        </AnimatedContent>
      </div>
    </section>
  )
}
