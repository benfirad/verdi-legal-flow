import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Briefcase, Sparkles, Users, GraduationCap, Upload, Send, CheckCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Reveal, StaggerList, itemVariants, CARD_EASE } from '@/components/motion/Reveal';
import { localClient } from '@/api/localClient';

const EYEBROW_CLS = 'text-xs font-semibold uppercase tracking-[0.35em] text-[#5A7A8C]';
const EYEBROW_DARK_CLS = 'text-xs font-semibold uppercase tracking-[0.35em] text-[#B8CCDA]';
const TITLE_CLS = 'mt-6 font-fraunces text-3xl font-semibold leading-tight text-[#1A2530] md:text-4xl';

const VALUES = [
  {
    icon: Sparkles,
    tr: { title: 'Kreatif Mükemmeliyet', desc: 'Her projeye en yüksek tasarım standartlarıyla yaklaşır, detaya ve özgünlüğe önem veririz.' },
    en: { title: 'Creative Excellence', desc: 'We approach every project with the highest design standards, valuing detail and originality.' },
  },
  {
    icon: GraduationCap,
    tr: { title: 'Sürekli Öğrenme', desc: 'Tasarım teknolojilerini, yapay zeka araçlarını ve yaratıcı pratikleri takip etmeyi destekleriz.' },
    en: { title: 'Continuous Learning', desc: "We support keeping track of design technologies, AI tools, and creative practices." },
  },
  {
    icon: Users,
    tr: { title: 'Kolektif Paylaşım', desc: 'Hiyerarşiden uzak, açık fikirli, bilgi paylaşımına ve ortak üretime dayalı bir topluluk.' },
    en: { title: 'Collective Collaboration', desc: 'A flat, open-minded community built on knowledge-sharing and co-creation.' },
  },
];

const POSITIONS = {
  tr: [
    { title: 'Atölye Asistanı', dept: 'Destek', type: 'Gönüllü', location: 'İstanbul' },
    { title: 'Sosyal Medya Gönüllüsü', dept: 'İçerik', type: 'Gönüllü', location: 'İstanbul' },
    { title: 'Kayıt & Karşılama Görevlisi', dept: 'Operasyon', type: 'Gönüllü', location: 'İstanbul' },
    { title: 'Teknik Sahne Sorumlusu', dept: 'Teknoloji', type: 'Gönüllü', location: 'İstanbul' },
  ],
  en: [
    { title: 'Workshop Assistant', dept: 'Support', type: 'Volunteer', location: 'Istanbul' },
    { title: 'Social Media Volunteer', dept: 'Content', type: 'Volunteer', location: 'Istanbul' },
    { title: 'Registration Host', dept: 'Operations', type: 'Volunteer', location: 'Istanbul' },
    { title: 'Technical Stage Manager', dept: 'Technology', type: 'Volunteer', location: 'Istanbul' },
  ],
};

