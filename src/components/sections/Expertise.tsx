import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MaterialDetailMedia from '../media/MaterialDetailMedia';
import WhatsAppButton from '../ui/WhatsAppButton';

gsap.registerPlugin(ScrollTrigger);

const Expertise: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        }
      });

      const listItems = listRef.current?.querySelectorAll('.expertise-item') || [];
      const mediaContainer = mediaRef.current?.querySelector('.material-media-container') as HTMLElement;
      const mediaImg = mediaRef.current?.querySelector('.material-media-img') as HTMLImageElement;

      gsap.set([eyebrowRef.current, headlineRef.current], { opacity: 0, y: 20 });
      gsap.set(listItems, { opacity: 0, x: 20 });
      
      if (mediaContainer && mediaImg) {
        gsap.set(mediaContainer, { clipPath: 'inset(10% 0% 10% 0%)' });
        gsap.set(mediaImg, { scale: 1.1, opacity: 0 });
      }
      
      gsap.set(ctaRef.current, { opacity: 0, y: 20 });

      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
        .to(headlineRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.4");
        
      if (mediaContainer && mediaImg) {
        tl.to(mediaContainer, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power3.inOut' }, "-=0.4")
          .to(mediaImg, { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' }, "-=1.2");
      }
      
      tl.to(listItems, { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' }, "-=0.8")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, "-=0.4");
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-primary py-16 md:py-24 px-6 md:px-12 border-t border-accent/10">
      <div className="max-w-[1600px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          
          {/* Left Column: Headline & Media */}
          <div className="lg:col-span-6 flex flex-col">
            <p ref={eyebrowRef} className="text-eyebrow text-accent mb-6">
              WHY PLY DOT COM
            </p>
            <h2 ref={headlineRef} className="text-h2 text-background mb-12 max-w-xl">
              THE RIGHT MATERIAL. <br />
              <span className="italic text-accent">THE RIGHT GUIDANCE.</span>
            </h2>
            
            <div ref={mediaRef} className="w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/3] mt-12 lg:mt-24 rounded-[2rem] overflow-hidden shadow-2xl relative group">
              <MaterialDetailMedia className="h-full sepia-[.30] hue-rotate-[-10deg] saturate-150 brightness-110" />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 z-20 pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
              
              {/* Floating Glassmorphic Tag */}
              <div className="absolute bottom-6 left-6 z-30 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                <span className="text-xs text-white font-medium tracking-widest uppercase">Premium Materials</span>
              </div>
            </div>
          </div>

          {/* Right Column: Expertise List & CTA */}
          <div className="lg:col-span-5 lg:col-start-8 flex flex-col pt-4 lg:pt-12">
            
            <div ref={listRef} className="flex flex-col gap-6 md:gap-8 mb-16">
              
              {/* Item 01 */}
              <div className="expertise-item flex gap-6 md:gap-8 bg-black/10 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-xl hover:bg-white/5 transition-colors duration-300">
                <span className="text-small text-accent font-medium tracking-widest mt-1 bg-black/20 px-3 py-1 rounded-full border border-white/5 h-fit">01</span>
                <div className="flex flex-col gap-3">
                  <h3 className="text-h3 text-white text-lg md:text-xl uppercase tracking-wide">UNDERSTAND THE REQUIREMENT</h3>
                  <p className="text-body text-white/70">
                    Start with where and how the plywood will be used. Every space has distinct material demands.
                  </p>
                </div>
              </div>

              {/* Item 02 */}
              <div className="expertise-item flex gap-6 md:gap-8 bg-black/10 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-xl hover:bg-white/5 transition-colors duration-300">
                <span className="text-small text-accent font-medium tracking-widest mt-1 bg-black/20 px-3 py-1 rounded-full border border-white/5 h-fit">02</span>
                <div className="flex flex-col gap-3">
                  <h3 className="text-h3 text-white text-lg md:text-xl uppercase tracking-wide">CHOOSE THE RIGHT PLYWOOD</h3>
                  <p className="text-body text-white/70">
                    Explore suitable plywood options curated for your intended application, balancing durability and finish.
                  </p>
                </div>
              </div>

              {/* Item 03 */}
              <div className="expertise-item flex gap-6 md:gap-8 bg-black/10 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-xl hover:bg-white/5 transition-colors duration-300">
                <span className="text-small text-accent font-medium tracking-widest mt-1 bg-black/20 px-3 py-1 rounded-full border border-white/5 h-fit">03</span>
                <div className="flex flex-col gap-3">
                  <h3 className="text-h3 text-white text-lg md:text-xl uppercase tracking-wide">COMPARE AVAILABLE OPTIONS</h3>
                  <p className="text-body text-white/70">
                    Discuss material properties, core strength, and finishes directly with the Ply Dot Com team.
                  </p>
                </div>
              </div>

              {/* Item 04 */}
              <div className="expertise-item flex gap-6 md:gap-8 bg-black/10 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-xl hover:bg-white/5 transition-colors duration-300">
                <span className="text-small text-accent font-medium tracking-widest mt-1 bg-black/20 px-3 py-1 rounded-full border border-white/5 h-fit">04</span>
                <div className="flex flex-col gap-3">
                  <h3 className="text-h3 text-white text-lg md:text-xl uppercase tracking-wide">MAKE AN INFORMED DECISION</h3>
                  <p className="text-body text-white/70">
                    Get the practical information you need and decide with complete confidence for your project.
                  </p>
                </div>
              </div>

            </div>

            {/* CTA */}
            <div ref={ctaRef} className="bg-secondary/40 rounded-3xl p-8 md:p-12 border border-accent/10 flex flex-col items-start gap-6 mt-auto">
              <h4 className="text-h3 text-background text-xl">NOT SURE WHAT YOU NEED?</h4>
              <p className="text-body text-background/70 mb-2">
                We're here to help you navigate material selection.
              </p>
              <WhatsAppButton variant="secondary" className="w-full sm:w-auto rounded-full font-bold">
                TALK TO US ON WHATSAPP
              </WhatsAppButton>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Expertise;
