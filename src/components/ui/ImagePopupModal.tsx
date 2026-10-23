import React, { useState, useEffect, useRef, useCallback } from 'react';
import popup1Img from '../../assets/popup_1.jpeg';
import popup2Img from '../../assets/popup_2.jpeg';

interface ImagePopupModalProps {
  /** Initial delay in ms before first popup entrance (default 300ms) */
  initialDelay?: number;
  /** Auto advance delay in ms for the first popup (default 25000ms) */
  autoAdvanceDelay?: number;
}

const ImagePopupModal: React.FC<ImagePopupModalProps> = ({
  initialDelay = 300,
  autoAdvanceDelay = 25000,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [hasEntered, setHasEntered] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Helper to safely pause/resume Lenis smooth scroll
  const setLenisScroll = (active: boolean) => {
    try {
      const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
      if (lenis) {
        if (active) {
          lenis.start();
        } else {
          lenis.stop();
        }
      }
    } catch {
      // Lenis might not be ready yet
    }
  };

  // Close the popup completely, revealing the website normally
  const handleClose = useCallback(() => {
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    setIsClosing(true);

    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      setLenisScroll(true);
    }, 450);
  }, []);

  // Smoothly advance from step 1 to step 2 (slides popup 2 in from right)
  const handleAdvanceToStep2 = useCallback(() => {
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    setStep(2);
  }, []);

  // Return to step 1
  const handleBackToStep1 = useCallback(() => {
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    setStep(1);
  }, []);

  // Expose global trigger for manual testing or demonstration
  useEffect(() => {
    (window as unknown as { showPlydotcomPopups?: () => void }).showPlydotcomPopups = () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
      setStep(1);
      setIsPaused(false);
      setIsClosing(false);
      setIsOpen(true);
      setHasEntered(false);
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      setLenisScroll(false);

      requestAnimationFrame(() => {
        setTimeout(() => setHasEntered(true), 60);
      });
    };

    return () => {
      delete (window as unknown as { showPlydotcomPopups?: () => void }).showPlydotcomPopups;
    };
  }, []);

  // Initial display sequence on page load or refresh
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setStep(1);
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      setLenisScroll(false);

      requestAnimationFrame(() => {
        setTimeout(() => setHasEntered(true), 60);
      });
    }, initialDelay);

    return () => {
      clearTimeout(showTimer);
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      setLenisScroll(true);
    };
  }, [initialDelay]);

  // Handle auto-advance from Step 1 to Step 2 after delay
  useEffect(() => {
    if (!isOpen || step !== 1 || isClosing || isPaused) {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
      return;
    }

    autoTimerRef.current = setTimeout(() => {
      handleAdvanceToStep2();
    }, autoAdvanceDelay);

    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    };
  }, [isOpen, step, isClosing, isPaused, autoAdvanceDelay, handleAdvanceToStep2]);

  // Keyboard navigation (Escape to advance/close, Left/Right arrows)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (step === 1) {
          handleAdvanceToStep2();
        } else {
          handleClose();
        }
      } else if (e.key === 'ArrowRight' && step === 1) {
        handleAdvanceToStep2();
      } else if (e.key === 'ArrowLeft' && step === 2) {
        handleBackToStep1();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, step, handleAdvanceToStep2, handleBackToStep1, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="PLY DOT COM Special Announcements"
      className={`fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden transition-opacity duration-400 select-none ${
        isClosing ? 'opacity-0 pointer-events-none' : hasEntered ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* 1. Dark transparent luxury backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-500"
        onClick={() => {
          if (step === 1) {
            handleAdvanceToStep2();
          } else {
            handleClose();
          }
        }}
        aria-hidden="true"
      />

      {/* 2. Top Header Bar: Brand badge + Quick Skip button */}
      <div className="absolute top-3 sm:top-5 left-4 right-4 sm:left-8 sm:right-8 z-30 flex items-center justify-between pointer-events-auto">
        {/* Brand pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/70 border border-amber-500/30 backdrop-blur-lg shadow-lg">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-amber-200">
            Ply Dot Com
          </span>
          <span className="text-white/40 text-xs">|</span>
          <span className="text-[11px] sm:text-xs text-stone-300 font-medium">
            {step === 1 ? 'Authorised Distributor (1/2)' : 'Contact & Showroom (2/2)'}
          </span>
        </div>

        {/* Skip to website button */}
        <button
          type="button"
          onClick={handleClose}
          className="group inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/70 border border-white/20 hover:border-amber-400/60 text-stone-300 hover:text-white backdrop-blur-lg transition-all duration-200 text-[11px] sm:text-xs font-medium cursor-pointer shadow-lg active:scale-95"
          title="Skip straight to website"
        >
          <span>Skip to Website</span>
          <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      {/* 3. Popups Viewport Stage: Smooth, coordinated sliding motion */}
      <div
        className="relative w-full h-full max-h-screen flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-hidden pointer-events-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* ========================================================
            POPUP 1: Landscape Announcement
            Entrance: Centered modal with smooth fade-in and scale animation
            Exit: Smoothly glides left out of view when moving to popup 2
           ======================================================== */}
        <div
          className={`absolute max-w-[92vw] sm:max-w-2xl md:max-w-4xl w-full flex flex-col items-center justify-center pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            step === 1
              ? hasEntered
                ? 'translate-x-0 scale-100 opacity-100 pointer-events-auto'
                : 'translate-x-0 scale-90 opacity-0 pointer-events-none'
              : '-translate-x-[110vw] scale-95 opacity-0 pointer-events-none'
          }`}
          style={{ willChange: 'transform, opacity' }}
        >
          {/* Card Shell */}
          <div className="relative group w-full bg-[#0c1310] rounded-2xl sm:rounded-3xl border border-amber-500/40 p-2 sm:p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(212,175,55,0.2)] backdrop-blur-xl">
            {/* Ambient Gold Glow around image */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 via-emerald-600/20 to-amber-500/20 rounded-2xl sm:rounded-3xl blur opacity-75 pointer-events-none" />

            {/* Clear Close (×) Button for Popup 1 (advances to popup 2 per requirement 5) */}
            <button
              type="button"
              onClick={handleAdvanceToStep2}
              aria-label="Close first popup and view next"
              className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-40 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#121c17] text-amber-300 hover:text-white border-2 border-amber-500/60 hover:border-amber-400 shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
              title="Next Announcement"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* "Next" button pill on card */}
            <button
              type="button"
              onClick={handleAdvanceToStep2}
              className="absolute bottom-4 right-4 sm:bottom-5 sm:right-6 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-amber-500/95 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm tracking-wide shadow-xl shadow-amber-500/20 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Next</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Container with object-fit: contain */}
            <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden bg-black/60 flex items-center justify-center">
              <img
                src={popup1Img}
                alt="Ply Dot Com Authorised Distributor of CenturyPly, Archidply, Greenply, Royale Touche"
                className="w-full h-auto max-h-[68vh] sm:max-h-[74vh] object-contain block mx-auto transition-transform duration-500"
                loading="eager"
              />
            </div>

            {/* Auto-advance CSS timer bar (smooth 25s keyframe animation, paused on hover) */}
            <div className="w-full h-1 bg-stone-800/80 rounded-full mt-2 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full ${
                  hasEntered && step === 1 && !isPaused ? 'animate-[autoProgress_25s_linear_forwards]' : ''
                }`}
                style={{
                  animationPlayState: isPaused ? 'paused' : 'running',
                }}
              />
            </div>
          </div>
        </div>

        {/* ========================================================
            POPUP 2: Portrait Contact & Store Poster
            Entrance: Slides smoothly in from the RIGHT-hand side to center
            Exit: Disappears and reveals website when closed
           ======================================================== */}
        <div
          className={`absolute max-w-[92vw] sm:max-w-md md:max-w-[480px] w-full flex flex-col items-center justify-center pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            step === 2
              ? 'translate-x-0 scale-100 opacity-100 pointer-events-auto'
              : 'translate-x-[110vw] scale-95 opacity-0 pointer-events-none'
          }`}
          style={{ willChange: 'transform, opacity' }}
        >
          {/* Card Shell */}
          <div className="relative group w-full bg-[#0c1310] rounded-2xl sm:rounded-3xl border border-amber-500/40 p-2 sm:p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(212,175,55,0.2)] backdrop-blur-xl">
            {/* Ambient Gold Glow around image */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 via-emerald-600/20 to-amber-500/20 rounded-2xl sm:rounded-3xl blur opacity-75 pointer-events-none" />

            {/* Clear Close (×) Button for Popup 2 (reveals website normally) */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close popup and view website"
              className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-40 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#121c17] text-amber-300 hover:text-white border-2 border-amber-500/60 hover:border-amber-400 shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
              title="Close and Enter Website"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image Container with object-fit: contain */}
            <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden bg-black/60 flex items-center justify-center">
              <img
                src={popup2Img}
                alt="Ply Dot Com - Wholesale Plywood, Hardware, Doors, Timber, BTC Wood. Phone: 8087962121 / 8805621111"
                className="w-full h-auto max-h-[70vh] sm:max-h-[76vh] object-contain block mx-auto transition-transform duration-500"
                loading="eager"
              />
            </div>

            {/* Action Bar below Image on Popup 2 */}
            <div className="mt-2.5 sm:mt-3 flex items-center gap-2 sm:gap-3 w-full">
              <a
                href="tel:+918087962121"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 sm:py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Call Store</span>
              </a>

              <button
                type="button"
                onClick={handleClose}
                className="flex-1 inline-flex items-center justify-center py-2 px-3 sm:py-2.5 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-stone-200 hover:text-white border border-white/20 font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-95"
              >
                <span>Explore Site</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Navigation Indicators & Slide Controls */}
      <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4 bg-black/70 border border-amber-500/30 px-4 py-2 rounded-full backdrop-blur-lg shadow-xl pointer-events-auto">
        {/* Step 1 button dot */}
        <button
          type="button"
          onClick={handleBackToStep1}
          aria-label="View first announcement"
          className={`flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
            step === 1 ? 'text-amber-300 font-semibold scale-105' : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <span
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              step === 1 ? 'bg-amber-400 ring-4 ring-amber-400/20' : 'bg-stone-600'
            }`}
          />
          <span className="text-xs">Distributor</span>
        </button>

        <span className="w-px h-3 bg-white/20" />

        {/* Step 2 button dot */}
        <button
          type="button"
          onClick={handleAdvanceToStep2}
          aria-label="View second announcement"
          className={`flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
            step === 2 ? 'text-amber-300 font-semibold scale-105' : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <span
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              step === 2 ? 'bg-amber-400 ring-4 ring-amber-400/20' : 'bg-stone-600'
            }`}
          />
          <span className="text-xs">Showroom</span>
        </button>
      </div>
    </div>
  );
};

export default ImagePopupModal;
