import React from 'react';

export const Button = ({ children, className, ...props }) => (
  <button
    className={`px-4 py-2 text-white font-medium rounded-md transition-colors ${className}`}
    {...props}
  >
    {children}
  </button>
);