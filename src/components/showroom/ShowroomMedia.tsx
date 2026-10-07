import React, { useRef } from 'react';
import heroImg from '../../assets/showroom_interior.jpg';

interface ShowroomMediaProps {
  className?: string;
  src?: string;
  alt?: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square' | 'wide' | 'auto';
  caption?: string;
}

const ShowroomMedia: React.FC<ShowroomMediaProps> = ({ 
  className = '',
  src = heroImg,
  alt = 'Ply Dot Com showroom in Pune',
  aspectRatio = 'auto',
  caption
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Animation classes handled by parent via GSAP, 
  // keeping the component clean and reusable.

  const aspectClasses = {
    landscape: 'aspect-[4/3] md:aspect-[3/2]',
    portrait: 'aspect-[3/4] md:aspect-[4/5]',
    square: 'aspect-square',
    wide: 'aspect-video md:aspect-[21/9]',
    auto: 'h-full w-full'
  };

  return (
    <figure className={`showroom-media-wrapper flex flex-col gap-3 ${className}`}>
      <div 
        ref={containerRef}
        className={`showroom-media-container relative w-full overflow-hidden bg-primary/5 ${aspectClasses[aspectRatio]}`}
      >
        {/* Subtle overlay to ensure architectural premium feel */}
        <div className="absolute inset-0 bg-primary/5 z-10 mix-blend-multiply transition-opacity duration-700 hover:opacity-0 pointer-events-none"></div>
        
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="showroom-media-img w-full h-full object-cover object-center scale-105"
        />
      </div>
      
      {caption && (
        <figcaption className="showroom-media-caption text-small text-background/60 tracking-wide">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default ShowroomMedia;
