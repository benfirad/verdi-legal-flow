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
        isDark ? 'text-white' : 'text-[#0E1A35]'
      } ${
        isScrolled
          ? isDark
            ? 'bg-ink/85 backdrop-blur-md border-b border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.25)]'
            : 'bg-[#DEE2E6]/90 backdrop-blur-md border-b border-[#C8D0DA] shadow-[0_4px_24px_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="pointer-events-auto relative mx-auto max-w-[1840px] px-7 lg:px-9 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
        style={{ height: isScrolled ? '64px' : '96px' }}
      >
        {/* Left Logo - Visible only when NOT scrolled */}
        <div 
          className={`absolute left-7 lg:left-9 top-1/2 -translate-y-1/2 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled 
              ? 'opacity-0 pointer-events-none' 
              : 'opacity-100'
          }`}
        >
          <a href="/" className="block">
            <img
              src="/assets/logoust.png"
              alt="Verdi"
              className={`w-auto object-contain ${isDark ? 'invert' : ''}`}
              style={{ height: '48px' }}
            />
          </a>
        </div>

        {/* Center Logo - Visible only when scrolled */}
        <div 
          className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled 
              ? 'opacity-100' 
              : 'opacity-0 pointer-events-none'
          }`}
        >
          <a href="/" className="block">
            <img
              src="/assets/logoust.png"
              alt="Verdi"
              className={`w-auto object-contain ${isDark ? 'invert' : ''}`}
              style={{ height: '32px' }}
            />
          </a>
        </div>

        {/* Middle: Navigation links (centered, hidden on mobile, fades and slides out upwards on scroll) */}
        <div 
          className={`absolute left-1/2 -translate-x-1/2 top-1/2 hidden lg:flex items-center gap-8 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled 
              ? 'opacity-0 pointer-events-none -translate-y-8' 
              : 'opacity-100 -translate-y-1/2'
          }`}
        >
          {navItems.map((item) => (
            <a
              key={`${item.href}-${item.label}`}
              href={item.href}
              className="text-[14px] font-bold tracking-normal transition hover:opacity-70 whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right: Language Selector (fades and slides out to the right on scroll) */}
        <div 
          className={`absolute right-7 lg:right-9 top-1/2 -translate-y-1/2 flex items-center gap-3 text-sm font-semibold transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled 
              ? 'opacity-0 pointer-events-none translate-x-4' 
              : 'opacity-100'
          }`}
        >
          <button
            onClick={() => setLanguage('en')}
            className={`transition hover:opacity-100 ${language === 'en' ? 'opacity-100 font-bold' : 'opacity-40'}`}
          >
            EN
          </button>
          <span className={isDark ? 'text-white/35' : 'text-[#0E1A35]/35'}>|</span>
          <button
            onClick={() => setLanguage('tr')}
            className={`transition hover:opacity-100 ${language === 'tr' ? 'opacity-100 font-bold' : 'opacity-40'}`}
          >
            TR
          </button>
        </div>
      </nav>
    </header>
  );
}
