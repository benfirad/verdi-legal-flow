import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

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
  const { language, setLanguage, t } = useLanguage();
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

  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/hakkimizda', label: t('nav.about') },
    { href: '/calisma-alanlari', label: language === 'tr' ? 'Hizmetlerimiz' : 'Services' },
    { href: '/ekibimiz', label: t('nav.team') },
    { href: '/kariyer', label: language === 'tr' ? 'Kariyer' : 'Career' },
    { href: '/iletisim', label: t('nav.contact') },
  ];

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
        className={`pointer-events-auto mx-auto flex max-w-[1840px] items-center justify-between px-7 lg:px-9 transition-all duration-300 ${
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

        {/* Navigation links (always visible on desktop) and language controls */}
        <div className="flex items-center gap-8">
          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={`${item.href}-${item.label}`}
                href={item.href}
                className="text-[15px] font-bold tracking-normal transition hover:opacity-70"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 text-sm font-semibold">
            <button
              onClick={() => setLanguage('en')}
              className={`transition hover:opacity-100 ${language === 'en' ? 'opacity-100 font-bold' : 'opacity-40'}`}
            >
              EN
            </button>
            <span className={isDark ? 'text-white/35' : 'text-[#202020]/35'}>|</span>
            <button
              onClick={() => setLanguage('tr')}
              className={`transition hover:opacity-100 ${language === 'tr' ? 'opacity-100 font-bold' : 'opacity-40'}`}
            >
              TR
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
