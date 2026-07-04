import React from 'react';

const Card = ({ children, className = '', hoverEffect = false, glass = false }) => {
  const baseClasses = "rounded-2xl p-6";
  const bgClasses = glass ? "glass-panel" : "bg-white shadow-soft border border-slate-100";
  const hoverClasses = hoverEffect ? "transition-all duration-300 hover:shadow-lg hover:-translate-y-1" : "";

  return (
    <div className={`${baseClasses} ${bgClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
