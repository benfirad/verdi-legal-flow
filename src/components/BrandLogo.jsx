import React from 'react';

export default function BrandLogo({ className = '', markClassName = '', textClassName = '' }) {
  const inverted = className.includes('text-white');
  const compact = markClassName.includes('h-8');

  return (
    <div className={`dach-logo group relative flex items-center overflow-hidden ${className}`} data-logo-source="imagegen">
      <img
        src="/dach-logo-ai-lockup.png"
        alt="DACH HUKUK"
        className={`dach-logo-lockup ${compact ? 'h-14 max-w-[250px]' : 'h-16 max-w-[280px]'} w-auto object-contain object-left transition-transform duration-700 group-hover:translate-x-1 ${inverted ? 'brightness-0 invert' : ''} ${textClassName.includes('hidden') ? 'sm:block' : ''}`}
      />
    </div>
  );
}
