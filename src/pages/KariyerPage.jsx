import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Upload, Send, Briefcase, Users, Star, CheckCircle, GraduationCap, Shield } from 'lucide-react';
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
      title: 'Geleceğinizi Bizimle\nŞekillendirin',
      sub: 'Hukuk alanındaki kariyerinizi Verdi’nin köklü deneyimi ve dinamik çalışma ortamında inşa edin. Nitelikli, vizyoner ve tutkulu profesyoneller arıyoruz.',
      cultureTitle: 'Neden Verdi?',
      cultureSub: 'Değerlerimiz ve Çalışma Ortamımız',
      values: [
        {
          title: 'Mükemmeliyetçilik',
          desc: 'Her adımda en yüksek hukuki standartları hedefliyor, detaylara ve analitik derinliğe önem veriyoruz.',
        },
        {
          title: 'Sürekli Gelişim',
          desc: 'Ekibimizin akademik çalışmalarını, yüksek lisans süreçlerini ve mesleki uzmanlaşmasını önemsiyor ve destekliyoruz.',
        },
        {
          title: 'Kolektif Kültür',
          desc: 'Hiyerarşiden uzak, şeffaf, bilgi paylaşımına ve karşılıklı saygıya dayalı güçlü bir ekip ruhuna sahibiz.',
        }
      ],
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
      successMsg: 'İnsan kaynakları ekibimiz başvurunuzu inceleyerek en kısa sürede sizinle iletişime geçecektir.',
      fullTime: 'Tam Zamanlı',
      internship: 'Staj',
    },
    en: {
      badge: 'Career',
      title: 'Shape Your Future\nWith Us',
      sub: 'Build your legal career within Verdi’s established experience and dynamic environment. We seek qualified, visionary, and passionate professionals.',
      cultureTitle: 'Why Verdi?',
      cultureSub: 'Our Workplace & Values',
      values: [
        {
          title: 'Excellence',
          desc: 'We target the highest legal standards at every step, valuing precision and analytical depth.',
        },
        {
          title: 'Continuous Growth',
          desc: 'We encourage and support academic studies, postgraduate programs, and professional specialization.',
        },
        {
          title: 'Collective Culture',
          desc: 'We have a strong team spirit built on transparency, knowledge sharing, and mutual respect without strict hierarchy.',
        }
      ],
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
      successMsg: 'Our HR team will review your application and get in touch with you shortly.',
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
    <div className="min-h-screen bg-[#f6f4ef] text-[#202020]">
      <Navbar />

      {/* Hero Section */}
      <section data-nav-theme="dark" className="relative overflow-hidden bg-[#05070b] text-white">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=2400&q=90"
          alt="Office"
          className="absolute inset-0 h-full w-full object-cover object-center grayscale opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black/50" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-44 pb-28" ref={headerRef}>
          <motion.div className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }} animate={headerInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
            <div className="w-8 h-px bg-[#c8b68c]/60" />
            <span className="text-xs tracking-[0.35em] uppercase text-[#c8b68c] font-semibold">{l.badge}</span>
          </motion.div>
          <motion.h1 className="font-fraunces text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-6 whitespace-pre-line"
            initial={{ opacity: 0, y: 40 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
            {l.title}
          </motion.h1>
          <motion.p className="text-white/80 text-base md:text-lg max-w-2xl leading-relaxed font-light"
            initial={{ opacity: 0 }} animate={headerInView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}>
            {l.sub}
          </motion.p>
        </div>
      </section>

      {/* Culture & Values */}
      <section data-nav-theme="light" className="bg-[#f6f4ef] border-b border-[#d8d0bf]/40 py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8b6f3d] mb-3">{l.cultureTitle}</p>
            <h2 className="font-fraunces text-2xl md:text-3xl font-semibold text-[#202020]">{l.cultureSub}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {l.values.map((val, idx) => {
              const IconComponent = idx === 0 ? Star : idx === 1 ? GraduationCap : Users;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-white p-8 border border-[#d8d0bf] rounded-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:border-[#8b6f3d]/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-sm bg-[#c9a87c]/10 border border-[#c9a87c]/30 flex items-center justify-center text-[#8b6f3d] mb-6 group-hover:bg-[#c9a87c] group-hover:text-white transition-colors duration-300">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-lg text-[#202020] mb-3">{val.title}</h3>
                  <p className="text-sm text-[#5f5b52] leading-relaxed font-light">{val.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section data-nav-theme="light" className="bg-[#f6f4ef] py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#d8d0bf] pb-6 mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8b6f3d] mb-3">{l.badge}</p>
              <h2 className="font-fraunces text-2xl md:text-3xl font-semibold text-[#202020]">{l.openPos}</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {pos.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="border border-[#d8d0bf] rounded-sm p-6 bg-white hover:border-[#8b6f3d]/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all duration-300 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-base text-[#202020] mb-1 group-hover:text-[#8b6f3d] transition-colors">{p.title}</h3>
                    <p className="text-[#5f5b52] text-xs uppercase tracking-wider font-medium">{p.dept}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-sm border shrink-0 font-medium ${
                    p.type === 'Staj' || p.type === 'Internship'
                      ? 'bg-[#c9a87c]/10 border-[#c9a87c]/30 text-[#8b6f3d]'
                      : 'bg-[#202020]/5 border-[#202020]/10 text-[#202020]/70'
                  }`}>
                    {p.type}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section data-nav-theme="light" className="bg-[#f6f4ef] pb-28 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-[#d8d0bf] rounded-sm p-8 md:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.01)]"
          >
            <h2 className="font-fraunces text-2xl md:text-3xl font-semibold text-[#202020] border-b border-[#d8d0bf] pb-6 mb-8">{l.applyTitle}</h2>

            {success ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/5 border border-green-500/20 rounded-sm p-10 text-center">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg text-[#202020] mb-2">{l.successTitle}</h3>
                <p className="text-[#5f5b52] text-sm">{l.successMsg}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#5f5b52] mb-2">{l.name} *</label>
                    <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-[#d8d0bf] rounded-sm bg-white text-[#202020] text-sm focus:outline-none focus:border-[#8b6f3d] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#5f5b52] mb-2">{l.email} *</label>
                    <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-[#d8d0bf] rounded-sm bg-white text-[#202020] text-sm focus:outline-none focus:border-[#8b6f3d] transition-colors" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#5f5b52] mb-2">{l.phone}</label>
                    <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      className="w-full px-4 py-3 border border-[#d8d0bf] rounded-sm bg-white text-[#202020] text-sm focus:outline-none focus:border-[#8b6f3d] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#5f5b52] mb-2">{l.position} *</label>
                    <div className="relative">
                      <select required value={form.position} onChange={e => setForm(f => ({ ...f, position: e.target.value }))}
                        className="w-full px-4 py-3 border border-[#d8d0bf] rounded-sm bg-white text-[#202020] text-sm focus:outline-none focus:border-[#8b6f3d] transition-colors appearance-none cursor-pointer">
                        <option value="">{l.posPlaceholder}</option>
                        {pos.map((p, i) => <option key={i} value={p.title}>{p.title}</option>)}
                        <option value={language === 'tr' ? 'Açık Başvuru' : 'Open Application'}>{language === 'tr' ? 'Açık Başvuru' : 'Open Application'}</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#5f5b52]">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5f5b52] mb-2">{l.message}</label>
                  <textarea rows={4} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full px-4 py-3 border border-[#d8d0bf] rounded-sm bg-white text-[#202020] text-sm focus:outline-none focus:border-[#8b6f3d] transition-colors resize-none" />
                </div>

                {/* CV Upload */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5f5b52] mb-2">{l.cvLabel}</label>
                  <label className="flex items-center gap-3 px-4 py-4 border border-dashed border-[#c9a87c]/40 rounded-sm bg-[#c9a87c]/5 cursor-pointer hover:bg-[#c9a87c]/10 hover:border-[#8b6f3d] transition-all group">
                    <Upload className="w-4 h-4 text-[#8b6f3d]/70 group-hover:text-[#8b6f3d] transition-colors" />
                    <span className="text-sm text-[#5f5b52] group-hover:text-[#202020] transition-colors font-medium">
                      {cvFile ? cvFile.name : l.cvBtn}
                    </span>
                    <input type="file" accept=".pdf,.doc,.docx" className="hidden"
                      onChange={e => setCvFile(e.target.files[0] || null)} />
                  </label>
                </div>

                <motion.button
                  type="submit" disabled={loading}
                  className="flex items-center gap-3 px-8 py-4 bg-[#1f1f1f] text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-[#8b6f3d] hover:text-white transition-all disabled:opacity-60 w-full justify-center shadow-md hover:shadow-lg"
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                  {loading ? l.sending : <><Send className="w-4 h-4" />{l.submit}</>}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