export default function KariyerPage() {
  const { language } = useLanguage();
  const t = (tr, en) => (language === 'tr' ? tr : en);

  const [form, setForm] = useState({ name: '', email: '', phone: '', position: '', message: '' });
  const [cvFile, setCvFile] = useState(null);
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      const payload = { ...form, cv: cvFile?.name || null };
      await localClient.contact.create({ ...payload, kind: 'career' });
      setStatus('success');
      setForm({ name: '', email: '', phone: '', position: '', message: '' });
      setCvFile(null);
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="min-h-screen bg-[#E8ECEF] text-[#1A2530]">
      <Navbar />

      <main>
        {/* ── Hero (stack layer 1) — fotoğraflı ── */}
        <section data-nav-theme="dark" className="sticky top-0 z-10 relative overflow-hidden bg-[#1A2530] text-white">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=2400&q=90"
            alt={language === 'tr' ? 'Modern ofis ortamı' : 'Modern office environment'}
            className="absolute inset-0 h-full w-full object-cover object-center grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/75 to-ink/55" />
          <div className="absolute inset-0 bg-ink/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/30 to-ink/40" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-40 pb-24">
            <Reveal>
              <h1 className="mt-6 font-fraunces text-3xl font-semibold leading-tight text-white md:text-4xl max-w-3xl">
                {t('Zirve ekibine katılın. Geleceği birlikte tasarlayalım.', 'Join the summit team. Let us design the future together.')}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
                {t(
                  'Redmono Creative Summit 2026’da gönüllü olarak yer alın; atölye asistanlığından sosyal medya yönetimine, teknik sahne yönetiminden karşılama operasyonlarına uzanan zengin bir deneyim kazanın.',
                  'Volunteer at Redmono Creative Summit 2026; gain rich experience ranging from workshop assistance to social media management, technical stage operations, and registration hosting.',
                )}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Değerler (stack layer 2) ── */}
        <section data-nav-theme="light" className="sticky top-0 z-20 bg-white border-y border-[#C8CFD3] shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.25)]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
            <Reveal>
              <div className="mb-14 max-w-2xl">
                <h2 className={TITLE_CLS}>
                  {t('Yaratıcı topluluğumuzu besleyen ortak değerlerimiz.', 'Our shared values that nourish our creative community.')}
                </h2>
              </div>
            </Reveal>

            <StaggerList className="grid gap-6 md:grid-cols-3" stagger={0.1}>
              {VALUES.map((v, i) => {
                const Icon = v.icon;
                const content = v[language];
                return (
                  <motion.article
                    key={i}
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 250, damping: 22 }}
                    className="bg-[#F4F6F8] border border-[#C8CFD3] p-8 hover:border-[#5A7A8C]/50 transition-colors"
                  >
                    <div className="h-11 w-11 border border-[#5A7A8C]/40 flex items-center justify-center mb-6">
                      <Icon className="h-5 w-5 text-[#5A7A8C]" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-fraunces text-xl font-semibold text-[#1A2530]">{content.title}</h3>
                    <p className="mt-3 text-[15px] leading-7 text-[#4D5660]">{content.desc}</p>
                  </motion.article>
                );
              })}
            </StaggerList>
          </div>
        </section>

        {/* ── Açık Pozisyonlar (stack layer 3) ── */}
        <section data-nav-theme="light" className="sticky top-0 z-30 bg-[#F4F6F8] border-y border-[#C8CFD3] shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.25)]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end mb-12">
              <Reveal>
                <h2 className={TITLE_CLS}>
                  {t(`Şu anda ${POSITIONS.tr.length} açık pozisyon var.`, `${POSITIONS.en.length} positions currently open.`)}
                </h2>
              </Reveal>
              <Reveal delay={0.1} from="right">
                <a href="#basvuru" className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#1A2530]">
                  {t('Hemen başvur', 'Apply now')}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
              </Reveal>
            </div>

            <StaggerList className="border-t border-[#C8CFD3]" stagger={0.07}>
              {POSITIONS[language].map((p, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="group flex flex-col gap-3 border-b border-[#C8CFD3] py-7 md:flex-row md:items-center md:gap-8"
                >
                  <span className="font-mono text-xs text-[#7A8590] md:w-16">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-fraunces text-xl md:text-2xl font-semibold text-[#1A2530] group-hover:text-[#5A7A8C] transition-colors">
                      {p.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[#4D5660]">
                      <span className="inline-flex items-center gap-1.5">
                        <Briefcase className="h-3.5 w-3.5 text-[#5A7A8C]" /> {p.dept}
                      </span>
                      <span className="text-[#C8CFD3]">·</span>
                      <span>{p.type}</span>
                      <span className="text-[#C8CFD3]">·</span>
                      <span>{p.location}</span>
                    </div>
                  </div>
                  <a
                    href="#basvuru"
                    className="group/btn inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#1A2530] border border-[#1A2530] px-5 py-3 hover:bg-[#1A2530] hover:text-white transition-colors shrink-0"
                    onClick={() => setForm((f) => ({ ...f, position: p.title }))}
                  >
                    {t('Başvur', 'Apply')}
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover/btn:translate-x-1" />
                  </a>
                </motion.div>
              ))}
            </StaggerList>
          </div>
        </section>

        {/* ── Başvuru Formu (stack layer 4) ── */}
        <section id="basvuru" data-nav-theme="light" className="sticky top-0 z-40 bg-white border-t border-[#C8CFD3] shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.25)]">
          <div className="mx-auto max-w-5xl px-6 lg:px-8 py-24">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className={TITLE_CLS}>
                  {t('Birlikte çalışalım.', 'Let’s work together.')}
                </h2>
                <p className="mt-4 text-[#4D5660] text-lg">
                  {t('Aşağıdaki kısa formu doldurun, CV’nizi ekleyin. En kısa sürede dönüş yapacağız.', 'Fill out the short form below and attach your CV. We will get back to you shortly.')}
                </p>
              </div>
            </Reveal>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: CARD_EASE }}
                  className="flex flex-col items-center text-center gap-4 py-16"
                >
                  <div className="h-16 w-16 rounded-full bg-[#5A7A8C]/15 border border-[#5A7A8C]/40 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-[#5A7A8C]" />
                  </div>
                  <h3 className="font-fraunces text-2xl font-semibold text-[#1A2530]">
                    {t('Başvurunuz alındı', 'Application received')}
                  </h3>
                  <p className="text-[#4D5660] max-w-md">
                    {t('Başvurunuzu inceleyip uygun bulduğumuz takdirde sizinle iletişime geçeceğiz.', 'We will review your application and contact you if it’s a fit.')}
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#5A7A8C] hover:text-[#1A2530] transition"
                  >
                    {t('Yeni başvuru', 'New application')}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="grid gap-5 md:grid-cols-2"
                >
                  <Field label={t('Ad Soyad', 'Full Name')} required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                  <Field label={t('E-posta', 'Email')} type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                  <Field label={t('Telefon', 'Phone')} type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                  <SelectField
                    label={t('Pozisyon', 'Position')}
                    value={form.position}
                    onChange={(v) => setForm({ ...form, position: v })}
                    options={POSITIONS[language].map((p) => p.title)}
                    placeholder={t('Seçiniz', 'Select')}
                  />
                  <div className="md:col-span-2">
                    <Field label={t('Ön Yazı', 'Cover Letter')} textarea value={form.message} onChange={(v) => setForm({ ...form, message: v })} />
                  </div>

                  {/* CV upload */}
                  <div className="md:col-span-2">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#4D5660] mb-2 block">
                      {t('CV / Özgeçmiş', 'CV / Resume')}
                    </span>
                    <label className="flex items-center justify-between gap-4 bg-[#F4F6F8] border border-dashed border-[#C8CFD3] px-5 py-5 cursor-pointer hover:border-[#5A7A8C]/60 transition-colors">
                      <span className="flex items-center gap-3 text-sm text-[#4D5660]">
                        <Upload className="h-4 w-4 text-[#5A7A8C]" />
                        {cvFile ? cvFile.name : t('PDF, DOC veya DOCX yükleyin', 'Upload PDF, DOC or DOCX')}
                      </span>
                      {cvFile && <span className="text-xs text-[#5A7A8C] font-mono">{(cvFile.size / 1024).toFixed(0)} KB</span>}
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="md:col-span-2 flex justify-end mt-4">
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
                          {t('Başvuruyu Gönder', 'Submit Application')}
                          <Send className="h-4 w-4 transition group-hover:translate-x-1" />
                        </>
                      )}
                    </motion.button>
                  </div>

                  {status === 'error' && (
                    <p className="md:col-span-2 text-xs text-red-700">
                      {t('Bir hata oluştu. Lütfen tekrar deneyin.', 'An error occurred. Please try again.')}
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <div className="relative z-50">
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
