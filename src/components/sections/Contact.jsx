import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Contact() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: t('contact.info.address'),
      value: t('contact.info.addressValue')
    },
    {
      icon: Phone,
      label: t('contact.info.phone'),
      value: t('contact.info.phoneValue')
    },
    {
      icon: Mail,
      label: t('contact.info.email'),
      value: t('contact.info.emailValue')
    }
  ];

  return (
    <section 
      id="contact" 
      ref={ref}
      className="relative py-16 md:py-20 bg-bone overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm tracking-[0.3em] uppercase text-cobalt font-medium">
            {t('contact.title')}
          </span>
          <h2 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold text-ink mt-4">
            {t('contact.subtitle')}
          </h2>
          <p className="mt-6 text-lg text-ink/60 max-w-2xl mx-auto">
            {t('contact.description')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="w-14 h-14 rounded-lg bg-ink flex items-center justify-center shrink-0">
                  <info.icon className="w-6 h-6 text-bone" />
                </div>
                <div>
                  <p className="text-sm text-ink/50 uppercase tracking-wider">{info.label}</p>
                  <p className="text-lg font-medium text-ink mt-1">{info.value}</p>
                </div>
              </motion.div>
            ))}

            {/* Map Placeholder */}
            <motion.div
              className="mt-8 aspect-video rounded-lg overflow-hidden bg-ink/5 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.2!2d29.01!3d41.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDA0JzQ4LjAiTiAyOcKwMDAnMzYuMCJF!5e0!3m2!1str!2str!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale"
              />
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-ink/70 mb-2 block">
                    {t('contact.form.name')}
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="h-12 bg-white border-ink/10 focus:border-cobalt text-ink"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-ink/70 mb-2 block">
                    {t('contact.form.email')}
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="h-12 bg-white border-ink/10 focus:border-cobalt text-ink"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-ink/70 mb-2 block">
                    {t('contact.form.phone')}
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="h-12 bg-white border-ink/10 focus:border-cobalt text-ink"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-ink/70 mb-2 block">
                    {t('contact.form.subject')}
                  </label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) => setFormData({...formData, subject: value})}
                  >
                    <SelectTrigger className="h-12 bg-white border-ink/10 focus:border-cobalt text-ink">
                      <SelectValue placeholder={t('contact.form.selectSubject')} />
                    </SelectTrigger>
                    <SelectContent>
                      {t('contact.form.subjects').map((subject, index) => (
                        <SelectItem key={index} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-ink/70 mb-2 block">
                  {t('contact.form.message')}
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="min-h-[150px] bg-white border-ink/10 focus:border-cobalt text-ink resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full md:w-auto bg-cobalt hover:bg-cobalt/90 text-bone h-14 px-8"
                disabled={isSubmitted}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    {t('contact.form.submit')}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    {t('contact.form.submit')}
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}