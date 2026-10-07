import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const textures = [
  {
    name: 'MR Grade (Commercial)',
    description: 'Moisture Resistant plywood for interior applications and furniture.',
    url: 'https://image.pollinations.ai/prompt/light%20plywood%20texture%20sheet?width=600&height=800&nologo=true&seed=42',
    filter: '',
    color: '#E6D3B3'
  },
  {
    name: 'BWR Grade (Water Resistant)',
    description: 'Boiling Water Resistant plywood ideal for kitchens and semi-humid areas.',
    url: 'https://image.pollinations.ai/prompt/light%20plywood%20texture%20sheet?width=600&height=800&nologo=true&seed=42',
    filter: 'brightness-90 sepia-[.30] hue-rotate-[-15deg] saturate-150',
    color: '#C49A6C'
  },
  {
    name: 'BWP Grade (Marine)',
    description: 'Boiling Water Proof marine-grade plywood for extreme durability.',
    url: 'https://image.pollinations.ai/prompt/light%20plywood%20texture%20sheet?width=600&height=800&nologo=true&seed=42',
    filter: 'brightness-75 contrast-125 sepia-[.40] hue-rotate-[-20deg] saturate-200',
    color: '#8B5A2B'
  },
  {
    name: 'Calibrated Plywood',
    description: 'Uniform thickness and flawless surface for premium architectural finishes.',
    url: 'https://image.pollinations.ai/prompt/light%20plywood%20texture%20sheet?width=600&height=800&nologo=true&seed=42',
    filter: 'contrast-125 saturate-50 brightness-110',
    color: '#D2B48C'
  }
];

const MaterialLibrary: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.children ? Array.from(cardsRef.current.children) : [];

      gsap.fromTo(cards, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          }
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-primary py-24 px-6 md:px-12" id="textures">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <p className="text-eyebrow text-accent mb-4">THE TEXTURE GALLERY</p>
          <h2 className="text-h2 text-background max-w-2xl">
            EXPLORE OUR <span className="italic text-accent">PREMIUM VENEERS</span>
          </h2>
          <p className="text-body text-background/70 mt-6 max-w-xl">
            From the deep warmth of Walnut to the minimalist brightness of Birch. Discover the perfect grain for your architectural vision.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {textures.map((texture, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="w-full aspect-[4/5] rounded-[2rem] overflow-hidden relative mb-6 shadow-2xl">
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
                <img 
                  src={texture.url} 
                  alt={texture.name}
                  loading="lazy"
                  decoding="async"
                  className={`w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out ${texture.filter}`}
                />
                
                {/* Glossy Overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-white/20 z-20 pointer-events-none opacity-50 group-hover:opacity-30 transition-opacity"></div>
                
                {/* Glassmorphic Label */}
                <div className="absolute bottom-4 left-4 right-4 z-30 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-h4 text-white">{texture.name}</h3>
                    <div className="w-5 h-5 rounded-full border border-white/30 shadow-inner" style={{ backgroundColor: texture.color }}></div>
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed font-light">{texture.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MaterialLibrary;
