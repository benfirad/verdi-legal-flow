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
      id: 'ma', title: 'Birleşme &\nDevralmalar', sub: 'M&A',
      children: [
        { title: 'Hukuki Durum Tespiti', subs: ['Sözleşme Analizi', 'Uyum Denetimi', 'Risk Değerlendirmesi'], desc: 'Şirket satın alımlarında kapsamlı due diligence, sözleşme analizi ve uyum denetimleri.' },
        { title: 'Hisse & Varlık Devri', subs: ['SPA Müzakereleri', 'Kapanış İşlemleri', 'Garanti & Tazminat'], desc: 'Hisse devirleri, SPA müzakereleri ve kapanış süreçlerinin yönetimi.' },
        { title: 'Şirket Birleşmeleri', subs: ['Rekabet Bildirimleri', 'Yapısal Çözümler', 'Birleşme Tescili'], desc: 'Birleşme süreçleri, rekabet bildirimleri ve izin prosedürleri.' },
        { title: 'Ortak Girişimler', subs: ['JV Sözleşmeleri', 'Tag/Drag-Along', 'Çıkış Stratejileri'], desc: 'JV anlaşmaları, yönetim yapısı tasarımı ve çıkış mekanizmaları.' },
      ],
    },
    {
      id: 'cm', title: 'Sermaye\nPiyasaları', sub: 'Capital Markets',
      children: [
        { title: 'Halka Arz (IPO)', subs: ['İzahname Hazırlığı', 'SPK Başvuruları', 'Kote Yükümlülükleri'], desc: 'BİST kotasyonu için izahname hazırlığı, SPK onayları ve halka arz danışmanlığı.' },
        { title: 'Tahvil & Sukuk', subs: ['Kira Sertifikaları', 'Eurobond İhraçları', 'İhraç Belgeleri'], desc: 'Borçlanma araçları, kira sertifikaları ve Eurobond ihraç süreçleri.' },
        { title: 'Fon Yönetimi', subs: ['GSYF Kuruluşu', 'GYF Yapılandırması', 'Portföy Uyumu'], desc: 'Yatırım fonu, girişim sermayesi ve gayrimenkul fonlarının kurulumu.' },
        { title: 'SPK Uyumu', subs: ['Özel Durum Açıklamaları', 'Periyodik Raporlama', 'Piyasa Suistimali'], desc: 'Sermaye Piyasası Kanunu kapsamında kamuyu aydınlatma yükümlülükleri.' },
      ],
    },
    {
      id: 'comp', title: 'Rekabet\nHukuku', sub: 'Competition Law',
      children: [
        { title: 'Birleşme Bildirimleri', subs: ['Eşik Analizi', 'Ön Bildirim', 'RK Müzakereleri'], desc: 'Rekabet Kurulu nezdinde birleşme ve devralma izin başvurularının yönetimi.' },
        { title: 'Kartel Soruşturmaları', subs: ['Leniency Başvuruları', 'Soruşturma Savunması', 'Uzlaşma'], desc: 'Fiyat tespiti, pazar paylaşımı ve kartel soruşturmalarında stratejik savunma.' },
        { title: 'Hâkim Durum', subs: ['Pazar Tanımı', 'Sektörel Analizler', 'Davranışsal Taahhütler'], desc: 'Pazar gücü analizi ve hâkim durumun kötüye kullanılması davalarında temsil.' },
        { title: 'Uyum Programları', subs: ['Risk Haritalaması', 'Politika Tasarımı', 'Çalışan Eğitimleri'], desc: 'Rekabet hukuku uyum programlarının tasarımı ve hayata geçirilmesi.' },
      ],
    },
    {
      id: 'corp', title: 'Şirketler\nHukuku', sub: 'Corporate Law',
      children: [
        { title: 'Şirket Kuruluşu', subs: ['Esas Sözleşme', 'Yabancı Yatırım', 'Holding Yapıları'], desc: 'Anonim ve limited şirket kuruluşu, yabancı sermayeli yapılar ve holding organizasyonu.' },
        { title: 'Kurumsal Yönetim', subs: ['YK Sorumluluğu', 'Genel Kurul', 'KY İlkeleri'], desc: 'Yönetim kurulu yapılanması, genel kurul süreçleri ve kurumsal yönetim uyumu.' },
        { title: 'Ortak Anlaşmazlıkları', subs: ['Azınlık Hakları', 'Squeeze-Out', 'Tasfiye'], desc: 'Hissedar uyuşmazlıklarının yargı ve tahkim yoluyla çözümü.' },
        { title: 'Yeniden Yapılandırma', subs: ['Kısmi Bölünme', 'Tam Bölünme', 'Devir Planlaması'], desc: 'Grup şirketleri yeniden yapılandırması ve bölünme işlemlerinin hukuki yönetimi.' },
      ],
    },
  ],
  en: [
    {
      id: 'ma', title: 'Mergers &\nAcquisitions', sub: 'M&A',
      children: [
        { title: 'Legal Due Diligence', subs: ['Contract Analysis', 'Compliance Audit', 'Risk Assessment'], desc: 'Comprehensive due diligence, contract analysis and compliance audits in acquisitions.' },
        { title: 'Share & Asset Transfer', subs: ['SPA Negotiations', 'Closing Procedures', 'Warranties'], desc: 'Share transfers, SPA negotiations and management of closing processes.' },
        { title: 'Company Mergers', subs: ['Competition Filings', 'Structural Remedies', 'Registration'], desc: 'Merger processes, competition filings and permit procedures.' },
        { title: 'Joint Ventures', subs: ['JV Agreements', 'Tag/Drag-Along', 'Exit Strategies'], desc: 'JV agreements, governance structure design and exit mechanisms.' },
      ],
    },
    {
      id: 'cm', title: 'Capital\nMarkets', sub: 'Capital Markets',
      children: [
        { title: 'IPO & Listings', subs: ['Prospectus', 'CMB Applications', 'Listing Obligations'], desc: 'Prospectus preparation, CMB approvals and IPO advisory for BIST listings.' },
        { title: 'Bonds & Sukuk', subs: ['Lease Certificates', 'Eurobonds', 'Issuance Docs'], desc: 'Debt instruments, lease certificates and Eurobond issuance processes.' },
        { title: 'Fund Management', subs: ['VC Fund Setup', 'REIT Structuring', 'Portfolio Compliance'], desc: 'Investment funds, venture capital and real estate fund establishment.' },
        { title: 'CMB Compliance', subs: ['Material Disclosures', 'Periodic Reporting', 'Market Abuse'], desc: 'Public disclosure obligations under the Capital Markets Law.' },
      ],
    },
    {
      id: 'comp', title: 'Competition\nLaw', sub: 'Competition Law',
      children: [
        { title: 'Merger Notifications', subs: ['Threshold Analysis', 'Pre-notification', 'TCA Negotiations'], desc: 'Clearance applications before the Competition Authority.' },
        { title: 'Cartel Investigations', subs: ['Leniency', 'Investigation Defense', 'Settlement'], desc: 'Strategic defense in cartel investigations.' },
        { title: 'Dominance', subs: ['Market Definition', 'Sector Analyses', 'Commitments'], desc: 'Market power analysis and abuse of dominance cases.' },
        { title: 'Compliance Programs', subs: ['Risk Mapping', 'Policy Design', 'Employee Training'], desc: 'Company-specific competition law compliance programs.' },
      ],
    },
    {
      id: 'corp', title: 'Corporate\nLaw', sub: 'Corporate Law',
      children: [
        { title: 'Company Formation', subs: ['Articles of Association', 'Foreign Investment', 'Holding'], desc: 'Incorporation, foreign capital structures and holding organizations.' },
        { title: 'Corporate Governance', subs: ['Board Liability', 'General Assembly', 'CG Principles'], desc: 'Board structure, general assembly and corporate governance compliance.' },
        { title: 'Shareholder Disputes', subs: ['Minority Rights', 'Squeeze-Out', 'Dissolution'], desc: 'Shareholder dispute resolution through litigation and arbitration.' },
        { title: 'Restructuring', subs: ['Partial Spin-Off', 'Full Spin-Off', 'Transfer Planning'], desc: 'Group company restructuring and spin-off transactions.' },
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