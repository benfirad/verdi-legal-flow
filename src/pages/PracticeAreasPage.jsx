import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Reveal, StaggerList, itemVariants } from '@/components/motion/Reveal';

const IMAGES = [
  'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=900&q=80',
  'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80',
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80',
  'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&q=80',
  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=80',
  'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=900&q=80',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80',
];

const AREA_CONTENT = [
  {
    id: 'ticaret-sirketler',
    tr: ['Ticaret ve Şirketler Hukuku', 'Şirketlerin yaşam döngüsü boyunca karar alma süreçlerini güvenli, hızlı ve uygulanabilir hale getiriyoruz.', ['Şirket kuruluşu ve yeniden yapılandırma', 'Kurumsal yönetim ve pay sahipleri ilişkileri', 'Ticari sözleşmeler ve günlük danışmanlık']],
    en: ['Corporate and Commercial', 'We make decision-making throughout the corporate lifecycle secure, efficient and practical.', ['Incorporation and restructuring', 'Corporate governance and shareholder relations', 'Commercial contracts and day-to-day counsel']],
  },
  {
    id: 'birlesme-devralma',
    tr: ['Birleşme ve Devralmalar', 'Yatırım ve dönüşüm işlemlerini hukuki risk kadar ticari hedefleri de gözeten bir yaklaşımla yönetiyoruz.', ['Hukuki inceleme', 'İşlem belgeleri ve müzakereler', 'Kapanış ve entegrasyon desteği']],
    en: ['Mergers and Acquisitions', 'We manage investment and transformation deals with equal focus on legal risk and commercial goals.', ['Legal due diligence', 'Transaction documents and negotiations', 'Closing and integration support']],
  },
  {
    id: 'uyusmazlik',
    tr: ['Uyuşmazlık Çözümü', 'Uyuşmazlıkları erken aşamada analiz ediyor; dava, tahkim ve uzlaşma seçeneklerini tek stratejide buluşturuyoruz.', ['Ticari davalar', 'Ulusal ve uluslararası tahkim', 'Arabuluculuk ve sulh müzakereleri']],
    en: ['Dispute Resolution', 'We assess disputes early and align litigation, arbitration and settlement options within one strategy.', ['Commercial litigation', 'Domestic and international arbitration', 'Mediation and settlement negotiations']],
  },
  {
    id: 'is-hukuku',
    tr: ['İş ve Sosyal Güvenlik Hukuku', 'İş gücü kararlarında mevzuata uyum ile kurum kültürü ve operasyonel ihtiyaçları dengeliyoruz.', ['İş sözleşmeleri ve politikalar', 'Yeniden yapılanma ve işten çıkışlar', 'İş uyuşmazlıkları ve uyum denetimi']],
    en: ['Employment and Benefits', 'We balance compliance, workplace culture and operational needs in workforce decisions.', ['Employment contracts and policies', 'Restructuring and terminations', 'Employment disputes and compliance audits']],
  },
  {
    id: 'gayrimenkul',
    tr: ['Gayrimenkul ve İnşaat', 'Yatırımın ilk değerlendirmesinden proje teslimine kadar taşınmaz ve inşaat süreçlerine eşlik ediyoruz.', ['Satın alma ve hukuki inceleme', 'Kira ve proje geliştirme', 'İnşaat sözleşmeleri ve uyuşmazlıklar']],
    en: ['Real Estate and Construction', 'We support real estate and construction matters from initial investment review through project delivery.', ['Acquisitions and due diligence', 'Leasing and development', 'Construction contracts and disputes']],
  },
  {
    id: 'rekabet',
    tr: ['Rekabet Hukuku', 'Büyüme stratejilerinin rekabet kurallarıyla uyumlu biçimde hayata geçirilmesine destek oluyoruz.', ['Birleşme kontrolü', 'Rekabet uyum programları', 'Soruşturmalar ve dağıtım sistemleri']],
    en: ['Competition Law', 'We help growth strategies move forward in compliance with competition rules.', ['Merger control', 'Competition compliance programmes', 'Investigations and distribution systems']],
  },
  {
    id: 'finans',
    tr: ['Bankacılık ve Finans', 'Finansman yapılarını tarafların ihtiyaçlarına, teminat paketine ve düzenleyici çerçeveye göre kurguluyoruz.', ['Kredi ve finansman sözleşmeleri', 'Teminat yapıları', 'Finansal düzenlemeler']],
    en: ['Banking and Finance', 'We structure financing around stakeholder needs, security packages and the regulatory framework.', ['Loan and finance documents', 'Security structures', 'Financial regulation']],
  },
  {
    id: 'veri-teknoloji',
    tr: ['Veri Koruma ve Teknoloji', 'Dijital iş modellerinde verinin güvenli, ölçülü ve mevzuata uyumlu kullanımını destekliyoruz.', ['KVKK ve GDPR uyumu', 'Teknoloji ve SaaS sözleşmeleri', 'Veri ihlali müdahalesi']],
    en: ['Data Protection and Technology', 'We support secure, proportionate and compliant data use across digital business models.', ['Data protection compliance', 'Technology and SaaS agreements', 'Data breach response']],
  },
  {
    id: 'fikri-mulkiyet',
    tr: ['Fikri Mülkiyet', 'Fikirleri ve markaları korurken fikri hakların ticari değer üretmesini sağlıyoruz.', ['Marka ve tasarım portföyleri', 'Lisans ve devir sözleşmeleri', 'Hak ihlalleri ve uyuşmazlıklar']],
    en: ['Intellectual Property', 'We protect ideas and brands while helping intellectual assets generate commercial value.', ['Trademark and design portfolios', 'Licence and assignment agreements', 'Infringement and disputes']],
  },
];

