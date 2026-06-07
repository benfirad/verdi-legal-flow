import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Upload, Send, Briefcase, Users, Star, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { localClient } from '@/api/localClient';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const positions = {
  tr: [
    { title: 'Avukat (Kurumsal Hukuk)', dept: 'Hukuk', type: 'Tam Zamanlı' },
    { title: 'Stajyer Avukat', dept: 'Hukuk', type: 'Staj' },
    { title: 'Hukuk Asistanı', dept: 'Destek', type: 'Tam Zamanlı' },
    { title: 'Kıdemli Avukat (Enerji Hukuku)', dept: 'Hukuk', type: 'Tam Zamanlı' },
  ],
  en: [
    { title: 'Attorney (Corporate Law)', dept: 'Legal', type: 'Full Time' },
    { title: 'Associate Attorney', dept: 'Legal', type: 'Internship' },
    { title: 'Legal Assistant', dept: 'Support', type: 'Full Time' },
    { title: 'Senior Attorney (Energy Law)', dept: 'Legal', type: 'Full Time' },
  ],
};

export default function KariyerPage() {
  const { language } = useLanguage();
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const [form, setForm] = useState({ name: '', email: '', phone: '', position: '', message: '' });
  const [cvFile, setCvFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const labels = {
    tr: {
      badge: 'Kariyer',
      title: 'Ekibimize\nKatılın',
      sub: 'Hukuk alanında kariyerinizi Verdi ile inşa edin. Nitelikli, tutkulu profesyoneller arıyoruz.',
      openPos: 'Açık Pozisyonlar',
      applyTitle: 'Başvuru Formu',
      name: 'Ad Soyad',
      email: 'E-posta',
      phone: 'Telefon',
      position: 'Başvurulan Pozisyon',
      posPlaceholder: 'Pozisyon seçin veya yazın',
      message: 'Kendinizi Tanıtın',
      cvLabel: 'CV Yükle (PDF, DOC)',
      cvBtn: 'Dosya Seç',
      submit: 'Başvuruyu Gönder',
      sending: 'Gönderiliyor...',
      successTitle: 'Başvurunuz Alındı!',
      successMsg: 'En kısa sürede sizinle iletişime geçeceğiz.',
      fullTime: 'Tam Zamanlı',
      internship: 'Staj',
    },
    en: {
      badge: 'Career',
      title: 'Join Our\nTeam',
      sub: 'Build your legal career with Verdi. We are looking for qualified, passionate professionals.',
      openPos: 'Open Positions',
      applyTitle: 'Application Form',
      name: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      position: 'Position Applied',
      posPlaceholder: 'Select or type a position',
      message: 'Introduce Yourself',
      cvLabel: 'Upload CV (PDF, DOC)',
      cvBtn: 'Choose File',
      submit: 'Submit Application',
      sending: 'Sending...',
      successTitle: 'Application Received!',
      successMsg: 'We will get back to you as soon as possible.',
      fullTime: 'Full Time',
      internship: 'Internship',
    },
  };

  const l = labels[language] || labels.tr;
  const pos = positions[language] || positions.tr;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let cvUrl = '';
      if (cvFile) {
        const { file_url } = await localClient.integrations.Core.UploadFile({ file: cvFile });
        cvUrl = file_url;
      }
      await localClient.integrations.Core.SendEmail({
        to: 'info@verdihukuk.com',
        subject: `Kariyer Başvurusu: ${form.name} - ${form.position}`,
        body: `Ad Soyad: ${form.name}\nE-posta: ${form.email}\nTelefon: ${form.phone}\nPozisyon: ${form.position}\n\nTanıtım:\n${form.message}${cvUrl ? `\n\nCV: ${cvUrl}` : ''}`,
      });
      setSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bone text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-20 px-6 lg:px-8 max-w-7xl mx-auto" ref={headerRef}>
        <motion.div className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, x: -20 }} animate={headerInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
          <div className="w-8 h-px bg-ink" />
          <span className="text-xs tracking-[0.35em] uppercase text-ink font-medium">{l.badge}</span>
        </motion.div>
        <motion.h1 className="font-fraunces text-5xl md:text-7xl font-bold text-ink leading-tight mb-6 whitespace-pre-line"
          initial={{ opacity: 0, y: 40 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
          {l.title}
        </motion.h1>
        <motion.p className="text-ink/70 text-lg max-w-2xl"
          initial={{ opacity: 0 }} animate={headerInView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}>
          {l.sub}
        </motion.p>
      </section>

      {/* Open Positions */}
      <section className="px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <h2 className="font-fraunces text-2xl font-bold text-ink mb-8">{l.openPos}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {pos.map((p, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="border border-ink/15 rounded-sm p-6 bg-white/60 hover:border-ink/40 hover:bg-white transition-all duration-300 group">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-fraunces text-lg font-bold text-ink mb-1 group-hover:text-ink/80 transition-colors">{p.title}</h3>
                  <p className="text-ink/60 text-sm">{p.dept}</p>
                </div>
                <span className={`text-xs px-3 py-1.5 rounded-sm border shrink-0 ${
                  p.type === 'Staj' || p.type === 'Internship'
                    ? 'bg-amber-50 border-amber-200 text-amber-700'
                    : 'bg-ink/5 border-ink/15 text-ink/70'
                }`}>
                  {p.type}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Application Form */}
      <section className="px-6 lg:px-8 max-w-3xl mx-auto pb-28">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-fraunces text-3xl font-bold text-ink mb-8">{l.applyTitle}</h2>

          {success ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="border border-green-200 bg-green-50 rounded-sm p-12 text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-fraunces text-2xl font-bold text-ink mb-2">{l.successTitle}</h3>
              <p className="text-ink/70">{l.successMsg}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">{l.name} *</label>
                  <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-ink/20 rounded-sm bg-white text-ink text-sm focus:outline-none focus:border-ink/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">{l.email} *</label>
                  <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-ink/20 rounded-sm bg-white text-ink text-sm focus:outline-none focus:border-ink/50 transition-colors" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">{l.phone}</label>
                  <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full px-4 py-3 border border-ink/20 rounded-sm bg-white text-ink text-sm focus:outline-none focus:border-ink/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">{l.position} *</label>
                  <select required value={form.position} onChange={e => setForm(f => ({ ...f, position: e.target.value }))}
                    className="w-full px-4 py-3 border border-ink/20 rounded-sm bg-white text-ink text-sm focus:outline-none focus:border-ink/50 transition-colors">
                    <option value="">{l.posPlaceholder}</option>
                    {pos.map((p, i) => <option key={i} value={p.title}>{p.title}</option>)}
                    <option value={language === 'tr' ? 'Açık Başvuru' : 'Open Application'}>{language === 'tr' ? 'Açık Başvuru' : 'Open Application'}</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">{l.message}</label>
                <textarea rows={4} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full px-4 py-3 border border-ink/20 rounded-sm bg-white text-ink text-sm focus:outline-none focus:border-ink/50 transition-colors resize-none" />
              </div>

              {/* CV Upload */}
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">{l.cvLabel}</label>
                <label className="flex items-center gap-3 px-4 py-3 border border-dashed border-ink/30 rounded-sm bg-white cursor-pointer hover:border-ink/60 transition-colors group">
                  <Upload className="w-4 h-4 text-ink/50 group-hover:text-ink transition-colors" />
                  <span className="text-sm text-ink/60 group-hover:text-ink transition-colors">
                    {cvFile ? cvFile.name : l.cvBtn}
                  </span>
                  <input type="file" accept=".pdf,.doc,.docx" className="hidden"
                    onChange={e => setCvFile(e.target.files[0] || null)} />
                </label>
              </div>

              <motion.button
                type="submit" disabled={loading}
                className="flex items-center gap-3 px-8 py-4 bg-ink text-bone text-sm font-medium rounded-sm hover:bg-ink/90 transition-colors disabled:opacity-60 w-full justify-center"
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                {loading ? l.sending : <><Send className="w-4 h-4" />{l.submit}</>}
              </motion.button>
            </form>
          )}
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
