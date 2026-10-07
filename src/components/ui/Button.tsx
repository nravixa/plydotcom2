import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 text-sm tracking-widest uppercase transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2";
  
  const variants = {
    primary: "bg-primary text-background hover:bg-secondary",
    secondary: "btn-glossy-gold",
    outline: "btn-glassy",
    text: "text-primary hover:text-accent px-0 py-2 md:px-0 md:py-2"
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
