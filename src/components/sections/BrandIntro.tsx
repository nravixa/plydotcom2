import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BrandIntro: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

      const headlineLines = headlineRef.current?.querySelectorAll('.reveal-line') || [];
      gsap.set(headlineLines, { y: '100%' });
      gsap.set([eyebrowRef.current, contentRef.current], { opacity: 0, y: 20 });

      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
        .to(headlineLines, { y: '0%', duration: 0.8, stagger: 0.15, ease: 'power3.out' }, "-=0.4")
        .to(contentRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, "-=0.4");
    }, sectionRef.current || undefined);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-primary pt-24 pb-20 sm:pt-32 sm:pb-24 md:pt-40 md:pb-32 px-4 sm:px-6 md:px-12">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* Left Column: Eyebrow & Headline */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-6 mb-6 sm:mb-8 lg:mb-12">
              <p ref={eyebrowRef} className="text-eyebrow text-accent tracking-[0.2em] font-bold">
                THE MATERIAL BEHIND THE SPACE
              </p>
            </div>
            
            <h2 ref={headlineRef} className="text-h1 text-white flex flex-col gap-2 overflow-hidden font-light leading-tight">
              <span className="overflow-hidden inline-block pb-2">
                <span className="reveal-line block tracking-tight">THE RIGHT PLYWOOD</span>
              </span>
              <span className="overflow-hidden inline-block pb-2">
                <span className="reveal-line block italic font-serif text-accent pr-4">IS WHERE GREAT</span>
              </span>
              <span className="overflow-hidden inline-block pb-2">
                <span className="reveal-line block tracking-tight">SPACES BEGIN.</span>
              </span>
            </h2>
          </div>

          {/* Right Column: Glassmorphic Content Card */}
          <div ref={contentRef} className="lg:col-span-5 lg:col-start-8 flex flex-col pt-4 lg:pt-0">
            <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden group hover:bg-black/30 transition-colors duration-500">
              
              {/* Subtle ambient light effect inside card */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-accent/30 transition-colors duration-500"></div>

              <p className="text-body text-white/80 mb-8 sm:mb-12 leading-relaxed relative z-10 text-base sm:text-lg md:text-xl font-light">
                Ply Dot Com brings quality plywood solutions together with practical guidance for homes, interiors, and professional spaces.
              </p>
              
              {/* Stats Block */}
              <div className="grid grid-cols-2 gap-6 sm:gap-8 md:gap-10 mb-8 sm:mb-12 relative z-10">
                <div className="flex flex-col gap-1">
                  <p className="text-3xl sm:text-4xl md:text-5xl font-sans font-medium text-white mb-1">25<span className="text-accent">+</span></p>
                  <p className="text-[11px] sm:text-xs text-white/50 uppercase tracking-[0.15em] font-semibold">Premium Brands</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-3xl sm:text-4xl md:text-5xl font-sans font-medium text-white mb-1">15<span className="text-accent">+</span></p>
                  <p className="text-[11px] sm:text-xs text-white/50 uppercase tracking-[0.15em] font-semibold">Years Experience</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-3xl sm:text-4xl md:text-5xl font-sans font-medium text-white mb-1">100<span className="text-accent">%</span></p>
                  <p className="text-[11px] sm:text-xs text-white/50 uppercase tracking-[0.15em] font-semibold">Quality Assured</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-3xl sm:text-4xl md:text-5xl font-sans font-medium text-white mb-1">500<span className="text-accent">+</span></p>
                  <p className="text-[11px] sm:text-xs text-white/50 uppercase tracking-[0.15em] font-semibold">Projects Supplied</p>
                </div>
              </div>

              <div className="relative z-10">
                <button 
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('scroll-to', { detail: '#contact' }))}
                  className="btn-glassy px-10 py-4 w-full md:w-auto tracking-widest uppercase text-sm cursor-pointer"
                >
                  TALK TO US
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BrandIntro;
