import React from 'react';

export default function BrandLogo({ className = '', markClassName = '', textClassName = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`flex h-10 w-10 items-center justify-center rounded-sm border border-current/25 font-fraunces text-xl font-bold ${markClassName}`}>
        V
      </div>
      <div className={`leading-none ${textClassName}`}>
        <div className="font-fraunces text-xl font-bold tracking-wide">VERDI</div>
        <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.28em] opacity-70">Hukuk</div>
      </div>
    </div>
  );
}
