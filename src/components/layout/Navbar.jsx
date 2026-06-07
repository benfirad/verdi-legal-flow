import React, { useEffect, useState, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';
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
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);
  const { language, setLanguage, t } = useLanguage();
  const isDark = theme === 'dark';

  // Dış tıklama ile dropdown kapanır
  useEffect(() => {
    if (!langOpen) return;
    const onDown = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setLangOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [langOpen]);

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
        isDark ? 'text-white' : 'text-[#1A2530]'
      } ${
        isScrolled
          ? isDark
            ? 'bg-ink/85 backdrop-blur-md border-b border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.25)]'
            : 'bg-[#E8ECEF]/90 backdrop-blur-md border-b border-[#C8CFD3] shadow-[0_4px_24px_rgba(0,0,0,0.06)]'
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

        {/* Right: Language dropdown (fades and slides out to the right on scroll) */}
        <div
          ref={langRef}
          className={`absolute right-7 lg:right-9 top-1/2 -translate-y-1/2 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled
              ? 'opacity-0 pointer-events-none translate-x-4'
              : 'opacity-100'
          }`}
        >
          <button
            onClick={() => setLangOpen((v) => !v)}
            className={`flex items-center gap-2 border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
              isDark
                ? 'border-white/40 hover:border-white text-white'
                : 'border-[#1A2530]/30 hover:border-[#1A2530] text-[#1A2530]'
            }`}
            aria-haspopup="listbox"
            aria-expanded={langOpen}
          >
            {language === 'tr' ? 'TR' : 'EN'}
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown panel */}
          <div
            className={`absolute right-0 top-full mt-2 min-w-[140px] transition-all duration-200 origin-top-right ${
              langOpen
                ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
            }`}
          >
            <ul className="bg-white border border-[#D6DCE0] shadow-[0_12px_32px_-12px_rgba(26,37,48,0.25)] overflow-hidden">
              {[
                { code: 'tr', label: 'Türkçe', short: 'TR' },
                { code: 'en', label: 'English', short: 'EN' },
              ].map((opt) => {
                const active = language === opt.code;
                return (
                  <li key={opt.code}>
                    <button
                      onClick={() => { setLanguage(opt.code); setLangOpen(false); }}
                      className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-sm text-left transition-colors ${
                        active
                          ? 'bg-[#F4F6F8] text-[#1A2530] font-semibold'
                          : 'text-[#4D5660] hover:bg-[#F4F6F8] hover:text-[#1A2530]'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-xs text-[#5A7A8C]">{opt.short}</span>
                        <span>{opt.label}</span>
                      </span>
                      {active && <Check className="h-3.5 w-3.5 text-[#5A7A8C]" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
