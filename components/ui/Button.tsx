import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const base = 'font-mono rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyber/50';
  const variants = {
    primary: 'bg-cyber text-dark hover:bg-cyber/80 hover:shadow-glow',
    secondary: 'bg-gold text-dark hover:bg-gold/80 hover:shadow-glow',
    outline: 'border border-cyber text-cyber hover:bg-cyber/10',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };
  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
