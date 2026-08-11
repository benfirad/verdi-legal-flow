import React from 'react';

export default function BrandLogo({ className = '', markClassName = '', textClassName = '' }) {
  const inverted = className.includes('text-white');
  const compact = markClassName.includes('h-8');

  return (
    <div className={`flex items-center ${className}`} data-logo-source="imagegen">
      <img
        src="/verdi-logo-ai-lockup.png"
        alt="VERDİ Hukuk Bürosu"
        className={`${compact ? 'h-9 max-w-[170px]' : 'h-12 max-w-[220px]'} w-auto object-contain object-left ${inverted ? 'brightness-0 invert' : ''} ${textClassName.includes('hidden') ? 'sm:block' : ''}`}
      />
    </div>
  );
}
