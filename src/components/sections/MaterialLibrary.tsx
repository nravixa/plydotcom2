import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import wood1 from '../../assets/wood-1.jpg';
import wood2 from '../../assets/wood-2.jpg';
import wood3 from '../../assets/wood-3.jpg';
import wood4 from '../../assets/wood-4.jpg';

gsap.registerPlugin(ScrollTrigger);

export interface VeneerTexture {
  id: string;
  code: string;
  name: string;
  species: string;
  category: string;
  description: string;
  fullDescription: string;
  image: string;
  toneColor: string;
  toneName: string;
  recommendedUse: string;
  specs: {
    cutType: string;
    grainCharacter: string;
    finishOption: string;
    sheetSize: string;
  };
}

const textures: VeneerTexture[] = [
  {
    id: 'figured-amber-burl',
    code: 'PV-01',
    name: 'Figured Amber Burl',
    species: 'Exotic Teak Burl',
    category: 'Exotic Collection',
    toneName: 'Amber Gold',
    toneColor: '#D4AF37',
    image: wood1,
    description: 'Rare swirling burl grain with deep golden-amber hues, capturing mesmerizing organic waves and natural luster.',
    fullDescription: 'Crafted from rare, slow-growth burl flitches, this veneer features a breathtaking multi-directional swirl grain with luminous amber depths. Book-matched panels create symmetrical kaleidoscope reflections, making it the definitive choice for statement luxury accents and custom architectural millwork.',
    recommendedUse: 'Focal Feature Walls, Bespoke Conference Tables & Executive Millwork',
    specs: {
      cutType: 'Book-Matched Swirl Burl',
      grainCharacter: 'High-Figure Swirl with Natural Burled Eyes',
      finishOption: 'Clear Satin Luster or Natural Linseed Oil',
      sheetSize: '8ft × 4ft (2440 × 1220 mm)'
    }
  },
  {
    id: 'nordic-white-ash',
    code: 'PV-02',
    name: 'Nordic White Ash',
    species: 'Scandinavian White Timber',
    category: 'Architectural Series',
    toneName: 'Blonde Cream',
    toneColor: '#DEC092',
    image: wood2,
    description: 'Clean Scandinavian blonde timber with vertical linear grain rhythm, engineered for light-filled contemporary aesthetics.',
    fullDescription: 'Embodying minimalist Nordic refinement, this veneer delivers an exceptionally clean, uniform vertical grain with subtle plank articulation. Its bright, airy blonde tone reflects natural daylight effortlessly, making spaces feel expansive, tranquil, and modern.',
    recommendedUse: 'Acoustic Wall Slats, Minimalist Wardrobes & Reception Backdrops',
    specs: {
      cutType: 'Quarter Sliced Vertical Grain',
      grainCharacter: 'Uniform Straight Flitch & Fine Subtle Pores',
      finishOption: 'Zero-Gloss Dead Matte or Nordic White Wash',
      sheetSize: '8ft × 4ft (2440 × 1220 mm)'
    }
  },
  {
    id: 'crown-royal-teak',
    code: 'PV-03',
    name: 'Crown Royal Teak',
    species: 'Natural Golden Teak',
    category: 'Heritage Line',
    toneName: 'Warm Honey Teak',
    toneColor: '#B87F48',
    image: wood3,
    description: 'Distinguished cathedral grain flow with balanced honey-gold undertones, delivering timeless heirloom sophistication.',
    fullDescription: 'Harvested from mature golden teak logs, Crown Royal Teak is sliced along the natural growth rings to yield majestic, flowing cathedral peaks. Renowned for its natural water resistance and dimensional stability, it brings enduring warmth to any architectural interior.',
    recommendedUse: 'Executive Suites, Architectural Doors & Premium Cabinetry',
    specs: {
      cutType: 'Crown Cut Cathedral',
      grainCharacter: 'Continuous Parabolic Flow & Silky Amber Sheen',
      finishOption: 'Hand-Rubbed Natural Oil or Semi-Gloss PU',
      sheetSize: '8ft × 4ft (2440 × 1220 mm)'
    }
  },
  {
    id: 'smoked-royal-walnut',
    code: 'PV-04',
    name: 'Smoked Royal Walnut',
    species: 'Architectural Smoked Timber',
    category: 'Signature Dark Series',
    toneName: 'Smoked Espresso',
    toneColor: '#5C381E',
    image: wood4,
    description: 'Deep espresso-charcoal hues with dramatic architectural shadow relief and high-contrast fumed grain depth.',
    fullDescription: 'Subjected to an artisanal smoking process that naturally reacts with the wood tannins, Smoked Royal Walnut acquires an opulent deep mocha coloration through the entire veneer thickness. Under directional lighting, its tactile grain casts velvety highlights and dramatic depth.',
    recommendedUse: 'Private Theatres, Penthouse Lounges & Luxury Hospitality Cladding',
    specs: {
      cutType: 'Fumed Rift Sliced',
      grainCharacter: 'Deep High-Contrast Grain with Velvet Shadows',
      finishOption: 'Smoked Low-Sheen Polyurethane or Matte Wax',
      sheetSize: '8ft × 4ft (2440 × 1220 mm)'
    }
  }
];

