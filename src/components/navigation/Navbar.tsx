import React, { useState, useEffect, useRef } from 'react';

import gsap from 'gsap';
import Logo from './Logo';
import WhatsAppButton from '../ui/WhatsAppButton';
import MobileMenu from './MobileMenu';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const scrollData = useRef({ lastY: 0, isSolid: false });

  // Handle scroll behavior for the navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const { isSolid } = scrollData.current;

      if (currentY > 50 && !isSolid) {
        // Transition to solid emerald
        gsap.to(headerRef.current, {
          backgroundColor: 'rgba(11, 46, 32, 0.95)', // Forest Green with some transparency
          backdropFilter: 'blur(8px)',
          borderBottomColor: 'rgba(200, 169, 106, 0.2)', // accent color faint
          duration: 0.3,
          ease: 'power2.out'
        });
        scrollData.current.isSolid = true;
      } else if (currentY <= 50 && isSolid) {
        // Transition back to transparent
        gsap.to(headerRef.current, {
          backgroundColor: 'transparent',
          backdropFilter: 'blur(0px)',
          borderBottomColor: 'transparent',
          duration: 0.3,
          ease: 'power2.out'
        });
        scrollData.current.isSolid = false;
      }
      
      scrollData.current.lastY = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        ref={headerRef} 
        className="fixed top-0 left-0 w-full z-50 transition-colors duration-300 border-b border-transparent"
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-2 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex-shrink-0 z-50 flex items-center">
            <Logo onClick={() => setIsMobileMenuOpen(false)} />
          </div>

          {/* Desktop & Tablet Navigation */}
          <nav className="hidden md:flex items-center md:gap-4 lg:gap-7 xl:gap-10">
            <a href="#home" className="text-xs lg:text-small text-background hover:text-accent transition-colors whitespace-nowrap">Home</a>
            <a href="#products" className="text-xs lg:text-small text-background hover:text-accent transition-colors whitespace-nowrap">Products</a>
            <a href="#about" className="text-xs lg:text-small text-background hover:text-accent transition-colors whitespace-nowrap">About</a>
            <a href="#showroom" className="text-xs lg:text-small text-background hover:text-accent transition-colors whitespace-nowrap">Showroom</a>
            <a href="#contact" className="text-xs lg:text-small text-background hover:text-accent transition-colors whitespace-nowrap">Contact</a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4 z-50">
            {/* Desktop / Tablet WhatsApp CTA Button */}
            <div className="hidden md:flex items-center">
              <WhatsAppButton 
                variant="secondary" 
                className="rounded-full font-bold !px-3.5 !py-1.5 md:!px-4 md:!py-2 lg:!px-6 lg:!py-2.5 !text-xs shadow-lg hover:scale-105 transition-transform duration-300 whitespace-nowrap"
              >
                <span>WhatsApp</span><span className="hidden lg:inline ml-1">Us</span>
              </WhatsAppButton>
            </div>
            
            {/* Mobile WhatsApp Icon Button (Visible on mobile, perfectly sized and aligned with menu toggle) */}
            <div className="md:hidden flex items-center">
              <WhatsAppButton 
                variant="icon" 
                iconClassName="w-5 h-5 text-accent group-hover:scale-110 transition-transform"
                className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-accent/30 bg-primary/40 hover:bg-primary/80 hover:border-accent shadow-sm backdrop-blur-sm transition-all duration-300 active:scale-95"
                title="Chat with us on WhatsApp"
              >
                <span className="sr-only">WhatsApp Us</span>
              </WhatsAppButton>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden flex items-center justify-center w-10 h-10 p-2 text-background hover:text-accent focus:outline-none transition-colors rounded-full hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                {isMobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </>
                )}
              </svg>
            </button>
          </div>

        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};

export default Navbar;
