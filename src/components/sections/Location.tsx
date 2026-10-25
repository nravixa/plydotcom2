import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MapEmbed from '../location/MapEmbed';
import WhatsAppButton from '../ui/WhatsAppButton';

gsap.registerPlugin(ScrollTrigger);

const Location: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const mapColRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        }
      });

      const leftElements = leftColRef.current?.children ? Array.from(leftColRef.current.children) : [];
      const mapEl = mapColRef.current;

      gsap.set(leftElements, { opacity: 0, y: 20 });
      gsap.set(mapEl, { opacity: 0, clipPath: 'inset(10% 0% 10% 0%)' });
      gsap.set(ctaRef.current, { opacity: 0, y: 20 });

      tl.to(leftElements, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' })
        .to(mapEl, { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power3.inOut' }, "-=0.4")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, "-=0.6");
    }, sectionRef.current || undefined);

    return () => {
      ctx.revert();
    };
  }, []);

  const mapDirectionsUrl = "https://maps.google.com/maps?daddr=" + encodeURIComponent("Sr No 48, 11/2, Sus - Pashan Rd, near Shell Petrol Pump, Tapkir Vasti, Sus, Pune, Maharashtra 411021");

  return (
    <section ref={sectionRef} className="w-full bg-primary py-16 md:py-24 px-6 md:px-12 border-t border-accent/10">
      <div className="max-w-[1600px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Typography & Address */}
          <div ref={leftColRef} className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <p className="text-eyebrow text-accent">VISIT US</p>
            </div>

            <h2 className="text-h2 text-background mb-8 max-w-sm">
              COME SEE THE <br />
              <span className="italic text-accent">MATERIAL</span> IN PERSON.
            </h2>

            <p className="text-body text-background/80 mb-12 max-w-md">
              Visit the Ply Dot Com showroom in Sus, Pune and explore plywood options with our team.
            </p>

            <address className="not-italic flex flex-col gap-8 border-l border-accent/30 pl-6 mb-12">
              <div>
                <h3 className="text-small text-background/60 tracking-widest uppercase mb-2">Showroom Address</h3>
                <p className="text-body text-background leading-relaxed">
                  Sr No 48, 11/2,<br />
                  Sus - Pashan Rd, near Shell Petrol Pump,<br />
                  Tapkir Vasti, Sus,<br />
                  Pune, Maharashtra 411021
                </p>
              </div>
              <div>
                <h3 className="text-small text-background/60 tracking-widest uppercase mb-2">Contact</h3>
                <a href="tel:08087962121" className="text-body text-background hover:text-accent transition-colors duration-300">
                  +91 080 8796 2121
                </a>
              </div>
            </address>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
              <a 
                href={mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glossy-gold inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 text-sm tracking-widest uppercase transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 text-center"
              >
                GET DIRECTIONS
              </a>
              
              <WhatsAppButton 
                variant="secondary"
                className="rounded-full font-bold"
                message="Hello Ply Dot Com, I would like to visit the showroom. Please share directions and any information I should know before visiting."
              >
                WHATSAPP US
              </WhatsAppButton>
            </div>
          </div>

          {/* Right Column - Map Embed */}
          <div className="lg:col-span-7 w-full h-[300px] sm:h-[380px] lg:h-[450px] mt-8 lg:mt-0">
            <div ref={mapColRef} className="w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              <MapEmbed />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Location;