export const PRACTICE_AREAS = AREA_CONTENT.map((area, index) => ({
  id: area.id,
  image: IMAGES[index],
  tr: { title: area.tr[0], lede: area.tr[1], services: area.tr[2] },
  en: { title: area.en[0], lede: area.en[1], services: area.en[2] },
}));

export default function PracticeAreasPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-[#E8ECEF] text-[#1A2530]">
      <Navbar />
      <main>
        <section data-nav-theme="dark" className="relative overflow-hidden bg-[#1A2530] text-white">
          <img src={IMAGES[0]} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A2530] via-[#1A2530]/85 to-[#1A2530]/55" />
          <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-40 lg:px-8 lg:pb-32">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#B8CCDA]">
                {language === 'tr' ? 'Çalışma Alanları' : 'Practice Areas'}
              </p>
              <h1 className="mt-6 max-w-4xl font-fraunces text-4xl font-semibold leading-tight md:text-6xl">
                {language === 'tr' ? 'Hukuki uzmanlığı ticari hedeflerle buluşturuyoruz.' : 'Where legal expertise meets commercial direction.'}
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">
                {language === 'tr' ? 'Tek bir dosyaya değil, kararın bütün etkilerine bakarak disiplinler arası çözümler geliştiriyoruz.' : 'We develop cross-disciplinary solutions by looking beyond the matter to the full impact of each decision.'}
              </p>
            </Reveal>
          </div>
        </section>

        <section data-nav-theme="light" className="bg-[#E8ECEF] py-20">
          <StaggerList className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-2 lg:px-8" stagger={0.08}>
            {PRACTICE_AREAS.map((area, index) => {
              const { title, lede, services } = area[language];
              return (
                <motion.article id={area.id} key={area.id} className="scroll-mt-24 overflow-hidden border border-[#C8CFD3] bg-white" variants={itemVariants}>
                  <div className="grid md:grid-cols-[0.72fr_1.28fr]">
                    <div className="relative min-h-64 overflow-hidden bg-[#1A2530]">
                      <img src={area.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover grayscale opacity-75 transition duration-700 hover:scale-105 hover:grayscale-0" />
                      <span className="absolute left-5 top-5 font-fraunces text-4xl font-semibold text-white">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <div className="p-7 md:p-9">
                      <h2 className="font-fraunces text-2xl font-semibold leading-tight md:text-3xl">{title}</h2>
                      <p className="mt-4 text-sm leading-7 text-[#4D5660]">{lede}</p>
                      <ul className="mt-6 space-y-3 border-t border-[#D6DCE0] pt-6">
                        {services.map((service) => (
                          <li key={service} className="flex gap-3 text-sm text-[#4D5660]">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#5A7A8C]" />{service}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </StaggerList>
        </section>

        <section data-nav-theme="dark" className="bg-[#1A2530] px-6 py-20 text-white">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center">
            <h2 className="max-w-2xl font-fraunces text-3xl font-semibold md:text-4xl">
              {language === 'tr' ? 'Konunuzu birlikte çerçeveleyelim.' : 'Let us frame your matter together.'}
            </h2>
            <a href="/iletisim" className="group inline-flex items-center gap-3 border border-white/50 px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] transition hover:bg-white hover:text-[#1A2530]">
              {language === 'tr' ? 'İletişime geçin' : 'Contact us'}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
