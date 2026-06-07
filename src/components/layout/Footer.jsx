import React from 'react';
import { Linkedin, Twitter, Instagram, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const { t, language } = useLanguage();

  const quickLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/hakkimizda', label: t('nav.about') },
    { href: '/calisma-alanlari', label: language === 'tr' ? 'Uzmanlık Alanlarımız' : 'Our Practice Areas' },
    { href: '/ekibimiz', label: t('nav.team') },
    { href: '/yayinlar', label: t('nav.publications') },
    { href: '/iletisim', label: t('nav.contact') },
  ];

  return (
    <footer className="bg-ink text-[#e6eaf3]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.9fr]">
          <div>
            <img
              src="/assets/verdilogo.png"
              alt="Verdi Hukuk Bürosu"
              className="h-auto w-64 max-w-full object-contain brightness-0 invert"
            />
            <p className="mt-6 max-w-sm leading-7 text-[#a9b3cc]">
              {t('footer.description')}
            </p>
            <div className="mt-8 flex gap-3">
              {[Linkedin, Twitter, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center border border-white/25 text-[#c9d2e8] transition hover:border-white hover:text-white"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c8b68c]">
              {language === 'tr' ? 'Bizi Tanıyın' : 'Know Us'}
            </h4>
            <ul className="mt-6 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-[#a9b3cc] transition hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c8b68c]">
              {t('footer.contact')}
            </h4>
            <ul className="mt-6 space-y-3 text-[#a9b3cc]">
              <li>{t('contact.info.addressValue')}</li>
              <li>{t('contact.info.phoneValue')}</li>
              <li>{t('contact.info.emailValue')}</li>
            </ul>
            <a
              href="/iletisim"
              className="mt-6 inline-flex items-center gap-2 border border-white/40 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-ink"
            >
              {language === 'tr' ? 'İletişime geçin' : 'Contact us'}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-white/15 py-6 text-sm text-[#8c97b3] md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} VERDI Hukuk Bürosu. {t('footer.rights')}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-white">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
