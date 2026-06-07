import React, { useEffect, useState, useRef } from 'react';
import { ChevronDown, Check, Menu, X } from 'lucide-react';
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const langRef = useRef(null);
  const { language, setLanguage, t } = useLanguage();
  const isDark = theme === 'dark';

  // Mobil menü açıkken body scroll kilitlensin
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Rota değişince mobil menü kapansın (yumuşak href tıklamaları için kullanıcı el ile kapatır)
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

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

        {/* Right (desktop): Language dropdown */}
        <div
          ref={langRef}
          className={`hidden lg:block absolute right-9 top-1/2 -translate-y-1/2 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
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

        {/* Mobil: hamburger button (3 çizgi) */}
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className={`lg:hidden absolute right-7 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center border transition-colors ${
            isDark ? 'border-white/40 text-white hover:border-white' : 'border-[#1A2530]/30 text-[#1A2530] hover:border-[#1A2530]'
          }`}
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      {/* Mobil overlay menü */}
      <div
        className={`pointer-events-auto fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#1A2530]/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer panel (sağdan kayar) */}
        <aside
          className={`absolute right-0 top-0 h-full w-full max-w-sm bg-[#1A2530] text-white shadow-2xl flex flex-col transition-transform duration-400 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
            <img src="/assets/logoust.png" alt="Verdi" className="h-7 w-auto object-contain invert" />
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center border border-white/30 text-white hover:border-white hover:bg-white/5 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Nav linkleri */}
          <nav className="flex-1 overflow-y-auto px-2 py-6">
            <ul className="space-y-0">
              {navItems.map((item, i) => (
                <li key={`${item.href}-${item.label}`} className="border-b border-white/5 last:border-0">
                  <a
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-center gap-4 px-4 py-5 transition-colors hover:bg-white/5"
                  >
                    <span className="font-mono text-xs text-white/40 group-hover:text-[#B8CCDA] transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-fraunces text-2xl font-semibold">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Dil seçimi */}
            <div className="mt-8 px-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#B8CCDA] mb-4">
                {language === 'tr' ? 'Dil' : 'Language'}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { code: 'tr', label: 'Türkçe', short: 'TR' },
                  { code: 'en', label: 'English', short: 'EN' },
                ].map((opt) => {
                  const active = language === opt.code;
                  return (
                    <button
                      key={opt.code}
                      onClick={() => setLanguage(opt.code)}
                      className={`flex items-center justify-between gap-2 border px-4 py-3 text-sm transition-colors ${
                        active
                          ? 'border-white bg-white text-[#1A2530] font-semibold'
                          : 'border-white/20 text-white/80 hover:border-white/60 hover:text-white'
                      }`}
                    >
                      <span>{opt.label}</span>
                      <span className={`font-mono text-xs ${active ? 'text-[#5A7A8C]' : 'text-white/40'}`}>
                        {opt.short}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Alt: CTA */}
          <div className="p-6 border-t border-white/10">
            <a
              href="/iletisim"
              onClick={() => setMobileOpen(false)}
              className="w-full inline-flex items-center justify-center gap-3 border border-white/40 px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-white hover:text-[#1A2530] transition-colors"
            >
              {language === 'tr' ? 'İletişime geçin' : 'Contact us'}
            </a>
            <p className="mt-4 text-center text-[10px] uppercase tracking-[0.28em] text-white/40">
              info@verdi.av.tr
            </p>
          </div>
        </aside>
      </div>
    </header>
  );
}
