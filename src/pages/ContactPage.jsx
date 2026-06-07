import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Loader2, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Reveal, CARD_EASE } from '@/components/motion/Reveal';
import { localClient } from '@/api/localClient';

const EYEBROW_CLS = 'text-xs font-semibold uppercase tracking-[0.35em] text-[#5A7A8C]';
const EYEBROW_DARK_CLS = 'text-xs font-semibold uppercase tracking-[0.35em] text-[#B8CCDA]';
const TITLE_CLS = 'mt-6 font-fraunces text-3xl font-semibold leading-tight text-[#1A2530] md:text-4xl';

const WORKING_HOURS = {
  tr: [
    { day: 'Pazartesi – Cuma', hours: '09:00 – 18:00' },
    { day: 'Cumartesi', hours: '10:00 – 14:00' },
    { day: 'Pazar', hours: 'Kapalı' },
  ],
  en: [
    { day: 'Monday – Friday', hours: '09:00 – 18:00' },
    { day: 'Saturday', hours: '10:00 – 14:00' },
    { day: 'Sunday', hours: 'Closed' },
  ],
};

const PRACTICE_OPTIONS = {
  tr: ['Ticaret Hukuku', 'Şirketler Hukuku', 'Birleşme & Devralma', 'Sermaye Piyasaları', 'Bankacılık & Finans', 'Uyuşmazlık Çözümü', 'Diğer'],
  en: ['Commercial Law', 'Corporate Law', 'M&A', 'Capital Markets', 'Banking & Finance', 'Dispute Resolution', 'Other'],
};

