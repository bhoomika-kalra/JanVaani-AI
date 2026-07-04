import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const baseClasses = "px-6 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-95";
  
  const variants = {
    primary: "bg-primary text-white shadow-md hover:bg-primary-dark hover:shadow-glow hover:-translate-y-0.5",
    secondary: "bg-white text-slate-700 border border-slate-200 shadow-sm hover:bg-slate-50 hover:border-slate-300",
    outline: "border-2 border-primary text-primary hover:bg-primary/5",
    ghost: "text-slate-600 hover:bg-slate-100",
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
