import React from 'react';
import { Linkedin, Twitter, Instagram, ArrowRight, MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const { t, language } = useLanguage();

  const quickLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/hakkimizda', label: t('nav.about') },
    { href: '/calisma-alanlari', label: language === 'tr' ? 'Uzmanlık Alanlarımız' : 'Our Practice Areas' },
    { href: '/ekibimiz', label: t('nav.team') },
    { href: '/iletisim', label: t('nav.contact') },
  ];

  return (
    <footer className="bg-ink text-[#e6eaf3]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Üst CTA bandı */}
        <div className="grid gap-8 border-b border-white/10 py-16 md:grid-cols-[1.4fr_auto] md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c8b68c]">
              {language === 'tr' ? 'Bizimle Çalışın' : 'Work With Us'}
            </p>
            <h2 className="mt-4 max-w-2xl font-fraunces text-3xl font-semibold leading-tight md:text-4xl">
              {language === 'tr'
                ? 'Hukuki ihtiyaçlarınızı birlikte değerlendirelim.'
                : 'Let us assess your legal needs together.'}
            </h2>
          </div>
          <a
            href="/iletisim"
            className="group inline-flex items-center justify-center gap-3 border border-white/40 px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] transition hover:bg-white hover:text-ink md:justify-self-end"
          >
            {language === 'tr' ? 'İletişime geçin' : 'Contact us'}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
        </div>

        {/* Ana grid */}
        <div className="grid gap-14 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.1fr]">
          {/* Sol: marka */}
          <div>
            <img
              src="/assets/verdilogo.png"
              alt="Verdi Hukuk Bürosu"
              className="h-auto w-48 max-w-full object-contain brightness-0 invert"
            />
            <p className="mt-7 max-w-sm leading-7 text-[#a9b3cc]">
              {t('footer.description')}
            </p>
            <div className="mt-8 flex gap-3">
              {[Linkedin, Twitter, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center border border-white/20 text-[#c9d2e8] transition hover:border-[#c8b68c] hover:text-[#c8b68c]"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Orta: bizi tanıyın */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c8b68c]">
              {language === 'tr' ? 'Bizi Tanıyın' : 'Know Us'}
            </h4>
            <ul className="mt-6 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-[#a9b3cc] transition hover:text-white"
                  >
                    <span className="h-px w-0 bg-[#c8b68c] transition-all duration-300 group-hover:w-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sağ: iletişim */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c8b68c]">
              {t('footer.contact')}
            </h4>
            <ul className="mt-6 space-y-4 text-[#a9b3cc]">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#c8b68c]" />
                <span className="leading-6">{t('contact.info.addressValue')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[#c8b68c]" />
                <a href={`tel:${t('contact.info.phoneValue')?.replace(/\s/g, '')}`} className="transition hover:text-white">
                  {t('contact.info.phoneValue')}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[#c8b68c]" />
                <a href={`mailto:${t('contact.info.emailValue')}`} className="transition hover:text-white">
                  {t('contact.info.emailValue')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt çubuk */}
        <div className="flex flex-col justify-between gap-4 border-t border-white/10 py-6 text-sm text-[#8c97b3] md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} VERDI {language === 'tr' ? 'Hukuk Bürosu' : 'Law Firm'}. {t('footer.rights')}</p>
          <div className="flex gap-6">
            <a href="#" className="transition hover:text-white">{t('footer.privacy')}</a>
            <a href="#" className="transition hover:text-white">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
