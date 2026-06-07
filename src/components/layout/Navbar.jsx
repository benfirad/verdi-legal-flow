import React, { useEffect, useState } from 'react';

const getDefaultTheme = () => {
  if (typeof window === 'undefined') return 'light';

  const darkRoutes = ['/iletisim', '/yayinlar', '/ekibimiz', '/surec'];
  const path = window.location.pathname;

  if (path === '/') return 'dark';
  return darkRoutes.some((route) => path.startsWith(route)) ? 'dark' : 'light';
};

export default function Navbar() {
  const [theme, setTheme] = useState(getDefaultTheme);
  const [isScrolled, setIsScrolled] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    const updateTheme = () => {
      const markerY = 44;
      const themedSections = Array.from(document.querySelectorAll('[data-nav-theme]'));
      const activeSection = themedSections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= markerY && rect.bottom > markerY;
      });

      setTheme(activeSection?.dataset.navTheme || getDefaultTheme());
      setIsScrolled(window.scrollY > 24);
    };

    updateTheme();
    window.addEventListener('scroll', updateTheme, { passive: true });
    window.addEventListener('resize', updateTheme);
    return () => {
      window.removeEventListener('scroll', updateTheme);
      window.removeEventListener('resize', updateTheme);
    };
  }, []);

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isDark ? 'text-white' : 'text-[#202020]'
      } ${
        isScrolled
          ? isDark
            ? 'bg-ink/85 backdrop-blur-md border-b border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.25)]'
            : 'bg-[#f6f4ef]/90 backdrop-blur-md border-b border-[#d8d0bf] shadow-[0_4px_24px_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <nav
        className={`pointer-events-auto mx-auto flex max-w-[1840px] items-center justify-center px-7 lg:px-9 transition-all duration-300 ${
          isScrolled ? 'h-16' : 'h-24'
        }`}
      >
        <a href="/" className="block">
          <img
            src="/assets/logoust.png"
            alt="Verdi"
            className={`w-auto object-contain transition-all duration-300 ${isDark ? 'invert' : ''} ${
              isScrolled ? 'h-8' : 'h-12'
            }`}
          />
        </a>
      </nav>
    </header>
  );
}
