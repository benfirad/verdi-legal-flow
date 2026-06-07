import React from 'react';
import { Linkedin, Twitter, Instagram, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-ink text-[#e6eaf3]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Ana satır: solda logo, sağda CTA */}
        <div className="grid gap-12 py-20 md:grid-cols-[auto_1fr] md:items-center md:gap-16">
          {/* Sol: logo + sosyal */}
          <div className="flex flex-col gap-6">
            <img
              src="/assets/verdilogo.png"
              alt="Verdi Hukuk Bürosu"
              className="h-auto w-44 max-w-full object-contain brightness-0 invert"
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

          {/* Sağ: CTA */}
          <div className="md:text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c8b68c]">
              {language === 'tr' ? 'Bizimle Çalışın' : 'Work With Us'}
            </p>
            <h2 className="mt-5 font-fraunces text-3xl font-semibold leading-tight md:text-4xl md:ml-auto md:max-w-2xl">
              {language === 'tr'
                ? 'Hukuki ihtiyaçlarınızı birlikte değerlendirelim.'
                : 'Let us assess your legal needs together.'}
            </h2>
            <a
              href="/iletisim"
              className="group mt-8 inline-flex items-center gap-3 border border-white/40 px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] transition hover:bg-white hover:text-ink"
            >
              {language === 'tr' ? 'İletişime geçin' : 'Contact us'}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
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
