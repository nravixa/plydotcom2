import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ShowroomMedia from '../showroom/ShowroomMedia';
import WhatsAppButton from '../ui/WhatsAppButton';
import Button from '../ui/Button';
import detailImg from '../../assets/material_detail.jpg';

gsap.registerPlugin(ScrollTrigger);

const Showroom: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
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

      // Selectors
      const leftElements = leftColRef.current?.children ? Array.from(leftColRef.current.children) : [];
      const mainMedia = rightColRef.current?.querySelector('.showroom-media-container');
      const mainImg = rightColRef.current?.querySelector('.showroom-media-img');
      const detailElements = detailRef.current?.children ? Array.from(detailRef.current.children) : [];

      // Initial States
      gsap.set(leftElements, { opacity: 0, y: 20 });
      gsap.set(ctaRef.current, { opacity: 0, y: 20 });
      
      if (mainMedia && mainImg) {
        gsap.set(mainMedia, { clipPath: 'inset(0% 100% 0% 0%)' });
        gsap.set(mainImg, { scale: 1.1, opacity: 0 });
      }
      
      gsap.set(detailElements, { opacity: 0, x: -15 });

      // Animation Sequence
      tl.to(leftElements, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' });
      
      if (mainMedia && mainImg) {
        tl.to(mainMedia, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power3.inOut' }, "-=0.2")
          .to(mainImg, { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' }, "-=1.2");
      }

      tl.to(detailElements, { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' }, "-=0.6")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, "-=0.4");
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-primary pt-16 pb-12 md:pt-24 md:pb-16 px-6 md:px-12 border-t border-accent/10">
      <div className="max-w-[1600px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Typography & CTAs */}
          <div ref={leftColRef} className="lg:col-span-5 flex flex-col z-10 pt-4 lg:pt-12">
            <div className="flex items-center gap-4 mb-8">
              <p className="text-eyebrow text-accent">VISIT PLY DOT COM</p>
            </div>

            <h2 className="text-h2 text-background mb-8">
              CHOOSE WITH CONFIDENCE. <br />
              <span className="italic text-accent">SEE IT IN PERSON.</span>
            </h2>

            <p className="text-body text-background/80 mb-12 max-w-md">
              Sometimes the best way to choose a material is to see it, touch it and compare it in person. Visit the Ply Dot Com showroom in Pune and explore plywood options with our team.
            </p>

            {/* Small Detail Story block inside left column for mobile flow, but visually anchored */}
            <div ref={detailRef} className="mt-8 md:mt-16 bg-secondary/40 rounded-3xl p-8 border border-accent/10 w-full max-w-sm mx-auto lg:mx-0">
              <p className="text-eyebrow text-background/60 mb-4 tracking-widest">MATERIAL / DETAIL</p>
              <div className="w-full aspect-[4/3] mb-6 rounded-2xl overflow-hidden">
                <ShowroomMedia src={detailImg} aspectRatio="auto" className="h-full w-full" />
              </div>
              <p className="text-small text-background/90 italic">
                "Good material decisions begin with understanding what the project actually needs."
              </p>
            </div>
          </div>

          {/* Right Column - Large Media & Action */}
          <div className="lg:col-span-7 flex flex-col gap-12 lg:gap-16">
            
            <div ref={rightColRef} className="w-full rounded-3xl overflow-hidden">
              {/* Dominant Visual */}
              <ShowroomMedia 
                aspectRatio="portrait" 
              />
            </div>

            {/* CTA Area */}
            <div ref={ctaRef} className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 border-t border-accent/10 pt-12">
              <div>
                <h3 className="text-h3 text-background mb-2">READY TO EXPLORE?</h3>
                <p className="text-small text-background/60">Find the perfect material for your space.</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <Button variant="outline" className="w-full sm:w-auto">
                  VISIT THE SHOWROOM
                </Button>
                <WhatsAppButton 
                  variant="secondary" 
                  className="w-full sm:w-auto rounded-full font-bold"
                  message="Hello Ply Dot Com, I would like to visit the showroom and explore plywood options."
                >
                  TALK TO US ON WHATSAPP
                </WhatsAppButton>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Showroom;
