import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, X, GraduationCap, Scale, Globe, Filter, ChevronDown, Search } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { teamMembers, POSITIONS, PRACTICE_AREAS } from '@/lib/teamData';

function MemberCard({ member, onClick }) {
  const { language } = useLanguage();
  const title = language === 'tr' ? member.titleTr : member.titleEn;

  return (
    <motion.button
      onClick={() => onClick(member)}
      className="group text-left bg-white border border-[#D6DCE0] hover:border-[#5A7A8C]/60 transition-all"
      whileHover={{ y: -4, scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      <div className="aspect-square overflow-hidden bg-[#C8CFD3]">
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          className="h-full w-full object-cover grayscale transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-hover:grayscale-0"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement.innerHTML = `<div class="flex h-full w-full items-center justify-center bg-[#C8CFD3] font-fraunces text-3xl text-[#5A7A8C]">${member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</div>`;
          }}
        />
      </div>
      <div className="border-t border-[#D6DCE0] p-5">
        <h3 className="font-fraunces text-lg font-semibold text-[#1A2530] leading-tight">{member.name}</h3>
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#5A7A8C]">{title}</p>
        <div className="mt-4 flex items-center gap-3 text-[#A8B0B5]">
          <a
            href={`mailto:${member.email}`}
            onClick={(e) => e.stopPropagation()}
            className="hover:text-[#1A2530] transition"
            aria-label={`Email ${member.name}`}
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.button>
  );
}

