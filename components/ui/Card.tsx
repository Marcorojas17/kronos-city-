import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, subtitle }) => {
  return (
    <div className={`bg-card/80 backdrop-blur-md border border-cyber/30 rounded-2xl p-6 shadow-2xl ${className}`}>
      {title && <h3 className="text-xl font-bold text-gold mb-1">{title}</h3>}
      {subtitle && <p className="text-sm text-cyber/70 mb-4">{subtitle}</p>}
      {children}
    </div>
  );
};
