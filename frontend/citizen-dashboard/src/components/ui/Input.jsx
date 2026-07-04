import React from 'react';

const Input = ({ label, type = "text", id, error, className = "", ...props }) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        className={`px-4 py-2.5 rounded-lg border bg-slate-50 transition-all duration-200 
          focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary focus:bg-white
          ${error ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-200'}
        `}
        {...props}
      />
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export default Input;
