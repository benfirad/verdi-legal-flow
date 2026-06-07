import React from 'react';
import { Linkedin, Twitter, Instagram, ArrowRight, MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-ink text-[#e6eaf3]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Marka satırı */}
        <div className="flex flex-col items-start gap-8 border-b border-white/10 py-14 md:flex-row md:items-center md:justify-between">
          <img
            src="/assets/verdilogo.png"
            alt="Verdi Hukuk Bürosu"
            className="h-auto w-40 max-w-full object-contain brightness-0 invert"
          />
          <div className="flex gap-3">
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

        {/* Büyük CTA */}
        <div className="border-b border-white/10 py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c8b68c]">
            {language === 'tr' ? 'Bizimle Çalışın' : 'Work With Us'}
          </p>
          <h2 className="mt-6 mx-auto max-w-3xl font-fraunces text-3xl font-semibold leading-tight md:text-5xl">
            {language === 'tr'
              ? 'Hukuki ihtiyaçlarınızı birlikte değerlendirelim.'
              : 'Let us assess your legal needs together.'}
          </h2>
          <a
            href="/iletisim"
            className="group mt-10 inline-flex items-center gap-3 border border-white/40 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] transition hover:bg-white hover:text-ink"
          >
            {language === 'tr' ? 'İletişime geçin' : 'Contact us'}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
        </div>

        {/* İletişim bilgileri */}
        <div className="grid gap-8 py-12 md:grid-cols-3">
          <div className="flex items-start gap-3 text-[#a9b3cc]">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#c8b68c]" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#c8b68c] font-semibold mb-1">
                {language === 'tr' ? 'Adres' : 'Address'}
              </p>
              <p className="leading-6">{t('contact.info.addressValue')}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-[#a9b3cc]">
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#c8b68c]" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#c8b68c] font-semibold mb-1">
                {language === 'tr' ? 'Telefon' : 'Phone'}
              </p>
              <a
                href={`tel:${t('contact.info.phoneValue')?.replace(/\s/g, '')}`}
                className="transition hover:text-white"
              >
                {t('contact.info.phoneValue')}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3 text-[#a9b3cc]">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#c8b68c]" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#c8b68c] font-semibold mb-1">
                {language === 'tr' ? 'E-posta' : 'Email'}
              </p>
              <a
                href={`mailto:${t('contact.info.emailValue')}`}
                className="transition hover:text-white"
              >
                {t('contact.info.emailValue')}
              </a>
            </div>
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
