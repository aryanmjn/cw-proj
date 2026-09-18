import React from 'react';

export default function Badge({ children, variant = 'sky', className = '' }) {
  const variants = {
    sky: 'bg-sky-50 text-sky-700 border-sky-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}