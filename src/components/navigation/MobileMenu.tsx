import React, { useEffect, useRef } from 'react';

import gsap from 'gsap';
import WhatsAppButton from '../ui/WhatsAppButton';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuRef.current || !linksRef.current) return;

    if (isOpen) {
      // Open animation
      gsap.to(menuRef.current, {
        y: '0%',
        duration: 0.5,
        ease: 'power3.out',
      });
      
      gsap.fromTo(
        linksRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
      );
    } else {
      // Close animation
      gsap.to(menuRef.current, {
        y: '-100%',
        duration: 0.4,
        ease: 'power3.in',
      });
    }
  }, [isOpen]);

  // Lock body scroll and pause Lenis when menu is open
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = '';
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      lenis?.start();
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Handle navigation click with immediate Lenis reactivation
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onClose();
    document.body.style.overflow = '';
    const lenis = (window as unknown as { __lenis?: { start: () => void; scrollTo: (target: string | HTMLElement | number, options?: object) => void } }).__lenis;
    lenis?.start();
    setTimeout(() => {
      if (href === '#home') {
        lenis?.scrollTo(0, { duration: 1.2 });
      } else {
        const target = document.querySelector(href);
        if (target) {
          lenis?.scrollTo(target as HTMLElement, { duration: 1.2, offset: -80 });
        }
      }
    }, 100);
  };

  return (
    <div 
      ref={menuRef}
      data-lenis-prevent
      className="fixed inset-0 z-40 bg-primary flex flex-col pt-24 px-6 pb-12 -translate-y-full will-change-transform"
      aria-hidden={!isOpen}
    >
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <nav ref={linksRef} className="flex flex-col gap-6 text-center mb-12">
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="text-h2 text-background hover:text-accent transition-colors">Home</a>
          <a href="#products" onClick={(e) => handleNavClick(e, '#products')} className="text-h2 text-background hover:text-accent transition-colors">Products</a>
          <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="text-h2 text-background hover:text-accent transition-colors">About</a>
          <a href="#showroom" onClick={(e) => handleNavClick(e, '#showroom')} className="text-h2 text-background hover:text-accent transition-colors">Showroom</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="text-h2 text-background hover:text-accent transition-colors">Contact</a>
        </nav>

        <div className="mt-auto flex flex-col items-center gap-6 opacity-0 translate-y-4" style={{
          animation: isOpen ? 'fadeUp 0.5s ease 0.6s forwards' : 'none'
        }}>
          <div className="h-[1px] w-full bg-accent/20"></div>
          <p className="text-eyebrow text-accent">Connect With Us</p>
          <WhatsAppButton variant="secondary" className="w-full" />
        </div>
      </div>
      
      <style>{`
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default MobileMenu;