const MaterialLibrary: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedVeneer, setSelectedVeneer] = useState<VeneerTexture | null>(null);

  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = Array.from(cardsRef.current.children);

    const ctx = gsap.context(() => {
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 85%',
          once: true,
        }
      });
    }, sectionRef.current || undefined);

    return () => {
      ctx.revert();
    };
  }, []);

  // Keyboard navigation for inspector modal
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!selectedVeneer) return;
    if (e.key === 'Escape') {
      setSelectedVeneer(null);
    } else if (e.key === 'ArrowRight') {
      const currentIndex = textures.findIndex((t) => t.id === selectedVeneer.id);
      const nextIndex = (currentIndex + 1) % textures.length;
      setSelectedVeneer(textures[nextIndex]);
    } else if (e.key === 'ArrowLeft') {
      const currentIndex = textures.findIndex((t) => t.id === selectedVeneer.id);
      const prevIndex = (currentIndex - 1 + textures.length) % textures.length;
      setSelectedVeneer(textures[prevIndex]);
    }
  }, [selectedVeneer]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleEnquireVeneer = (veneerName: string) => {
    setSelectedVeneer(null);
    const target = document.querySelector('#contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    // Set custom event or update form if applicable
    const enquiryInput = document.querySelector('textarea[name="message"], textarea#message') as HTMLTextAreaElement | null;
    if (enquiryInput) {
      enquiryInput.value = `Hello PLYDOTCOM, I am interested in exploring samples and specifications for ${veneerName}. Please contact me with availability and pricing.`;
    }
  };

  return (
    <section ref={sectionRef} className="w-full bg-primary py-20 md:py-28 px-4 sm:px-6 md:px-12 border-t border-accent/10" id="textures">
      <div className="max-w-[1600px] mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-14 md:mb-20">
          <p className="text-eyebrow text-accent mb-4 tracking-widest font-semibold uppercase text-xs md:text-sm">
            THE TEXTURE GALLERY
          </p>
          <h2 className="text-h2 text-background max-w-3xl leading-tight">
            EXPLORE OUR <span className="italic text-accent">PREMIUM VENEERS</span>
          </h2>
          <p className="text-body text-background/70 mt-5 max-w-2xl text-base md:text-lg">
            From the deep warmth of Walnut to the minimalist brightness of Birch. Discover the perfect grain for your architectural vision.
          </p>

          <div className="flex items-center gap-2 mt-6">
            <span className="w-8 h-px bg-accent/40"></span>
            <span className="text-[11px] uppercase tracking-widest text-accent/80 font-medium">
              4 Selected Architectural Specimens
            </span>
            <span className="w-8 h-px bg-accent/40"></span>
          </div>
        </div>

        {/* 4-Column Responsive Gallery Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {textures.map((texture, index) => (
            <div 
              key={texture.id}
              onClick={() => setSelectedVeneer(texture)}
              className="group cursor-pointer flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-3xl"
              tabIndex={0}
              role="button"
              aria-label={`Inspect ${texture.name} veneer texture`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedVeneer(texture);
                }
              }}
            >
              {/* Veneer Card Frame with explicit aspect ratio */}
              <div 
                className="w-full rounded-3xl overflow-hidden relative shadow-2xl bg-[#111c16] border border-white/10 group-hover:border-accent/60 transition-all duration-500 group-hover:shadow-[0_20px_45px_rgba(212,175,55,0.25)]"
                style={{ aspectRatio: '9 / 16', minHeight: '380px' }}
              >
                {/* Wood Veneer Image: Natural grain clearly visible, fill entire card */}
                <img 
                  src={texture.image} 
                  alt={`${texture.name} - ${texture.species}`}
                  loading="eager"
                  className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-106 transition-transform duration-700 ease-out"
                />

                {/* Light top vignette for badge contrast */}
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10" />

                {/* Top Badge: Veneer Code & Swatch Pill */}
                <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 z-20 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-semibold tracking-widest uppercase text-white/90">
                    {texture.code}
                  </span>
                  <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
                    <span 
                      className="w-2.5 h-2.5 rounded-full border border-white/40 shadow-sm"
                      style={{ backgroundColor: texture.toneColor }}
                      title={texture.toneName}
                    />
                    <span className="text-[10px] tracking-wider text-white/80 font-medium">
                      {texture.toneName}
                    </span>
                  </div>
                </div>

                {/* Hover Grain Light Sheen Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />

                {/* Subtle Bottom Scrim strictly for text legibility */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none z-20" />

                {/* Glassmorphic Architectural Label at Bottom */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-30 bg-black/65 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 md:p-5 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500 shadow-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase tracking-widest text-accent font-semibold">
                      {texture.category}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-white/60">
                      Sample #{index + 1}
                    </span>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-serif text-white group-hover:text-accent transition-colors duration-300 leading-snug">
                    {texture.name}
                  </h3>

                  <p className="text-xs text-white/80 font-light mt-1 leading-relaxed line-clamp-2">
                    {texture.description}
                  </p>

                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/10 text-[11px]">
                    <span className="text-white/60 font-mono text-[10px] tracking-wider">
                      {texture.specs.cutType.split(' ')[0]} Cut
                    </span>
                    <span className="text-accent font-medium inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-300">
                      <span>Inspect Grain</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Architectural Veneer Standards Bar */}
        <div className="mt-16 pt-10 border-t border-accent/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/5">
            <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-1">Authentic Timber</p>
            <p className="text-background/80 text-xs font-light">Natural flitches from sustainable global sources</p>
          </div>
          <div className="p-4 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/5">
            <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-1">Calibrated Bonding</p>
            <p className="text-background/80 text-xs font-light">Zero undulation on BWR & Marine calibrated cores</p>
          </div>
          <div className="p-4 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/5">
            <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-1">Precision Slicing</p>
            <p className="text-background/80 text-xs font-light">Seamless flitch matching & continuous grain flow</p>
          </div>
          <div className="p-4 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/5">
            <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-1">Bespoke Finishes</p>
            <p className="text-background/80 text-xs font-light">Compatible with PU, matte, oil & wax treatments</p>
          </div>
        </div>

      </div>

      {/* High-End Architectural Veneer Inspection Lightbox Modal */}
      {selectedVeneer && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label={`Detailed view of ${selectedVeneer.name}`}
          onClick={() => setSelectedVeneer(null)}
        >
          <div 
            className="relative max-w-5xl w-full bg-[#0d1612] border border-amber-500/40 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.2)] flex flex-col md:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => setSelectedVeneer(null)}
              className="absolute top-4 right-4 z-40 w-10 h-10 rounded-full bg-black/70 border border-white/20 text-white/80 hover:text-white hover:border-accent hover:scale-105 transition-all flex items-center justify-center cursor-pointer shadow-lg"
              title="Close Inspection"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Left: High-Res Wood Texture Showcase */}
            <div className="w-full md:w-1/2 relative bg-black/40 flex items-center justify-center min-h-[300px] md:min-h-[540px] overflow-hidden p-2 sm:p-4">
              <img 
                src={selectedVeneer.image} 
                alt={`${selectedVeneer.name} High Resolution Detail`}
                className="w-full h-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
              />
              <div className="absolute bottom-6 left-6 z-20 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedVeneer.toneColor }}></span>
                <span className="text-xs text-white/90 font-mono tracking-wider">{selectedVeneer.code}</span>
              </div>
            </div>

            {/* Right: Architectural Specifications and Material Details */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-[85vh]">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-eyebrow text-accent text-xs font-semibold uppercase tracking-widest">
                    {selectedVeneer.category}
                  </span>
                  <span className="text-white/30">•</span>
                  <span className="text-white/60 text-xs font-mono">{selectedVeneer.species}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif text-white mb-3">
                  {selectedVeneer.name}
                </h3>

                <p className="text-sm text-white/80 leading-relaxed font-light mb-6">
                  {selectedVeneer.fullDescription}
                </p>

                {/* Technical Specifications Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-black/40 border border-white/10">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-accent/80 font-semibold mb-0.5">Flitch Cut</span>
                    <span className="text-xs text-white/90">{selectedVeneer.specs.cutType}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-accent/80 font-semibold mb-0.5">Sheet Format</span>
                    <span className="text-xs text-white/90">{selectedVeneer.specs.sheetSize}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-accent/80 font-semibold mb-0.5">Grain Character</span>
                    <span className="text-xs text-white/90">{selectedVeneer.specs.grainCharacter}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-accent/80 font-semibold mb-0.5">Surface Finish</span>
                    <span className="text-xs text-white/90">{selectedVeneer.specs.finishOption}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="block text-[10px] uppercase tracking-wider text-accent/80 font-semibold mb-1">Recommended Application</span>
                  <p className="text-xs text-white/75">{selectedVeneer.recommendedUse}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => handleEnquireVeneer(selectedVeneer.name)}
                  className="btn-glossy-gold flex-1 py-3 px-6 text-xs uppercase tracking-wider font-bold inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request Samples</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedVeneer(null)}
                  className="btn-glassy py-3 px-5 text-xs uppercase tracking-wider font-semibold inline-flex items-center justify-center cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MaterialLibrary;

