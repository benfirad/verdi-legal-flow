import React from 'react';
import { Linkedin, Twitter, Instagram, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-ink text-[#e6eaf3]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Ana satır: solda logo, sağda CTA */}
        <div className="grid gap-8 py-10 md:grid-cols-[auto_1fr] md:items-center md:gap-12">
          {/* Sol: logo + sosyal */}
          <div className="flex flex-col gap-4">
            <img
              src="/assets/verdilogo.png"
              alt="Verdi Hukuk Bürosu"
              className="h-auto w-36 max-w-full object-contain brightness-0 invert"
            />
            <div className="flex gap-2.5">
              {[Linkedin, Twitter, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center border border-white/20 text-[#c9d2e8] transition hover:border-[#A8C0DA] hover:text-[#A8C0DA]"
                  aria-label="Social link"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Sağ: CTA */}
          <div className="md:text-right">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#A8C0DA]">
              {language === 'tr' ? 'Bizimle Çalışın' : 'Work With Us'}
            </p>
            <h2 className="mt-3 font-fraunces text-2xl font-semibold leading-tight md:text-3xl md:ml-auto md:max-w-xl">
              {language === 'tr'
                ? 'Hukuki ihtiyaçlarınızı birlikte değerlendirelim.'
                : 'Let us assess your legal needs together.'}
            </h2>
            <a
              href="/iletisim"
              className="group mt-5 inline-flex items-center gap-2.5 border border-white/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition hover:bg-white hover:text-ink"
            >
              {language === 'tr' ? 'İletişime geçin' : 'Contact us'}
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Alt çubuk */}
        <div className="flex flex-col justify-between gap-3 border-t border-white/10 py-4 text-xs text-[#8c97b3] md:flex-row md:items-center">
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