function MemberModal({ member, onClose }) {
  const { language } = useLanguage();
  const title = language === 'tr' ? member.titleTr : member.titleEn;
  const memberAreaLabels = member.practiceAreas
    .map((id) => PRACTICE_AREAS.find((p) => p.id === id))
    .filter(Boolean)
    .map((p) => p[language]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="relative z-10 w-full max-w-3xl bg-white border border-[#C8CFD3] overflow-hidden max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 24 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center border border-[#C8CFD3] text-[#4D5660] hover:text-[#1A2530] hover:border-[#5A7A8C]/60 transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid md:grid-cols-5">
          <div className="md:col-span-2 bg-[#C8CFD3]">
            <div className="aspect-square md:aspect-auto md:h-full overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.innerHTML = `<div class="flex h-full w-full items-center justify-center bg-[#C8CFD3] font-fraunces text-6xl text-[#5A7A8C]">${member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</div>`;
                }}
              />
            </div>
          </div>

          <div className="md:col-span-3 p-7 md:p-9 text-[#1A2530]">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#5A7A8C]">{title}</p>
            <h2 className="mt-2 font-fraunces text-2xl md:text-3xl font-semibold text-[#1A2530]">{member.name}</h2>
            {member.bar && <p className="mt-1 text-sm text-[#4D5660]">{member.bar}</p>}

            {memberAreaLabels.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Scale className="w-4 h-4 text-[#5A7A8C]" />
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#5A7A8C]">
                    {language === 'tr' ? 'Çalışma Alanları' : 'Practice Areas'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {memberAreaLabels.map((a, i) => (
                    <span key={i} className="text-xs px-3 py-1.5 bg-[#E8ECEF] border border-[#C8CFD3] text-[#4D5660]">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="w-4 h-4 text-[#5A7A8C]" />
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#5A7A8C]">
                  {language === 'tr' ? 'Eğitim' : 'Education'}
                </span>
              </div>
              <ul className="space-y-1.5">
                {member.education.map((edu, i) => (
                  <li key={i} className="text-sm text-[#4D5660] flex items-start gap-2">
                    <span className="mt-2 w-1 h-1 rounded-full bg-[#5A7A8C] shrink-0" />
                    {edu}
                  </li>
                ))}
              </ul>
            </div>

            {member.languages?.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-4 h-4 text-[#5A7A8C]" />
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#5A7A8C]">
                    {language === 'tr' ? 'Diller' : 'Languages'}
                  </span>
                </div>
                <p className="text-sm text-[#4D5660]">{member.languages.join(' · ')}</p>
              </div>
            )}

            <div className="mt-7 pt-6 border-t border-[#D6DCE0] flex flex-col sm:flex-row gap-3">
              <a
                href={`mailto:${member.email}`}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-[#1A2530] text-white text-sm font-medium hover:bg-[#3a3a3a] transition"
              >
                <Mail className="w-4 h-4" />
                {member.email}
              </a>
              <a
                href={`tel:${member.phone.replace(/\s/g, '')}`}
                className="flex items-center justify-center gap-2 px-5 py-3 border border-[#C8CFD3] text-sm text-[#4D5660] hover:border-[#5A7A8C]/60 hover:text-[#1A2530] transition"
              >
                <Phone className="w-4 h-4" />
                {member.phone}
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TeamPage() {
  const { language } = useLanguage();
  const [selected, setSelected] = useState(null);
  const [positionFilter, setPositionFilter] = useState('all');
  const [areaFilter, setAreaFilter] = useState('all');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [query, setQuery] = useState('');

  // ESC ile drawer kapat + body scroll kilidi
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setDrawerOpen(false); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [drawerOpen]);

  const positionCounts = useMemo(() => {
    const counts = { all: teamMembers.length };
    POSITIONS.forEach((p) => {
      counts[p.id] = teamMembers.filter((m) => m.position === p.id).length;
    });
    return counts;
  }, []);

  const areaCounts = useMemo(() => {
    const counts = { all: teamMembers.length };
    PRACTICE_AREAS.forEach((a) => {
      counts[a.id] = teamMembers.filter((m) => m.practiceAreas.includes(a.id)).length;
    });
    return counts;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('tr');
    return teamMembers.filter((m) => {
      if (positionFilter !== 'all' && m.position !== positionFilter) return false;
      if (areaFilter !== 'all' && !m.practiceAreas.includes(areaFilter)) return false;
      if (q) {
        const title = `${m.titleTr} ${m.titleEn}`.toLocaleLowerCase('tr');
        const haystack = `${m.name.toLocaleLowerCase('tr')} ${title} ${m.email}`;
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [positionFilter, areaFilter, query]);

  // Pozisyon bazında gruplandır
  const grouped = useMemo(() => {
    return POSITIONS.map((p) => ({
      position: p,
      members: filtered.filter((m) => m.position === p.id),
    })).filter((g) => g.members.length > 0);
  }, [filtered]);

  return (
    <div className="min-h-screen bg-[#E8ECEF] text-[#1A2530]">
      <Navbar />

      {/* Hero (stack layer 1) */}
      <section data-nav-theme="light" className="sticky top-0 z-10 bg-white border-b border-[#C8CFD3]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-36 pb-16">
          <h1 className="mt-6 font-fraunces text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.15] text-[#1A2530]">
            {language === 'tr' ? 'Verdi ekibiyle tanışın.' : 'Meet the Verdi team.'}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[#4D5660]">
            {language === 'tr'
              ? 'Deneyimli avukat, danışman ve stajyer kadromuzla müvekkillerimize geniş bir uzmanlık yelpazesinde hizmet veriyoruz.'
              : 'With our experienced team of attorneys, advisors and trainees, we serve our clients across a broad spectrum of expertise.'}
          </p>

          {/* Kişi arama */}
          <div className="mt-10 max-w-xl">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5A7A8C]" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={language === 'tr' ? 'İsim veya ünvan ara…' : 'Search by name or title…'}
                className="w-full bg-[#F4F6F8] border border-[#C8CFD3] pl-11 pr-12 py-3.5 text-sm text-[#1A2530] placeholder:text-[#7A8590] focus:outline-none focus:border-[#5A7A8C] focus:ring-2 focus:ring-[#5A7A8C]/20 transition"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center text-[#7A8590] hover:text-[#1A2530] transition"
                  aria-label="Clear"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </label>
          </div>
        </div>
      </section>

      {/* Filtre bölümü (stack layer 2) */}
      <section data-nav-theme="light" className="relative z-20 border-b border-[#C8CFD3] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.15)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 grid gap-8 lg:grid-cols-2 lg:items-start">
          {/* Pozisyon — bölümlü buton */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#5A7A8C] mb-4">
              {language === 'tr' ? 'Pozisyon' : 'Position'}
            </p>
            <div className="flex w-full border border-[#C8CFD3] divide-x divide-[#C8CFD3]">
              <PositionTab
                active={positionFilter === 'all'}
                onClick={() => setPositionFilter('all')}
                label={language === 'tr' ? 'Tümü' : 'All'}
                count={positionCounts.all}
              />
              {POSITIONS.map((p) => (
                <PositionTab
                  key={p.id}
                  active={positionFilter === p.id}
                  onClick={() => setPositionFilter(p.id)}
                  label={p[language]}
                  count={positionCounts[p.id]}
                />
              ))}
            </div>
            <p className="mt-2 text-xs text-[#A8B0B5]">
              {language === 'tr'
                ? `${filtered.length} kişi gösteriliyor`
                : `${filtered.length} people shown`}
            </p>
          </div>

          {/* Çalışma Alanı — drawer trigger */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#5A7A8C] mb-4">
              {language === 'tr' ? 'Çalışma Alanı' : 'Practice Area'}
            </p>
            <button
              onClick={() => setDrawerOpen(true)}
              className="group flex items-center justify-between gap-4 w-full border border-[#C8CFD3] bg-white px-5 py-3.5 text-sm transition hover:border-[#5A7A8C]/60 h-[58px]"
            >
              <span className="flex items-center gap-3 min-w-0">
                <Filter className="h-4 w-4 text-[#5A7A8C] shrink-0" />
                <span className="text-[#1A2530] font-medium truncate">
                  {areaFilter === 'all'
                    ? (language === 'tr' ? 'Tüm Alanlar' : 'All Areas')
                    : (PRACTICE_AREAS.find((a) => a.id === areaFilter)?.[language] || '')}
                </span>
                {areaFilter !== 'all' && (
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      setAreaFilter('all');
                    }}
                    className="ml-1 inline-flex items-center justify-center h-5 w-5 rounded-full bg-[#5A7A8C]/10 text-[#5A7A8C] hover:bg-[#5A7A8C]/20 shrink-0"
                  >
                    <X className="h-3 w-3" />
                  </span>
                )}
              </span>
              <ChevronDown className="h-4 w-4 text-[#A8B0B5] transition group-hover:translate-y-0.5 shrink-0" />
            </button>
            <p className="mt-2 text-xs text-[#A8B0B5]">
              {language === 'tr'
                ? `${PRACTICE_AREAS.filter((a) => areaCounts[a.id] > 0).length} alan mevcut`
                : `${PRACTICE_AREAS.filter((a) => areaCounts[a.id] > 0).length} areas available`}
            </p>
          </div>
        </div>
      </section>

      {/* Çalışma Alanı Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <AreaFilterDrawer
            language={language}
            areaFilter={areaFilter}
            setAreaFilter={setAreaFilter}
            areaCounts={areaCounts}
            onClose={() => setDrawerOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Grup-grup üyeler (stack layer 3) */}
      <section data-nav-theme="light" className="relative z-30 bg-[#E8ECEF] shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.15)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        {grouped.length === 0 && (
          <p className="text-center text-[#4D5660] py-16">
            {language === 'tr' ? 'Bu filtreye uygun üye bulunamadı.' : 'No team members match this filter.'}
          </p>
        )}

        {grouped.map((group) => (
          <div key={group.position.id} className="mb-16 last:mb-0">
            <div className="mb-8 flex items-baseline gap-4">
              <h2 className="font-fraunces text-2xl md:text-3xl font-semibold text-[#1A2530]">
                {group.position[language]}
              </h2>
              <span className="text-sm text-[#A8B0B5]">{group.members.length}</span>
              <div className="flex-1 h-px bg-[#C8CFD3]" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {group.members.map((m) => (
                <MemberCard key={m.id} member={m} onClick={setSelected} />
              ))}
            </div>
          </div>
        ))}
        </div>
      </section>

      <div className="relative z-40">
        <Footer />
      </div>

      <AnimatePresence>
        {selected && <MemberModal member={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}

function PositionTab({ active, onClick, label, count }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 px-3 py-4 text-sm transition ${
        active
          ? 'bg-[#1A2530] text-white'
          : 'bg-white text-[#4D5660] hover:bg-[#E8ECEF] hover:text-[#1A2530]'
      }`}
    >
      <span className="font-medium">{label}</span>
      <span className={`text-xs font-mono ${active ? 'text-white/60' : 'text-[#A8B0B5]'}`}>
        {count}
      </span>
    </button>
  );
}

function FilterChip({ active, onClick, label, count }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 border px-4 py-2 text-sm transition ${
        active
          ? 'bg-[#1A2530] text-white border-[#1A2530]'
          : 'bg-white text-[#4D5660] border-[#C8CFD3] hover:border-[#5A7A8C]/60 hover:text-[#1A2530]'
      }`}
    >
      {label}
      <span className={`text-xs ${active ? 'text-white/60' : 'text-[#A8B0B5]'}`}>{count}</span>
    </button>
  );
}

function AreaFilterDrawer({ language, areaFilter, setAreaFilter, areaCounts, onClose }) {
  const visibleAreas = PRACTICE_AREAS.filter((a) => areaCounts[a.id] > 0);

  return (
    <motion.div
      className="fixed inset-0 z-[110]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer paneli (sağdan) */}
      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-6 border-b border-[#C8CFD3]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#5A7A8C]">
              {language === 'tr' ? 'Filtre' : 'Filter'}
            </p>
            <h3 className="mt-2 font-fraunces text-xl font-semibold text-[#1A2530]">
              {language === 'tr' ? 'Çalışma Alanı' : 'Practice Area'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center border border-[#C8CFD3] text-[#4D5660] hover:text-[#1A2530] hover:border-[#5A7A8C]/60 transition"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Liste */}
        <div className="flex-1 overflow-y-auto px-7 py-6">
          <ul className="space-y-1">
            {/* Tümü */}
            <li>
              <button
                onClick={() => { setAreaFilter('all'); onClose(); }}
                className={`w-full flex items-center justify-between gap-4 px-4 py-3.5 text-left transition ${
                  areaFilter === 'all'
                    ? 'bg-[#5A7A8C] text-white'
                    : 'text-[#1A2530] hover:bg-[#E8ECEF]'
                }`}
              >
                <span className="text-sm font-medium">
                  {language === 'tr' ? 'Tüm Alanlar' : 'All Areas'}
                </span>
                <span className={`text-xs font-mono ${areaFilter === 'all' ? 'text-white/70' : 'text-[#A8B0B5]'}`}>
                  {areaCounts.all}
                </span>
              </button>
            </li>

            {visibleAreas.map((a) => {
              const isActive = areaFilter === a.id;
              return (
                <li key={a.id}>
                  <button
                    onClick={() => { setAreaFilter(a.id); onClose(); }}
                    className={`w-full flex items-center justify-between gap-4 px-4 py-3.5 text-left transition ${
                      isActive
                        ? 'bg-[#5A7A8C] text-white'
                        : 'text-[#1A2530] hover:bg-[#E8ECEF]'
                    }`}
                  >
                    <span className="text-sm">{a[language]}</span>
                    <span className={`text-xs font-mono ${isActive ? 'text-white/70' : 'text-[#A8B0B5]'}`}>
                      {areaCounts[a.id]}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Footer */}
        <div className="px-7 py-5 border-t border-[#C8CFD3] flex items-center justify-between">
          <button
            onClick={() => { setAreaFilter('all'); onClose(); }}
            className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4D5660] hover:text-[#1A2530] transition"
          >
            {language === 'tr' ? 'Temizle' : 'Clear'}
          </button>
          <button
            onClick={onClose}
            className="bg-ink text-white text-xs font-semibold uppercase tracking-[0.18em] px-6 py-3 hover:bg-ink/90 transition"
          >
            {language === 'tr' ? 'Kapat' : 'Close'}
          </button>
        </div>
      </motion.aside>
    </motion.div>
  );
}
