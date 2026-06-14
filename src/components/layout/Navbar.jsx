import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';

// ── Bayrak SVG'leri ──
function FlagTR({ className = '' }) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-label="Türkçe">
      <rect width="60" height="40" fill="#E30A17" />
      <circle cx="22" cy="20" r="8" fill="#fff" />
      <circle cx="24" cy="20" r="6.4" fill="#E30A17" />
      <polygon
        fill="#fff"
        points="32.6,20 28.1,21.46 30.88,17.62 30.88,22.38 28.1,18.54"
      />
    </svg>
  );
}
function FlagEN({ className = '' }) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-label="English">
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0 L60 40 M60 0 L0 40" stroke="#fff" strokeWidth="6" />
      <path d="M0 0 L60 40 M60 0 L0 40" stroke="#C8102E" strokeWidth="3" clipPath="polygon(0 0, 30 20, 60 0, 60 0, 30 20, 60 40, 60 40, 30 20, 0 40, 0 40, 30 20, 0 0)" />
      <path d="M30 0 V40 M0 20 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0 V40 M0 20 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

const getDefaultTheme = () => {
  if (typeof window === 'undefined') return 'light';

  const darkRoutes = ['/iletisim', '/yayinlar', '/makaleler', '/ekibimiz', '/surec'];
  const path = window.location.pathname;

  if (path === '/') return 'dark';
  return darkRoutes.some((route) => path.startsWith(route)) ? 'dark' : 'light';
};

export default function Navbar() {
  const [theme, setTheme] = useState(getDefaultTheme);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const isDark = theme === 'dark';

  const toggleLang = () => setLanguage(language === 'tr' ? 'en' : 'tr');

  // Mobil menü açıkken body scroll kilitlensin
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

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
    { href: '/makaleler', label: language === 'tr' ? 'Makaleler' : 'Articles' },
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
          <Link to="/" className="block">
            <img
              src="/assets/logoust.png"
              alt="Werdy"
              className={`w-auto object-contain ${isDark ? 'invert' : ''}`}
              style={{ height: '48px' }}
            />
          </Link>
        </div>

        {/* Center Logo - Visible only when scrolled */}
        <div 
          className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled 
              ? 'opacity-100' 
              : 'opacity-0 pointer-events-none'
          }`}
        >
          <Link to="/" className="block">
            <img
              src="/assets/logoust.png"
              alt="Werdy"
              className={`w-auto object-contain ${isDark ? 'invert' : ''}`}
              style={{ height: '32px' }}
            />
          </Link>
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
            <Link
              key={`${item.href}-${item.label}`}
              to={item.href}
              className="text-[14px] font-bold tracking-normal transition hover:opacity-70 whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right (desktop): Bayrak toggle — tıklayınca dil değişir */}
        <button
          onClick={toggleLang}
          aria-label={language === 'tr' ? 'Switch to English' : 'Türkçeye geç'}
          title={language === 'tr' ? 'EN — Switch language' : 'TR — Dili değiştir'}
          className={`hidden lg:flex absolute right-9 top-1/2 -translate-y-1/2 items-center gap-2 group transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled
              ? 'opacity-0 pointer-events-none translate-x-4'
              : 'opacity-100'
          }`}
        >
          <span className={`text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
            isDark ? 'text-white/70 group-hover:text-white' : 'text-[#1A2530]/70 group-hover:text-[#1A2530]'
          }`}>
            {language === 'tr' ? 'TR' : 'EN'}
          </span>
          <div className={`relative h-7 w-10 overflow-hidden border transition-all duration-300 group-hover:scale-105 ${
            isDark ? 'border-white/40 group-hover:border-white' : 'border-[#1A2530]/30 group-hover:border-[#1A2530]'
          }`}>
            <div
              key={language}
              className="absolute inset-0 animate-[flagFlip_400ms_cubic-bezier(0.22,1,0.36,1)]"
              style={{ transformOrigin: 'center' }}
            >
              {language === 'tr' ? <FlagTR className="w-full h-full" /> : <FlagEN className="w-full h-full" />}
            </div>
          </div>
        </button>

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
            <img src="/assets/logoust.png" alt="Werdy" className="h-7 w-auto object-contain invert" />
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
                  <Link
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-center gap-4 px-4 py-5 transition-colors hover:bg-white/5"
                  >
                    <span className="font-mono text-xs text-white/40 group-hover:text-[#B8CCDA] transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-fraunces text-2xl font-semibold">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Dil seçimi (bayrak toggle) */}
            <div className="mt-8 px-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#B8CCDA] mb-4">
                {language === 'tr' ? 'Dil' : 'Language'}
              </p>
              <button
                onClick={toggleLang}
                className="w-full flex items-center justify-between gap-4 border border-white/20 hover:border-white/60 px-4 py-4 transition-colors group"
              >
                <span className="flex items-center gap-3">
                  <div className="h-7 w-10 overflow-hidden border border-white/30">
                    <div
                      key={`m-${language}`}
                      className="w-full h-full animate-[flagFlip_400ms_cubic-bezier(0.22,1,0.36,1)]"
                    >
                      {language === 'tr' ? <FlagTR className="w-full h-full" /> : <FlagEN className="w-full h-full" />}
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-white">
                    {language === 'tr' ? 'Türkçe' : 'English'}
                  </span>
                </span>
                <span className="text-xs uppercase tracking-[0.18em] text-white/50 group-hover:text-white transition-colors">
                  {language === 'tr' ? 'EN’e geç' : 'Switch to TR'}
                </span>
              </button>
            </div>
          </nav>

          {/* Alt: CTA */}
          <div className="p-6 border-t border-white/10">
            <Link
              to="/iletisim"
              onClick={() => setMobileOpen(false)}
              className="w-full inline-flex items-center justify-center gap-3 border border-white/40 px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-white hover:text-[#1A2530] transition-colors"
            >
              {language === 'tr' ? 'İletişime geçin' : 'Contact us'}
            </Link>
            <p className="mt-4 text-center text-[10px] uppercase tracking-[0.28em] text-white/40">
              info@redmono.com
            </p>
          </div>
        </aside>
      </div>
    </header>
  );
}
