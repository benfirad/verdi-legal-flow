import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const COLORS = [
  { accent: '#C9A87C', bg: 'rgba(201,168,124,0.12)', border: 'rgba(201,168,124,0.45)', text: '#C9A87C', light: 'rgba(201,168,124,0.15)' },
  { accent: '#82B89A', bg: 'rgba(130,184,154,0.12)', border: 'rgba(130,184,154,0.45)', text: '#82B89A', light: 'rgba(130,184,154,0.15)' },
  { accent: '#A89BC8', bg: 'rgba(168,155,200,0.12)', border: 'rgba(168,155,200,0.45)', text: '#A89BC8', light: 'rgba(168,155,200,0.15)' },
  { accent: '#87AECB', bg: 'rgba(135,174,203,0.12)', border: 'rgba(135,174,203,0.45)', text: '#87AECB', light: 'rgba(135,174,203,0.15)' },
];

const treeData = {
  tr: [
    {
      id: 'ux', title: 'Kullanıcı\nDeneyimi', sub: 'UX/UI Design',
      children: [
        { title: 'Deneyim Analizi', subs: ['UX Research', 'Kullanılabilirlik', 'Persona Analizi'], desc: 'Modern arayüzlerde kullanıcı davranış modelleri, kullanılabilirlik ilkeleri ve nitel/nicel araştırma metodolojileri.' },
        { title: 'Arayüz Tasarımı', subs: ['Figma Prototip', 'Tasarım Sistemleri', 'Mikro-Etkileşim'], desc: 'Figma ile piksel hassasiyetinde bileşen tasarımları, prototipleme ve tutarlı tasarım dili oluşturma.' },
        { title: 'Erişilebilirlik (A11y)', subs: ['W3C Standartları', 'Kapsayıcı Tasarım', 'Kontrast & Okuma'], desc: 'Tüm kullanıcılar için erişilebilir, kapsayıcı ve uluslararası standartlara uygun dijital arayüz tasarımı.' },
        { title: 'Kullanılabilirlik Testi', subs: ['Göz İzleme', 'A/B Testleri', 'Geri Bildirim'], desc: 'Kullanıcı testleri ve göz izleme verileri ile arayüzlerdeki tıkanıklık noktalarının analizi.' },
      ],
    },
    {
      id: 'brand', title: 'Marka &\nKimlik', sub: 'Branding & Logo',
      children: [
        { title: 'Görsel Kimlik', subs: ['Logo Tasarımı', 'Tipografi', 'Renk Teorisi'], desc: 'Dijital çağda markaların kendilerini doğru ifade etmeleri için gereken görsel dünyaların tasarımı.' },
        { title: 'Marka Hikayesi', subs: ['Storytelling', 'Ses Tonu', 'İçerik Stratejisi'], desc: 'Markanın hikayesini, değerlerini ve misyonunu etkileyici ve akıcı metinlerle kitlelere aktarma.' },
        { title: 'Konumlandırma', subs: ['Pazar Analizi', 'Rakip Analizi', 'Marka Değeri'], desc: 'Markanın pazar içerisindeki benzersiz konumunu belirleme ve rekabet gücü oluşturma.' },
        { title: 'Dijital PR & Tanıtım', subs: ['Sosyal Medya', 'Viral Kampanya', 'Bilinirlik'], desc: 'Sosyal mecralarda ses getiren viral kampanyalar, tanıtım stratejileri ve dijital PR çalışmaları.' },
      ],
    },
    {
      id: 'ai', title: 'Yapay Zeka &\nSanat', sub: 'AI & Art',
      children: [
        { title: 'Üretken Görseller', subs: ['Midjourney', 'Stable Diffusion', 'DALL-E'], desc: 'Generative AI araçları ile tasarım süreçlerinde ilham verici görsel içerik üretme teknikleri.' },
        { title: 'AI Destekli Tasarım', subs: ['İş Akışı', 'Akıllı Arayüzler', 'Şablonlama'], desc: 'Yapay zeka araçlarının günlük tasarım ve prototipleme iş akışlarına entegrasyonu.' },
        { title: 'Yaratıcı Telif Hakları', subs: ['Sanatta Etik', 'Fikri Mülkiyet', 'Telif Yasaları'], desc: 'Yapay zeka tarafından üretilen tasarımların yasal statüsü, telif hakları ve etik kurallar.' },
        { title: 'Geleceğin Sanatı', subs: ['Dijital Sergi', 'Prompting', 'Hibrid Formlar'], desc: 'Tasarımcı ve yapay zeka ortaklığında gelişen yeni nesil hibrid sanat ve dijital sergiler.' },
      ],
    },
    {
      id: 'web3', title: 'Web3 &\nTeknolojiler', sub: 'Web3 & Future',
      children: [
        { title: 'Merkeziyetsiz Tasarım', subs: ['Web3 UX', 'Cüzdan Entegrasyonu', 'DApp Arayüzü'], desc: 'Blockchain tabanlı cüzdan entegrasyonlarında akıcı kullanıcı deneyimi ve arayüz tasarımı.' },
        { title: 'Metaverse & 3D', subs: ['Spatial Design', 'Blender', 'Spline 3D'], desc: 'Tarayıcı tabanlı interaktif 3D deneyimler ve metaverse evrenleri için uzamsal tasarım.' },
        { title: 'Blockchain & NFT', subs: ['Dijital Koleksiyon', 'Akıllı Sözleşme', 'Topluluk'], desc: 'NFT projeleri, akıllı sözleşme arayüzleri ve Web3 topluluklarına özel kullanıcı akışları.' },
        { title: 'Yenilikçi Arayüzler', subs: ['AR/VR Deneyimleri', 'Giyilebilir Cihaz', 'Gelecek Senaryoları'], desc: 'Genişletilmiş gerçeklik (XR), giyilebilir teknolojiler ve geleceğin dijital arayüz modelleri.' },
      ],
    },
  ],
  en: [
    {
      id: 'ux', title: 'User\nExperience', sub: 'UX/UI Design',
      children: [
        { title: 'Experience Analysis', subs: ['UX Research', 'Usability', 'Persona Analysis'], desc: 'User behavior models, usability principles, and qualitative/quantitative research methodologies in modern interfaces.' },
        { title: 'Interface Design', subs: ['Figma Prototyping', 'Design Systems', 'Micro-Interactions'], desc: 'Pixel-perfect component designs, prototyping, and establishing a consistent design language with Figma.' },
        { title: 'Accessibility (A11y)', subs: ['W3C Standards', 'Inclusive Design', 'Contrast & Reading'], desc: 'Designing digital interfaces that are accessible, inclusive, and compliant with international standards for all users.' },
        { title: 'Usability Testing', subs: ['Eye Tracking', 'A/B Testing', 'Feedback'], desc: 'Analyzing bottleneck points in interfaces using user testing and eye tracking data.' },
      ],
    },
    {
      id: 'brand', title: 'Brand &\nIdentity', sub: 'Branding & Logo',
      children: [
        { title: 'Visual Identity', subs: ['Logo Design', 'Typography', 'Color Theory'], desc: 'Designing visual worlds required for brands to express themselves correctly in the digital age.' },
        { title: 'Brand Storytelling', subs: ['Storytelling', 'Tone of Voice', 'Content Strategy'], desc: 'Conveying the brand\'s story, values, and mission to audiences with compelling and fluent copywriting.' },
        { title: 'Positioning', subs: ['Market Analysis', 'Competitor Analysis', 'Brand Equity'], desc: 'Determining the unique position of the brand in the market and building competitive strength.' },
        { title: 'Digital PR & Promotion', subs: ['Social Media', 'Viral Campaign', 'Awareness'], desc: 'Viral campaigns, promotion strategies, and digital PR work that make a splash on social platforms.' },
      ],
    },
    {
      id: 'ai', title: 'AI &\nArt', sub: 'AI & Art',
      children: [
        { title: 'Generative Visuals', subs: ['Midjourney', 'Stable Diffusion', 'DALL-E'], desc: 'Techniques for generating inspiring visual content in design processes using generative AI tools.' },
        { title: 'AI-Powered Design', subs: ['Workflow', 'Smart Interfaces', 'Templating'], desc: 'Integrating artificial intelligence tools into daily design and prototyping workflows.' },
        { title: 'Creative Copyrights', subs: ['Ethics in Art', 'Intellectual Property', 'Copyright Laws'], desc: 'The legal status, copyrights, and ethical rules of designs produced by artificial intelligence.' },
        { title: 'Future of Art', subs: ['Digital Exhibition', 'Prompting', 'Hybrid Forms'], desc: 'Next-generation hybrid art and digital exhibitions developing in partnership with designers and AI.' },
      ],
    },
    {
      id: 'web3', title: 'Web3 &\nTechnologies', sub: 'Web3 & Future',
      children: [
        { title: 'Decentralized Design', subs: ['Web3 UX', 'Wallet Integration', 'DApp UI'], desc: 'Smooth user experience and interface design in blockchain-based wallet integrations.' },
        { title: 'Metaverse & 3D', subs: ['Spatial Design', 'Blender', 'Spline 3D'], desc: 'Browser-based interactive 3D experiences and spatial design for metaverse universes.' },
        { title: 'Blockchain & NFT', subs: ['Digital Collectibles', 'Smart Contracts', 'Community'], desc: 'NFT projects, smart contract interfaces, and user flows specific to Web3 communities.' },
        { title: 'Innovative Interfaces', subs: ['AR/VR Experiences', 'Wearables', 'Future Scenarios'], desc: 'Extended reality (XR), wearable technologies, and future digital interface models.' },
      ],
    },
  ],
};

