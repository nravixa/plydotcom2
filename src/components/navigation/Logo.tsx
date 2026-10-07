import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.png';

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ className = '', onClick }) => {
  return (
    <Link 
      to="/" 
      onClick={onClick}
      className={`inline-flex items-center ${className}`}
      aria-label="Ply Dot Com Home"
    >
        <img 
          src={logoImg} 
          alt="Ply Dot Com Logo" 
          className="h-6 md:h-8 w-auto object-contain mix-blend-screen brightness-125 contrast-125 drop-shadow-[0_2px_10px_rgba(200,169,106,0.2)]"
        />
    </Link>
  );
};

export default Logo;
