import React, { useRef, useEffect } from 'react';

// Use the hero_interior.jpg
import heroImg from '../../assets/hero_interior.jpg';

interface HeroMediaProps {
  className?: string;
}

const HeroMedia: React.FC<HeroMediaProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current || !mediaRef.current) return;
    
    // Subtle parallax or reveal effect can be attached here later
    // For Phase 2, the entrance animation is handled in the parent Hero component
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-[50vh] md:h-[80vh] overflow-hidden bg-secondary/30 rounded-3xl ${className}`}
    >

      <img
        ref={mediaRef}
        src={heroImg}
        alt="Premium plywood and architectural interior material"
        className="w-full h-full object-cover object-center opacity-90 scale-105"
        fetchPriority="high"
        loading="eager"
      />
      
      {/* Subtle overlay gradient to ensure text contrast if it ever overlaps */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
    </div>
  );
};

export default HeroMedia;