function LeafNode({ sub, color }) {
  return (
    <div
      className="px-2.5 py-1 rounded text-[10px] font-medium border"
      style={{ background: color.light, borderColor: color.border, color: color.accent }}
    >
      {sub}
    </div>
  );
}

function ChildNode({ child, color, dark }) {
  const [open, setOpen] = useState(false);
  const { language } = useLanguage();

  return (
    <div className="flex flex-col items-center">
      {/* Connector line from parent */}
      <div className="w-px h-5" style={{ background: color.border }} />

      {/* Child card */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full max-w-[200px] rounded border px-3 py-2.5 text-center transition-all duration-200 cursor-pointer"
        style={{
          background: open ? color.bg : dark ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.8)',
          borderColor: open ? color.accent : dark ? 'rgba(255,255,255,0.20)' : 'rgba(10,10,12,0.15)',
          boxShadow: open ? `0 0 16px ${color.accent}33` : 'none',
        }}
      >
        <div className="flex items-center justify-between gap-2">
          <span
            className="font-fraunces text-xs font-bold text-left leading-tight"
            style={{ color: open ? color.accent : dark ? 'rgba(250,247,242,0.85)' : 'rgba(10,10,12,0.85)' }}
          >
            {child.title}
          </span>
          <div
            className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
            style={{ background: color.bg, borderColor: color.border, border: '1px solid' }}
          >
            {open
              ? <Minus className="w-2 h-2" style={{ color: color.accent }} />
              : <Plus className="w-2 h-2" style={{ color: color.accent }} />
            }
          </div>
        </div>
      </button>

      {/* Expanded detail */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden w-full max-w-[200px]"
          >
            {/* Connector */}
            <div className="flex justify-center">
              <div className="w-px h-3" style={{ background: color.border }} />
            </div>
            <div
              className="rounded border p-3 text-left"
              style={{ background: color.bg, borderColor: color.border }}
            >
              <p className="text-[11px] leading-relaxed mb-3" style={{ color: dark ? 'rgba(250,247,242,0.6)' : 'rgba(10,10,12,0.6)' }}>
                {child.desc}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                {child.subs.map((s, i) => (
                  <LeafNode key={i} sub={s} color={color} />
                ))}
              </div>
              <a
                href="/iletisim"
                className="inline-flex items-center gap-1 text-[10px] font-semibold transition-opacity hover:opacity-70"
                style={{ color: color.accent }}
              >
                {language === 'tr' ? 'İletişim' : 'Contact'}
                <ArrowRight className="w-2.5 h-2.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RootBranch({ root, color, dark, isActive, onToggle }) {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Root node */}
      <button
        onClick={onToggle}
        className="w-full rounded border px-4 py-4 text-center transition-all duration-300 cursor-pointer relative overflow-hidden"
        style={{
          background: isActive ? color.accent : dark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.9)',
          borderColor: isActive ? color.accent : dark ? 'rgba(255,255,255,0.25)' : color.border,
          boxShadow: isActive ? `0 0 32px ${color.accent}55` : 'none',
        }}
      >
        <p
          className="text-[10px] tracking-[0.2em] uppercase mb-1.5 font-medium"
          style={{ color: isActive ? 'rgba(255,255,255,0.6)' : color.accent }}
        >
          {root.sub}
        </p>
        <h3
          className="font-fraunces text-sm md:text-base font-bold leading-tight whitespace-pre-line"
          style={{ color: isActive ? '#fff' : dark ? '#FAF7F2' : '#0A0A0C' }}
        >
          {root.title}
        </h3>
        <div
          className="mt-2 text-[10px] font-medium"
          style={{ color: isActive ? 'rgba(255,255,255,0.5)' : color.accent }}
        >
          {isActive ? '▲' : '▼'}
        </div>
      </button>

      {/* Branch expansion */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden w-full"
          >
            {/* Trunk line down */}
            <div className="flex justify-center">
              <div className="w-px h-6" style={{ background: color.accent }} />
            </div>

            {/* Horizontal bar connecting to all children */}
            <div className="relative flex justify-center">
              <div
                className="h-px"
                style={{
                  background: color.accent,
                  width: root.children.length === 4 ? 'calc(100% - 24px)' : '75%',
                }}
              />
            </div>

            {/* Children row */}
            <div className="grid grid-cols-2 gap-2 mt-0">
              {root.children.map((child, i) => (
                <ChildNode key={i} child={child} color={color} dark={dark} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PracticeAreaTree({ dark = true }) {
  const { language } = useLanguage();
  const [activeRoot, setActiveRoot] = useState(null);

  const data = treeData[language] || treeData.tr;

  const toggle = (id) => setActiveRoot(prev => prev === id ? null : id);

  return (
    <div className="w-full">
      {/* Top trunk line connecting all roots */}
      <div className="flex items-end mb-0">
        {data.map((root, i) => (
          <React.Fragment key={root.id}>
            <div className="flex-1 flex flex-col items-center">
              {/* Vertical trunk up */}
              <div className="w-px h-5" style={{ background: COLORS[i].accent, opacity: 0.5 }} />
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Horizontal top connector */}
      <div
        className="h-px mx-12 mb-0"
        style={{ background: `linear-gradient(to right, ${COLORS[0].accent}, ${COLORS[1].accent}, ${COLORS[2].accent}, ${COLORS[3].accent})` }}
      />

      {/* Root nodes */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-0">
        {data.map((root, i) => (
          <div key={root.id} className="flex flex-col items-center">
            {/* Short trunk line */}
            <div className="w-px h-4" style={{ background: COLORS[i].accent }} />
            <RootBranch
              root={root}
              color={COLORS[i]}
              dark={dark}
              isActive={activeRoot === root.id}
              onToggle={() => toggle(root.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}