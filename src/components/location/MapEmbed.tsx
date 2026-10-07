import React from 'react';

interface MapEmbedProps {
  className?: string;
  title?: string;
}

const MapEmbed: React.FC<MapEmbedProps> = ({ 
  className = '',
  title = "Ply Dot Com Showroom Location, Pune"
}) => {
  // Safe iframe embed URL using the provided address
  // Note: For production, a precise place_id or precise coordinates embed is often better, 
  // but this query string safely loads the map without an API key.
  const query = encodeURIComponent("Sr No 48, 11/2, Sus - Pashan Rd, near Shell Petrol Pump, Tapkir Vasti, Sus, Pune, Maharashtra 411021");
  const embedUrl = `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className={`relative w-full h-full overflow-hidden bg-primary/5 ${className}`}>
      {/* Architectural Frame */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/10 z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-primary/10 z-10 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-[1px] h-full bg-primary/10 z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[1px] h-full bg-primary/10 z-10 pointer-events-none"></div>
      
      <iframe
        title={title}
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1)' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="false"
        tabIndex={0}
      ></iframe>
    </div>
  );
};

export default MapEmbed;
