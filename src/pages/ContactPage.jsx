import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Send, CheckCircle, Clock, MessageSquare, ArrowRight, Loader2 } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { localClient } from '@/api/localClient';

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

function FadeIn({ children, delay = 0, direction = 'up' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: direction === 'up' ? 30 : 0, x: direction === 'left' ? -30 : direction === 'right' ? 30 : 0 }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SuccessMessage({ language }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col items-center justify-center py-16 text-center gap-5"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-cobalt/10 border border-cobalt/30 flex items-center justify-center"
      >
        <CheckCircle className="w-9 h-9 text-cobalt" />
      </motion.div>
      <h3 className="font-fraunces text-2xl font-bold text-bone">
        {language === 'tr' ? 'Mesajınız İletildi!' : 'Message Sent!'}
      </h3>
      <p className="text-steel max-w-sm">
        {language === 'tr'
          ? 'En kısa sürede ekibimiz size dönüş yapacaktır. Teşekkür ederiz.'
          : 'Our team will get back to you as soon as possible. Thank you.'}
      </p>
    </motion.div>
  );
}

export default function ContactPage() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const contactInfo = [
    { icon: MapPin, label: t('contact.info.address'), value: t('contact.info.addressValue') },
    { icon: Phone, label: t('contact.info.phone'), value: t('contact.info.phoneValue') },
    { icon: Mail, label: t('contact.info.email'), value: t('contact.info.emailValue') },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    await localClient.functions.invoke('sendContactEmail', formData);
    setStatus('success');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const set = (field) => (e) => setFormData(prev => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="min-h-screen bg-ink text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-cobalt/8 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

        <FadeIn>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-cobalt" />
            <span className="text-xs tracking-[0.35em] uppercase text-cobalt font-medium">
              {t('contact.title')}
            </span>
          </div>
          <h1 className="font-fraunces text-3xl md:text-4xl lg:text-5xl font-semibold text-bone leading-tight mb-4">
            {language === 'tr' ? 'Bizimle\nİletişime Geçin' : 'Get in\nTouch'}
          </h1>
          <p className="text-steel text-lg max-w-xl mt-4">{t('contact.description')}</p>
        </FadeIn>
      </section>

      {/* Main content */}
      <section className="px-6 lg:px-8 max-w-7xl mx-auto pb-32">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">

          {/* Left column */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* Contact info cards */}
            <FadeIn delay={0.1} direction="right">
              <div className="flex flex-col gap-4">
                {contactInfo.map((info, i) => (
                  <motion.div key={i}
                    className="flex items-start gap-4 p-5 border border-border/20 rounded-sm bg-card/20 hover:border-cobalt/35 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
                    whileHover={{ x: 6, scale: 1.015 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                    <div className="w-11 h-11 rounded-sm bg-cobalt/10 border border-cobalt/20 flex items-center justify-center shrink-0">
                      <info.icon className="w-5 h-5 text-cobalt" />
                    </div>
                    <div>
                      <p className="text-xs text-steel/80 uppercase tracking-wider mb-1">{info.label}</p>
                      <p className="text-bone font-medium text-sm leading-relaxed">{info.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </FadeIn>

            {/* Working hours */}
            <FadeIn delay={0.2} direction="right">
              <div className="border border-border/20 rounded-sm bg-card/20 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-cobalt" />
                  <span className="text-sm font-semibold text-bone">
                    {language === 'tr' ? 'Çalışma Saatleri' : 'Working Hours'}
                  </span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {WORKING_HOURS[language].map((row, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <span className="text-steel/80">{row.day}</span>
                      <span className={`font-medium ${row.hours === 'Kapalı' || row.hours === 'Closed' ? 'text-steel/40' : 'text-bone'}`}>{row.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Map */}
            <FadeIn delay={0.3} direction="right">
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="rounded-sm overflow-hidden border border-border/20 aspect-[4/3] hover:border-cobalt/30 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.2!2d29.01!3d41.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDA0JzQ4LjAiTiAyOcKwMDAnMzYuMCJF!5e0!3m2!1str!2str!4v1234567890"
                  width="100%" height="100%" style={{ border: 0 }}
                  allowFullScreen="" loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale"
                />
              </motion.div>
            </FadeIn>
          </div>

          {/* Right column — form */}
          <div className="lg:col-span-3">
            <FadeIn delay={0.15} direction="left">
              <div className="border border-border/20 rounded-sm bg-card/20 p-7 md:p-10 relative overflow-hidden">
                {/* Subtle glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-cobalt/5 rounded-full blur-[80px] pointer-events-none" />

                <div className="flex items-center gap-2 mb-8 relative z-10">
                  <MessageSquare className="w-4 h-4 text-cobalt" />
                  <span className="text-sm font-semibold text-bone">
                    {language === 'tr' ? 'Mesaj Gönderin' : 'Send a Message'}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <SuccessMessage key="success" language={language} />
                  ) : (
                    <motion.form key="form" onSubmit={handleSubmit} className="space-y-5 relative z-10"
                      initial={{ opacity: 1 }} exit={{ opacity: 0 }}>

                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-xs text-steel/80 uppercase tracking-wider">{t('contact.form.name')} *</label>
                          <Input value={formData.name} onChange={set('name')} required
                            className="h-11 bg-ink/60 border-border/30 focus:border-cobalt text-bone placeholder:text-steel/40" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs text-steel/80 uppercase tracking-wider">{t('contact.form.email')} *</label>
                          <Input type="email" value={formData.email} onChange={set('email')} required
                            className="h-11 bg-ink/60 border-border/30 focus:border-cobalt text-bone placeholder:text-steel/40" />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-xs text-steel/80 uppercase tracking-wider">{t('contact.form.phone')}</label>
                          <Input type="tel" value={formData.phone} onChange={set('phone')}
                            className="h-11 bg-ink/60 border-border/30 focus:border-cobalt text-bone placeholder:text-steel/40" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs text-steel/80 uppercase tracking-wider">{t('contact.form.subject')}</label>
                          <Select value={formData.subject} onValueChange={v => setFormData(p => ({ ...p, subject: v }))}>
                            <SelectTrigger className="h-11 bg-ink/60 border-border/30 text-bone data-[placeholder]:text-steel/40">
                              <SelectValue placeholder={t('contact.form.selectSubject')} />
                            </SelectTrigger>
                            <SelectContent>
                              {t('contact.form.subjects').map((s, i) => (
                                <SelectItem key={i} value={s}>{s}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs text-steel/80 uppercase tracking-wider">{t('contact.form.message')} *</label>
                        <Textarea value={formData.message} onChange={set('message')} required
                          className="min-h-[160px] bg-ink/60 border-border/30 focus:border-cobalt text-bone resize-none placeholder:text-steel/40" />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-3.5 bg-cobalt text-bone text-sm font-medium rounded-sm hover:bg-cobalt/90 disabled:opacity-60 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {status === 'loading' ? (
                          <><Loader2 className="w-4 h-4 animate-spin" />{language === 'tr' ? 'Gönderiliyor…' : 'Sending…'}</>
                        ) : (
                          <><Send className="w-4 h-4" />{t('contact.form.submit')}<ArrowRight className="w-4 h-4" /></>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
