import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import WhatsAppButton from '../ui/WhatsAppButton';
import HeroMedia from './HeroMedia';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mediaWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Premium subtle entrance animation sequence
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Initial state: hide elements
      gsap.set([eyebrowRef.current, descRef.current, ctaRef.current], { opacity: 0, y: 20 });
      gsap.set(mediaWrapRef.current, { opacity: 0, scale: 0.98 });

      // Animate lines in headline (assuming simple line reveal)
      const headlineLines = headlineRef.current?.querySelectorAll('.reveal-line') || [];
      gsap.set(headlineLines, { y: '100%' });

      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.6, delay: 0.2 })
        .to(headlineLines, { y: '0%', duration: 0.8, stagger: 0.15 }, "-=0.4")
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .to(mediaWrapRef.current, { opacity: 1, scale: 1, duration: 1.2 }, "-=0.8");
    }, heroRef.current || undefined);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative w-full h-[100svh] flex flex-col justify-end pb-12 md:pb-24 px-6 md:px-12 text-background overflow-hidden"
    >
      {/* Absolute Background Media */}
      <div className="absolute inset-0 z-0 bg-transparent">
        <div ref={mediaWrapRef} className="w-full h-full relative">
          <HeroMedia className="!rounded-none !h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/20 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      </div>

      <div className="w-full max-w-[1600px] mx-auto relative z-10 flex flex-col lg:flex-row items-end justify-between gap-12">
        
        {/* Main Headline */}
        <div className="flex flex-col w-full lg:w-2/3">
          <div className="flex items-center gap-4 mb-6">
            <p ref={eyebrowRef} className="text-eyebrow text-accent">
              PLY DOT COM
            </p>
          </div>

          <h1 ref={headlineRef} className="text-[12vw] md:text-[8vw] leading-[0.9] font-bold tracking-tighter uppercase flex flex-col gap-0 overflow-hidden">
            <span className="overflow-hidden block">
              <span className="reveal-line block">THE MATERIAL</span>
            </span>
            <span className="overflow-hidden block">
              <span className="reveal-line block italic font-serif text-accent/90">OF SPACES.</span>
            </span>
          </h1>
        </div>

        {/* Supporting Context & Actions */}
        <div className="flex flex-col w-full lg:w-1/3 max-w-sm lg:pb-4">
          <p ref={descRef} className="text-body text-background/80 mb-8 font-medium">
            A curated selection of premium plywood for architecture and interiors.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-4">
            <WhatsAppButton variant="secondary" className="w-full sm:w-auto rounded-full px-8 font-bold">
              GET A QUOTE
            </WhatsAppButton>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
