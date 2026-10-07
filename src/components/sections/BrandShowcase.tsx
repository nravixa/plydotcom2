import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Temporary placeholder data structure for easy replacement later
const PARTNER_BRANDS = [
  { id: 'century', name: 'CENTURYPLY' },
  { id: 'greenply', name: 'GREENPLY' },
  { id: 'merino', name: 'MERINO' }
];

const BrandShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !listRef.current) return;

    const ctx = gsap.context(() => {
      const items = listRef.current?.querySelectorAll('.brand-item') || [];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        }
      });

      gsap.set(items, { opacity: 0, y: 15 });

      tl.to(items, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-primary py-12 md:py-20 px-6 md:px-12">
      <div className="max-w-[1600px] mx-auto flex flex-col items-center text-center">
        
        <p className="text-eyebrow text-accent mb-12">
          SELECTED MATERIAL BRANDS
        </p>

        <ul ref={listRef} className="w-full flex flex-wrap items-center justify-center gap-6 md:gap-8">
          {PARTNER_BRANDS.map((brand) => (
            <li 
              key={brand.id} 
              className="brand-item px-10 py-6 md:px-16 md:py-8 flex items-center justify-center rounded-[2rem] bg-black/10 backdrop-blur-md border border-white/10 shadow-xl hover:bg-white/5 transition-all duration-300 cursor-default"
            >
              <span className="text-h3 md:text-h2 font-serif text-background/90 tracking-widest uppercase hover:text-white transition-colors duration-300">
                {brand.name}
              </span>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
};

export default BrandShowcase;
