import React, { useEffect, useState } from 'react';
import { Menu, Search, X } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const getDefaultTheme = () => {
  if (typeof window === 'undefined') return 'light';

  const darkRoutes = ['/iletisim', '/yayinlar', '/ekibimiz', '/surec'];
  const path = window.location.pathname;

  if (path === '/') return 'dark';
  return darkRoutes.some((route) => path.startsWith(route)) ? 'dark' : 'light';
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(getDefaultTheme);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
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
    { href: '/hakkimizda', label: t('nav.about') },
    { href: '/calisma-alanlari', label: language === 'tr' ? 'Hizmetlerimiz' : 'Services' },
    { href: '/ekibimiz', label: t('nav.team') },
    { href: '/yayinlar', label: language === 'tr' ? 'Duyurular ve Yayınlar' : 'Announcements & Publications' },
    { href: '/kariyer', label: language === 'tr' ? 'Kariyer' : 'Career' },
    { href: '/iletisim', label: t('nav.contact') },
  ];

  return (
    <header className={`pointer-events-none fixed inset-x-0 top-0 z-50 bg-transparent transition-colors duration-200 ${isDark ? 'text-white' : 'text-[#202020]'}`}>
      <nav className="mx-auto flex h-24 max-w-[1840px] items-center justify-between px-7 lg:px-9">
        <a href="/" className="pointer-events-auto block">
          <img
            src="/assets/logoust.png"
            alt="Verdi"
            className={`h-12 w-auto object-contain transition duration-200 ${isDark ? 'invert' : ''}`}
          />
        </a>

        <div className={`pointer-events-auto hidden items-center gap-8 transition-all duration-300 lg:flex ${
          isScrolled ? 'translate-y-[-8px] opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        }`}>
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

        <div className="pointer-events-auto flex items-center gap-4">
          <div className={`hidden items-center gap-3 text-sm font-semibold transition-all duration-300 lg:flex ${
            isScrolled ? 'translate-y-[-8px] opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
          }`}>
            <button onClick={toggleLanguage} className="transition hover:opacity-70">
              EN
            </button>
            <span className={isDark ? 'text-white/35' : 'text-[#202020]/35'}>|</span>
            <button onClick={toggleLanguage} className="transition hover:opacity-70">
              TR
            </button>
            <button aria-label="Search" className="ml-3 transition hover:opacity-70">
              <Search className="h-6 w-6" />
            </button>
          </div>
          <button
            className="flex h-11 w-11 items-center justify-center border border-current lg:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="pointer-events-auto fixed inset-0 z-50 bg-black/45 lg:hidden">
          <div className="ml-auto flex h-full w-full max-w-sm flex-col bg-[#f6f4ef] p-7 text-[#202020] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#d8d0bf] pb-6">
              <a href="/" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                <img src="/assets/logoust.png" alt="Verdi" className="h-10 w-auto object-contain" />
              </a>
              <button
                className="flex h-10 w-10 items-center justify-center border border-[#cfc5af]"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-col border-b border-[#d8d0bf] py-6">
              {navItems.map((item) => (
                <a
                  key={`${item.href}-${item.label}`}
                  href={item.href}
                  className="border-b border-[#e4dccb] py-4 text-2xl font-bold text-[#202020]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <button onClick={toggleLanguage} className="mt-6 self-start text-sm font-semibold uppercase tracking-[0.2em] text-[#202020]">
              {language === 'tr' ? 'English' : 'Türkçe'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
