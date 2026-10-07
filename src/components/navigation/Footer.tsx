import React, { useEffect, useRef } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import logoImg from '../../assets/logo.png';
import showroomImg from '../../assets/showroom_interior.jpg';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          once: true,
        }
      });

      gsap.set(contentRef.current, { opacity: 0, y: 20 });
      gsap.set(ruleRef.current, { scaleX: 0, transformOrigin: 'left' });

      tl.to(contentRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
        .to(ruleRef.current, { scaleX: 1, duration: 1, ease: 'power3.inOut' }, "-=0.4");
    }, footerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleScrollToTop = () => {
    window.dispatchEvent(new CustomEvent('scroll-to-top'));
  };

  return (
    <footer ref={footerRef} className="w-full relative pt-16 pb-8 md:pt-24 px-6 md:px-12 text-background z-10 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        <img 
          src={showroomImg} 
          alt="Ply Dot Com Showroom" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-primary/95 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary to-primary/90"></div>
      </div>

      <div ref={contentRef} className="max-w-[1600px] mx-auto w-full flex flex-col relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-12">
          {/* Big Tagline */}
          <h2 className="text-h2 md:text-[5rem] leading-[0.9] tracking-tighter text-white max-w-2xl font-bold">
            BUILDING <br /> <span className="font-serif font-semibold text-accent italic">BETTER SPACES.</span>
          </h2>

          {/* Clean Links */}
          <div className="flex gap-12 md:gap-16">
            <div className="flex flex-col gap-6">
              <h3 className="text-xs text-accent tracking-widest uppercase font-bold">CONNECT</h3>
              <nav className="flex flex-col gap-3">
                <a 
                  href={`https://wa.me/9108087962121?text=${encodeURIComponent("Hello Ply Dot Com, I would like to know more about your plywood options.")}`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-body hover:text-accent transition-colors w-fit"
                >
                  WhatsApp
                </a>
                <a href="tel:08087962121" className="text-body hover:text-accent transition-colors w-fit">Call Us</a>
                <a 
                  href="https://www.instagram.com/plydotcomindia/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-body hover:text-accent transition-colors w-fit"
                >
                  Instagram
                </a>
              </nav>
            </div>
            <div className="flex flex-col gap-6">
              <h3 className="text-xs text-accent tracking-widest uppercase font-bold">EXPLORE</h3>
              <nav className="flex flex-col gap-3">
                <button onClick={() => window.dispatchEvent(new CustomEvent('scroll-to', { detail: '#products' }))} className="text-body hover:text-accent transition-colors text-left w-fit cursor-pointer">Products</button>
                <button onClick={() => window.dispatchEvent(new CustomEvent('scroll-to', { detail: '#about' }))} className="text-body hover:text-accent transition-colors text-left w-fit cursor-pointer">About Us</button>
                <button onClick={() => window.dispatchEvent(new CustomEvent('scroll-to', { detail: '#showroom' }))} className="text-body hover:text-accent transition-colors text-left w-fit cursor-pointer">Showroom</button>
              </nav>
            </div>
          </div>
        </div>

        {/* BOTTOM MASSIVE TEXT */}
        <div className="w-full flex flex-col items-center">
          <div className="w-full mb-12 flex justify-center select-none px-6">
            <img 
              src={logoImg} 
              alt="Ply Dot Com Logo" 
              className="w-full max-w-[250px] md:max-w-[400px] lg:max-w-[500px] h-auto object-contain drop-shadow-2xl" 
            />
          </div>
          
          <div ref={ruleRef} className="w-full h-[1px] bg-accent/30 mb-8"></div>
          <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-background/50 tracking-wide uppercase">
            <p>
              © 2026 Ply Dot Com. All rights reserved. | Developed by{' '}
              <a href="https://nravixa.vercel.app" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-shine transition-colors font-bold tracking-widest">
                NRAVIXA
              </a>
            </p>
            <p className="cursor-pointer hover:text-accent transition-colors font-bold" onClick={handleScrollToTop}>BACK TO TOP ↑</p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