export default function ContactPage() {
  const { language } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const t = (tr, en) => (language === 'tr' ? tr : en);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      await localClient.contact.create(form);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="min-h-screen bg-[#E8ECEF] text-[#1A2530]">
      <Navbar />

      <main>
        {/* ── Hero (stack layer 1) ── */}
        <section data-nav-theme="dark" className="sticky top-0 z-10 min-h-[55vh] overflow-hidden bg-[#1A2530] text-white">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A2530] via-[#1A2530] to-[#2B3A4A]" />
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#5A7A8C]/25 blur-[140px]" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#B8CCDA]/15 blur-[140px]" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-40 pb-20">
            <Reveal>
              <p className={EYEBROW_DARK_CLS}>{t('İletişim', 'Contact')}</p>
              <h1 className="mt-6 font-fraunces text-3xl font-semibold leading-tight text-white md:text-5xl">
                {t('Bir dosya, bir karar, bir hayat.', 'A case, a decision, a life.')}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
                {t(
                  'Hukuki ihtiyacınızı dinlemek, doğru ekibi yönlendirmek ve net bir yol haritası sunmak için buradayız.',
                  'We are here to listen, route you to the right team and offer a clear path forward.',
                )}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Form + Yan panel (stack layer 2) ── */}
        <section data-nav-theme="light" className="sticky top-0 z-20 bg-[#F4F6F8] border-y border-[#C8CFD3] shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.25)]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            {/* Form */}
            <Reveal>
              <div className="bg-white border border-[#C8CFD3] p-8 md:p-12">
                <p className={EYEBROW_CLS}>{t('Bize Yazın', 'Write to Us')}</p>
                <h2 className={`${TITLE_CLS} mb-2`}>
                  {t('Başlamak için kısa bir not bırakın.', 'Drop a short note to get started.')}
                </h2>
                <p className="mt-3 text-sm text-[#4D5660]">
                  {t('24 saat içinde uygun ekip üyemiz size dönüş yapacaktır.', 'A suitable team member will respond within 24 hours.')}
                </p>

                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: CARD_EASE }}
                      className="mt-10 flex flex-col items-center text-center gap-4 py-10"
                    >
                      <div className="h-14 w-14 rounded-full bg-[#5A7A8C]/15 border border-[#5A7A8C]/40 flex items-center justify-center">
                        <CheckCircle className="h-7 w-7 text-[#5A7A8C]" />
                      </div>
                      <h3 className="font-fraunces text-2xl font-semibold text-[#1A2530]">
                        {t('Mesajınız iletildi', 'Message received')}
                      </h3>
                      <p className="text-sm text-[#4D5660] max-w-sm">
                        {t('En kısa sürede sizinle iletişime geçeceğiz. Teşekkürler.', 'We will get back to you shortly. Thank you.')}
                      </p>
                      <button
                        onClick={() => setStatus('idle')}
                        className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#5A7A8C] hover:text-[#1A2530] transition"
                      >
                        {t('Yeni mesaj', 'New message')}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="mt-10 space-y-5"
                    >
                      <div className="grid gap-5 md:grid-cols-2">
                        <Field
                          label={t('Ad Soyad', 'Full Name')}
                          required
                          value={form.name}
                          onChange={(v) => setForm({ ...form, name: v })}
                        />
                        <Field
                          label={t('E-posta', 'Email')}
                          type="email"
                          required
                          value={form.email}
                          onChange={(v) => setForm({ ...form, email: v })}
                        />
                      </div>
                      <div className="grid gap-5 md:grid-cols-2">
                        <Field
                          label={t('Telefon', 'Phone')}
                          type="tel"
                          value={form.phone}
                          onChange={(v) => setForm({ ...form, phone: v })}
                        />
                        <SelectField
                          label={t('Konu', 'Subject')}
                          value={form.subject}
                          onChange={(v) => setForm({ ...form, subject: v })}
                          options={PRACTICE_OPTIONS[language]}
                          placeholder={t('Seçiniz', 'Select')}
                        />
                      </div>
                      <Field
                        label={t('Mesaj', 'Message')}
                        textarea
                        required
                        value={form.message}
                        onChange={(v) => setForm({ ...form, message: v })}
                      />

                      <motion.button
                        type="submit"
                        disabled={status === 'loading'}
                        whileHover={{ scale: status === 'loading' ? 1 : 1.01, x: status === 'loading' ? 0 : 2 }}
                        whileTap={{ scale: 0.99 }}
                        transition={{ duration: 0.2, ease: CARD_EASE }}
                        className="group inline-flex items-center gap-3 bg-[#1A2530] text-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] hover:bg-[#2B3A4A] transition-colors disabled:opacity-60"
                      >
                        {status === 'loading' ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            {t('Gönderiliyor…', 'Sending…')}
                          </>
                        ) : (
                          <>
                            {t('Mesajı Gönder', 'Send Message')}
                            <Send className="h-4 w-4 transition group-hover:translate-x-1" />
                          </>
                        )}
                      </motion.button>

                      {status === 'error' && (
                        <p className="text-xs text-red-700">
                          {t('Bir hata oluştu. Lütfen tekrar deneyin.', 'An error occurred. Please try again.')}
                        </p>
                      )}
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>

            {/* Yan panel: iletişim + çalışma saatleri */}
            <Reveal from="right" delay={0.1}>
              <div className="space-y-6 lg:sticky lg:top-32">
                <InfoCard
                  icon={MapPin}
                  eyebrow={t('Adres', 'Address')}
                  title={t('Levent, Büyükdere Cad. No:185', 'Levent, Büyükdere Cad. No:185')}
                  subtitle={t('34394 Şişli / İstanbul, Türkiye', '34394 Şişli / Istanbul, Türkiye')}
                />
                <InfoCard
                  icon={Phone}
                  eyebrow={t('Telefon', 'Phone')}
                  title="+90 212 324 96 34"
                  href="tel:+902123249634"
                />
                <InfoCard
                  icon={Mail}
                  eyebrow={t('E-posta', 'Email')}
                  title="info@verdi.av.tr"
                  href="mailto:info@verdi.av.tr"
                />

                {/* Çalışma saatleri */}
                <div className="bg-white border border-[#C8CFD3] p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <Clock className="h-4 w-4 text-[#5A7A8C]" />
                    <p className={EYEBROW_CLS}>{t('Çalışma Saatleri', 'Working Hours')}</p>
                  </div>
                  <ul className="space-y-3">
                    {WORKING_HOURS[language].map((row, i) => (
                      <li key={i} className="flex items-center justify-between gap-4 text-sm border-b border-[#E4E7EC] pb-3 last:border-0 last:pb-0">
                        <span className="text-[#4D5660]">{row.day}</span>
                        <span className="font-mono text-[#1A2530]">{row.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Harita + son CTA (stack layer 3) ── */}
        <section data-nav-theme="light" className="sticky top-0 z-30 bg-white border-t border-[#C8CFD3] shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.25)]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
            <Reveal>
              <div className="max-w-2xl mb-10">
                <p className={EYEBROW_CLS}>{t('Konum', 'Location')}</p>
                <h2 className={TITLE_CLS}>
                  {t('Levent — Büyükdere Caddesi üzerinde.', 'Levent — on Büyükdere Avenue.')}
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="aspect-[16/7] w-full overflow-hidden border border-[#C8CFD3]">
                <iframe
                  title="Verdi Hukuk Bürosu — Harita"
                  src="https://maps.google.com/maps?q=Levent,%20B%C3%BCy%C3%BCkdere%20Cad,%20%C5%9Fi%C5%9Fli/%C4%B0stanbul&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full grayscale contrast-110"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-wrap items-center gap-6 text-sm">
                <a
                  href="https://maps.google.com/?q=Levent,Büyükdere+Caddesi,Şişli+İstanbul"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 font-semibold uppercase tracking-[0.18em] text-[#1A2530] text-xs"
                >
                  {t('Google Haritalar\'da aç', 'Open in Google Maps')}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
                <a
                  href="/ekibimiz"
                  className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5A7A8C] hover:text-[#1A2530] transition"
                >
                  {t('Ekibimizle tanışın', 'Meet our team')}
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <div className="relative z-40">
        <Footer />
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', required, textarea }) {
  const Comp = textarea ? 'textarea' : 'input';
  return (
    <label className="block">
      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#4D5660] mb-2 block">
        {label}{required && <span className="text-[#5A7A8C] ml-1">*</span>}
      </span>
      <Comp
        type={textarea ? undefined : type}
        rows={textarea ? 5 : undefined}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#F4F6F8] border border-[#C8CFD3] px-4 py-3 text-sm text-[#1A2530] placeholder:text-[#7A8590] focus:outline-none focus:border-[#5A7A8C] focus:ring-2 focus:ring-[#5A7A8C]/20 transition resize-none"
      />
    </label>
  );
}

function SelectField({ label, value, onChange, options, placeholder }) {
  return (
    <label className="block">
      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#4D5660] mb-2 block">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#F4F6F8] border border-[#C8CFD3] px-4 py-3 text-sm text-[#1A2530] focus:outline-none focus:border-[#5A7A8C] focus:ring-2 focus:ring-[#5A7A8C]/20 transition appearance-none"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </label>
  );
}

function InfoCard({ icon: Icon, eyebrow, title, subtitle, href }) {
  const inner = (
    <div className="bg-white border border-[#C8CFD3] p-6 hover:border-[#5A7A8C]/50 transition-colors">
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 border border-[#5A7A8C]/40 flex items-center justify-center shrink-0">
          <Icon className="h-4 w-4 text-[#5A7A8C]" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#5A7A8C]">{eyebrow}</p>
          <p className="mt-1 text-[#1A2530] font-medium truncate">{title}</p>
          {subtitle && <p className="text-sm text-[#4D5660] mt-0.5">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
  return href ? <a href={href} className="block">{inner}</a> : inner;
}
