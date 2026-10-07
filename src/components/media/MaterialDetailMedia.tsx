import React, { useRef, useEffect } from 'react';

import heroImg from '../../assets/material_detail.jpg';

interface MaterialDetailMediaProps {
  className?: string;
  src?: string;
  alt?: string;
}

const MaterialDetailMedia: React.FC<MaterialDetailMediaProps> = ({ 
  className = '',
  src = heroImg,
  alt = 'Plywood material detail and texture'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current || !mediaRef.current) return;
    
    // Animation is controlled by the parent component using ScrollTrigger
    // The classes .material-media-container and .material-media-img can be targeted
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`material-media-container relative w-full overflow-hidden bg-primary/5 ${className}`}
    >
      {/* Subtle architectural framing */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/10 z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-primary/10 z-10"></div>
      <div className="absolute top-0 left-0 w-[1px] h-full bg-primary/10 z-10"></div>
      <div className="absolute top-0 right-0 w-[1px] h-full bg-primary/10 z-10"></div>

      <img
        ref={mediaRef}
        src={src}
        alt={alt}
        loading="lazy"
        className="material-media-img w-full h-full object-cover object-center opacity-90 scale-105"
      />
    </div>
  );
};

export default MaterialDetailMedia;
