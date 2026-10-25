import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import homeImg from '../../assets/home_interiors.jpg';
import kitchenImg from '../../assets/kitchens.jpg';
import furnitureImg from '../../assets/furniture.jpg';
import commercialImg from '../../assets/commercial_spaces.jpg';

gsap.registerPlugin(ScrollTrigger);

const PlywoodShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !galleryRef.current) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Gallery elements reveal
      const panels = galleryRef.current?.querySelectorAll('.showcase-panel') || [];
      panels.forEach((panel) => {
        const img = panel.querySelector('.showcase-img');
        const label = panel.querySelector('.showcase-label');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: 'top 85%',
            once: true,
          },
        });

        tl.fromTo(
          img,
          { clipPath: 'inset(10% 0% 10% 0%)', scale: 1.05, opacity: 0 },
          { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' }
        ).fromTo(
          label,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
          "-=0.6"
        );
      });
    }, sectionRef.current || undefined);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleSelectCategory = (category: string) => {
    window.dispatchEvent(new CustomEvent('scroll-to', { detail: '#contact' }));
    setTimeout(() => {
      const select = document.querySelector('select#requirement, select[name="requirement"]') as HTMLSelectElement | null;
      if (select) {
        select.value = category;
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, 400);
  };

  return (
    <section ref={sectionRef} className="w-full bg-primary pt-16 pb-16 md:pt-24 md:pb-24 px-6 md:px-12 border-t border-accent/10">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 ref={headingRef} className="text-h2 text-background max-w-2xl">
            PLYWOOD, CHOSEN <br className="hidden md:block" />
            <span className="italic text-accent">FOR THE SPACE</span> IT BUILDS.
          </h2>
          <div className="hidden md:block w-32 h-[1px] bg-accent/20 mb-3"></div>
        </div>

        {/* Clean 2x2 Grid Layout */}
        <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Panel 1 - Home Interiors */}
          <div 
            onClick={() => handleSelectCategory('Home Interior')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectCategory('Home Interior'); }}
            role="button"
            tabIndex={0}
            aria-label="Enquire about Home Interior Plywood"
            className="flex flex-col gap-4 showcase-panel group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[2rem]"
          >
            <div 
              className="relative w-full aspect-[4/3] overflow-hidden bg-secondary/20 rounded-[2rem] shadow-2xl border border-white/5 group-hover:border-accent/40 transition-colors duration-500"
              style={{ aspectRatio: '4 / 3' }}
            >
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
              <img 
                src={homeImg} 
                alt="Plywood for home interiors" 
                loading="lazy"
                className="showcase-img w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 z-20 pointer-events-none opacity-50"></div>
              
              <div className="showcase-label absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 z-30 bg-black/50 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 flex items-center justify-between transform translate-y-1 sm:translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                  <span className="text-[11px] sm:text-xs md:text-sm text-accent font-bold tracking-widest bg-black/50 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-white/10">01</span>
                  <h3 className="text-sm sm:text-lg md:text-h3 text-white tracking-wide">HOME INTERIORS</h3>
                </div>
                <span className="text-accent text-xs font-medium hidden sm:inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Enquire →
                </span>
              </div>
            </div>
          </div>

          {/* Panel 2 - Kitchens */}
          <div 
            onClick={() => handleSelectCategory('Kitchen')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectCategory('Kitchen'); }}
            role="button"
            tabIndex={0}
            aria-label="Enquire about Kitchen Plywood"
            className="flex flex-col gap-4 showcase-panel group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[2rem]"
          >
            <div 
              className="relative w-full aspect-[4/3] overflow-hidden bg-secondary/20 rounded-[2rem] shadow-2xl border border-white/5 group-hover:border-accent/40 transition-colors duration-500"
              style={{ aspectRatio: '4 / 3' }}
            >
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
              <img 
                src={kitchenImg} 
                alt="Plywood for kitchens" 
                loading="lazy"
                className="showcase-img w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 z-20 pointer-events-none opacity-50"></div>
              
              <div className="showcase-label absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 z-30 bg-black/50 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 flex items-center justify-between transform translate-y-1 sm:translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                  <span className="text-[11px] sm:text-xs md:text-sm text-accent font-bold tracking-widest bg-black/50 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-white/10">02</span>
                  <h3 className="text-sm sm:text-lg md:text-h3 text-white tracking-wide">KITCHENS</h3>
                </div>
                <span className="text-accent text-xs font-medium hidden sm:inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Enquire →
                </span>
              </div>
            </div>
          </div>

          {/* Panel 3 - Furniture */}
          <div 
            onClick={() => handleSelectCategory('Furniture')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectCategory('Furniture'); }}
            role="button"
            tabIndex={0}
            aria-label="Enquire about Furniture Plywood"
            className="flex flex-col gap-4 showcase-panel group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[2rem]"
          >
            <div 
              className="relative w-full aspect-[4/3] overflow-hidden bg-secondary/20 rounded-[2rem] shadow-2xl border border-white/5 group-hover:border-accent/40 transition-colors duration-500"
              style={{ aspectRatio: '4 / 3' }}
            >
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
              <img 
                src={furnitureImg} 
                alt="Plywood for furniture" 
                loading="lazy"
                className="showcase-img w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 z-20 pointer-events-none opacity-50"></div>
              
              <div className="showcase-label absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 z-30 bg-black/50 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 flex items-center justify-between transform translate-y-1 sm:translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                  <span className="text-[11px] sm:text-xs md:text-sm text-accent font-bold tracking-widest bg-black/50 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-white/10">03</span>
                  <h3 className="text-sm sm:text-lg md:text-h3 text-white tracking-wide">FURNITURE</h3>
                </div>
                <span className="text-accent text-xs font-medium hidden sm:inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Enquire →
                </span>
              </div>
            </div>
          </div>

          {/* Panel 4 - Commercial Spaces */}
          <div 
            onClick={() => handleSelectCategory('Commercial Space')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectCategory('Commercial Space'); }}
            role="button"
            tabIndex={0}
            aria-label="Enquire about Commercial Space Plywood"
            className="flex flex-col gap-4 showcase-panel group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[2rem]"
          >
            <div 
              className="relative w-full aspect-[4/3] overflow-hidden bg-secondary/20 rounded-[2rem] shadow-2xl border border-white/5 group-hover:border-accent/40 transition-colors duration-500"
              style={{ aspectRatio: '4 / 3' }}
            >
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
              <img 
                src={commercialImg} 
                alt="Plywood for commercial spaces" 
                loading="lazy"
                className="showcase-img w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 z-20 pointer-events-none opacity-50"></div>
              
              <div className="showcase-label absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 z-30 bg-black/50 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 flex items-center justify-between transform translate-y-1 sm:translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                  <span className="text-[11px] sm:text-xs md:text-sm text-accent font-bold tracking-widest bg-black/50 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-white/10">04</span>
                  <h3 className="text-sm sm:text-lg md:text-h3 text-white tracking-wide">COMMERCIAL SPACES</h3>
                </div>
                <span className="text-accent text-xs font-medium hidden sm:inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Enquire →
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PlywoodShowcase;
