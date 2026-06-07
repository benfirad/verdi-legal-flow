import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Play, CheckCircle2, Circle, Clock, ChevronRight, Zap,
  RotateCcw, ArrowRight, Terminal, Wifi, Lock, FileSearch,
  Users, MessageSquare, BarChart3, Award, AlertCircle
} from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// ─── Scenario data ──────────────────────────────────────────
const scenarios = {
  tr: [
    {
      id: 'commercial',
      label: 'Ticari Uyuşmazlık',
      icon: '⚖️',
      color: 'from-blue-600/20 to-cobalt/5',
      accent: '#1E3A8A',
      desc: 'Sözleşme ihlali veya ticari alacak davası',
      steps: [
        { id: 1, title: 'İlk Değerlendirme', icon: MessageSquare, duration: '24 saat', detail: 'Müvekkil ile gizli görüşme yapılır. Dava konusu, talepler ve mevcut belgeler incelenir.', log: ['bağlantı kuruldu...', 'müvekkil bilgileri alınıyor...', 'gizlilik protokolü aktif', 'değerlendirme başlatıldı ✓'] },
        { id: 2, title: 'Dosya & Belge Analizi', icon: FileSearch, duration: '2-5 gün', detail: 'Sözleşmeler, yazışmalar ve finansal belgeler hukuki açıdan taranır. Güçlü ve zayıf yanlar tespit edilir.', log: ['belgeler taranıyor...', 'hukuki veritabanı sorgulanıyor...', 'risk analizi çalışıyor...', 'rapor oluşturuluyor ✓'] },
        { id: 3, title: 'Strateji Belirleme', icon: BarChart3, duration: '1-3 gün', detail: 'İki aşamalı strateji: önce uzlaşma teklifi, ardından dava yolu. Maliyet-fayda analizi yapılır.', log: ['senaryo modelleniyor...', 'uzlaşma olasılığı: %67', 'dava süresi tahmini: 14 ay', 'strateji onaylandı ✓'] },
        { id: 4, title: 'Müzakere & Uzlaşma', icon: Users, duration: '2-4 hafta', detail: 'Karşı tarafla müzakere sürecine girilir. Protokol hazırlanır ve noter onayına sunulur.', log: ['karşı taraf bilgilendiriliyor...', 'teklif iletildi', 'müzakere başladı...', 'uzlaşma sağlandı ✓'] },
        { id: 5, title: 'Sonuç & Raporlama', icon: Award, duration: 'Kapanış', detail: 'Tüm işlemler raporlanır. Müvekkile kapsamlı sonuç dosyası ve gelecek öneriler teslim edilir.', log: ['belgeler arşivleniyor...', 'sonuç raporu hazırlanıyor...', 'müvekkil bilgilendiriliyor...', 'dosya kapatıldı ✓'] },
      ]
    },
    {
      id: 'corporate',
      label: 'Şirket Kuruluşu',
      icon: '🏢',
      color: 'from-emerald-600/20 to-emerald-900/5',
      accent: '#059669',
      desc: 'Anonim veya limited şirket kurulum süreci',
      steps: [
        { id: 1, title: 'İhtiyaç Analizi', icon: MessageSquare, duration: '1 gün', detail: 'Şirket türü, ortak yapısı, sermaye ve faaliyet alanı belirlenir. En uygun tüzel kişilik yapısı seçilir.', log: ['gereksinimler analiz ediliyor...', 'ortak sayısı: teyit bekleniyor', 'sermaye yapısı: hesaplanıyor...', 'optimum yapı belirlendi ✓'] },
        { id: 2, title: 'Ana Sözleşme Taslağı', icon: FileSearch, duration: '2-3 gün', detail: 'TTK\'ya uygun ana sözleşme hazırlanır. İmtiyazlı pay yapıları ve yönetim organları düzenlenir.', log: ['TTK veritabanı taranıyor...', 'şablon oluşturuluyor...', 'uyumluluk kontrolü...', 'sözleşme onaylandı ✓'] },
        { id: 3, title: 'Sicil & Tescil', icon: Lock, duration: '3-5 gün', detail: 'Ticaret Sicili Müdürlüğü\'ne başvuru yapılır. Tescil ve ilan işlemleri takip edilir.', log: ['başvuru dosyası hazırlanıyor...', 'MERSİS sistemi bağlanıyor...', 'evraklar iletildi', 'tescil onaylandı ✓'] },
        { id: 4, title: 'Vergi & SGK Kaydı', icon: BarChart3, duration: '2-3 gün', detail: 'Vergi dairesi mükellefiyet tesisi, SGK işyeri kaydı ve ilk KDV beyannamesi hazırlıkları yapılır.', log: ['vergi numarası alınıyor...', 'SGK bildirimi gönderildi', 'e-fatura aktivasyonu...', 'kayıtlar tamamlandı ✓'] },
        { id: 5, title: 'Teslim & Devir', icon: Award, duration: 'Kapanış', detail: 'Tüm kuruluş belgeleri, sicil özeti ve hukuki uyum raporu müvekkile teslim edilir.', log: ['evrak seti hazırlanıyor...', 'dijital kopya oluşturuluyor...', 'müvekkil bilgilendiriliyor...', 'kuruluş tamamlandı ✓'] },
      ]
    },
    {
      id: 'arbitration',
      label: 'Uluslararası Tahkim',
      icon: '🌐',
      color: 'from-purple-600/20 to-purple-900/5',
      accent: '#7C3AED',
      desc: 'ICC veya İSTAC tahkim davası süreci',
      steps: [
        { id: 1, title: 'Tahkim Şartı Analizi', icon: FileSearch, duration: '2-3 gün', detail: 'Sözleşmedeki tahkim klozunun geçerliliği ve seçilen kurumun kuralları incelenir. Taraf ehliyeti teyit edilir.', log: ['sözleşme taranıyor...', 'tahkim şartı tespit edildi', 'ICC/İSTAC kuralları: yükleniyor...', 'ehliyet onaylandı ✓'] },
        { id: 2, title: 'Hakem Seçimi', icon: Users, duration: '2-4 hafta', detail: 'Uyuşmazlığın niteliğine göre teknik ve hukuki uzmanlığa sahip hakemler belirlenir. Bağımsızlık beyanları alınır.', log: ['hakem havuzu taranıyor...', 'uzmanlık eşleştiriliyor...', 'bağımsızlık kontrolü...', 'hakem kurulu oluştu ✓'] },
        { id: 3, title: 'Dava Dilekçesi', icon: Terminal, duration: '1-2 hafta', detail: 'Talep edilen tazminat, delil listesi ve hukuki argümanlar detaylandırılarak Statement of Claim hazırlanır.', log: ['argümanlar yapılandırılıyor...', 'delil kataloğu: derleniyor...', 'hukuki dayanak: onaylandı', 'dilekçe teslim edildi ✓'] },
        { id: 4, title: 'Duruşma Süreci', icon: BarChart3, duration: '3-12 ay', detail: 'Belge üretimi, tanık ifadeleri ve bilirkişi raporları aşamaları yönetilir. Nihai duruşmada sözlü savunma yapılır.', log: ['belge üretimi: başlatıldı', 'tanık ifadeleri: alınıyor...', 'bilirkişi raporu: bekleniyor...', 'duruşma tamamlandı ✓'] },
        { id: 5, title: 'Karar & İcra', icon: Award, duration: 'Kapanış', detail: 'Tahkim kararı tebliğ edilir. Yabancı ülkede icra gerekiyorsa New York Konvansiyonu kapsamında işlem yapılır.', log: ['karar tebliğ edildi', 'icra analizi yapılıyor...', 'NY Konvansiyonu: aktif', 'dava sonuçlandı ✓'] },
      ]
    },
  ],
  en: [
    {
      id: 'commercial',
      label: 'Commercial Dispute',
      icon: '⚖️',
      color: 'from-blue-600/20 to-cobalt/5',
      accent: '#1E3A8A',
      desc: 'Contract breach or commercial debt litigation',
      steps: [
        { id: 1, title: 'Initial Assessment', icon: MessageSquare, duration: '24 hours', detail: 'A confidential meeting is held with the client. The subject of the case, claims and available documents are reviewed.', log: ['connection established...', 'retrieving client information...', 'confidentiality protocol active', 'assessment initiated ✓'] },
        { id: 2, title: 'File & Document Analysis', icon: FileSearch, duration: '2-5 days', detail: 'Contracts, correspondence and financial documents are legally scanned. Strengths and weaknesses are identified.', log: ['scanning documents...', 'querying legal database...', 'risk analysis running...', 'report generated ✓'] },
        { id: 3, title: 'Strategy Formulation', icon: BarChart3, duration: '1-3 days', detail: 'Two-phase strategy: first a settlement offer, then litigation. Cost-benefit analysis is conducted.', log: ['modeling scenario...', 'settlement probability: 67%', 'litigation estimate: 14 months', 'strategy approved ✓'] },
        { id: 4, title: 'Negotiation & Settlement', icon: Users, duration: '2-4 weeks', detail: 'Negotiation process begins with the opposing party. Protocol is prepared and submitted for notary approval.', log: ['notifying opposing party...', 'offer transmitted', 'negotiation started...', 'settlement reached ✓'] },
        { id: 5, title: 'Result & Reporting', icon: Award, duration: 'Closing', detail: 'All proceedings are documented. A comprehensive outcome file and future recommendations are delivered to the client.', log: ['archiving documents...', 'preparing outcome report...', 'notifying client...', 'file closed ✓'] },
      ]
    },
    {
      id: 'corporate',
      label: 'Company Formation',
      icon: '🏢',
      color: 'from-emerald-600/20 to-emerald-900/5',
      accent: '#059669',
      desc: 'Joint-stock or limited company setup process',
      steps: [
        { id: 1, title: 'Needs Analysis', icon: MessageSquare, duration: '1 day', detail: 'Company type, shareholder structure, capital and field of activity are determined. The most suitable legal entity structure is selected.', log: ['analyzing requirements...', 'shareholder count: awaiting confirmation', 'capital structure: calculating...', 'optimal structure determined ✓'] },
        { id: 2, title: 'Articles of Association Draft', icon: FileSearch, duration: '2-3 days', detail: 'Articles of association compliant with the TCC are prepared. Preferred share structures and management bodies are regulated.', log: ['scanning TCC database...', 'generating template...', 'compliance check...', 'articles approved ✓'] },
        { id: 3, title: 'Registry & Registration', icon: Lock, duration: '3-5 days', detail: 'Application is made to the Trade Registry Directorate. Registration and announcement proceedings are followed up.', log: ['preparing application file...', 'connecting MERSİS system...', 'documents transmitted', 'registration approved ✓'] },
        { id: 4, title: 'Tax & SGK Registration', icon: BarChart3, duration: '2-3 days', detail: 'Tax office liability registration, SGK workplace registration and first VAT return preparations are carried out.', log: ['obtaining tax number...', 'SGK notification sent', 'e-invoice activation...', 'registrations completed ✓'] },
        { id: 5, title: 'Delivery & Handover', icon: Award, duration: 'Closing', detail: 'All formation documents, registry summary and legal compliance report are delivered to the client.', log: ['preparing document set...', 'creating digital copy...', 'notifying client...', 'formation completed ✓'] },
      ]
    },
    {
      id: 'arbitration',
      label: 'International Arbitration',
      icon: '🌐',
      color: 'from-purple-600/20 to-purple-900/5',
      accent: '#7C3AED',
      desc: 'ICC or ISTAC arbitration proceeding',
      steps: [
        { id: 1, title: 'Arbitration Clause Analysis', icon: FileSearch, duration: '2-3 days', detail: 'The validity of the arbitration clause in the contract and the rules of the selected institution are examined. Party capacity is confirmed.', log: ['scanning contract...', 'arbitration clause identified', 'ICC/ISTAC rules: loading...', 'capacity confirmed ✓'] },
        { id: 2, title: 'Arbitrator Selection', icon: Users, duration: '2-4 weeks', detail: 'Arbitrators with technical and legal expertise are identified based on the nature of the dispute. Independence declarations are obtained.', log: ['scanning arbitrator pool...', 'matching expertise...', 'independence check...', 'tribunal constituted ✓'] },
        { id: 3, title: 'Statement of Claim', icon: Terminal, duration: '1-2 weeks', detail: 'The requested compensation, evidence list and legal arguments are detailed to prepare the Statement of Claim.', log: ['structuring arguments...', 'evidence catalog: compiling...', 'legal basis: confirmed', 'submission delivered ✓'] },
        { id: 4, title: 'Hearing Process', icon: BarChart3, duration: '3-12 months', detail: 'Document production, witness statements and expert report phases are managed. Oral arguments are presented at the final hearing.', log: ['document production: initiated', 'witness statements: collecting...', 'expert report: pending...', 'hearing completed ✓'] },
        { id: 5, title: 'Award & Enforcement', icon: Award, duration: 'Closing', detail: 'The arbitral award is served. If enforcement in a foreign country is required, proceedings are conducted under the New York Convention.', log: ['award served', 'enforcement analysis...', 'NY Convention: active', 'case concluded ✓'] },
      ]
    },
  ]
};

// ─── Terminal log component ──────────────────────────────────
function TerminalLog({ logs, isRunning, stepIdx }) {
  const [visibleLogs, setVisibleLogs] = useState([]);

  useEffect(() => {
    setVisibleLogs([]);
    if (!isRunning) return;
    logs.forEach((log, i) => {
      setTimeout(() => {
        setVisibleLogs(prev => [...prev, log]);
      }, i * 600);
    });
  }, [isRunning, stepIdx]);

  return (
    <div className="bg-[#0a0a0f] border border-border/30 rounded-sm p-4 font-mono text-xs h-32 overflow-hidden relative">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/20">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="text-muted-foreground/50 ml-2">verdi.legal — sistem terminali</span>
      </div>
      <div className="space-y-1">
        <AnimatePresence>
          {visibleLogs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <span className="text-cobalt">›</span>
              <span className={log.includes('✓') ? 'text-green-400' : 'text-muted-foreground'}>
                {log}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        {isRunning && visibleLogs.length < logs.length && (
          <motion.span
            className="inline-block w-2 h-3 bg-cobalt/70"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        )}
      </div>
    </div>
  );
}

// ─── Status bar ──────────────────────────────────────────────
function StatusBar({ currentStep, totalSteps, running, scenarioLabel }) {
  const pct = totalSteps > 0 ? Math.round(((currentStep) / totalSteps) * 100) : 0;
  return (
    <div className="border border-border/20 rounded-sm p-4 bg-card/40 flex items-center gap-6 flex-wrap">
      <div className="flex items-center gap-2">
        <motion.div
          className={`w-2 h-2 rounded-full ${running ? 'bg-green-400' : currentStep === totalSteps ? 'bg-cobalt' : 'bg-muted-foreground/40'}`}
          animate={running ? { scale: [1, 1.4, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <span className="text-xs text-muted-foreground font-mono">
          {running ? 'ÇALIŞIYOR' : currentStep === totalSteps ? 'TAMAMLANDI' : 'HAZIR'}
        </span>
      </div>
      <div className="flex-1 min-w-32">
        <div className="h-1 bg-border/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-cobalt rounded-full"
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>
      <span className="text-xs font-mono text-cobalt">{pct}%</span>
      <span className="text-xs text-muted-foreground hidden sm:block">{scenarioLabel}</span>
    </div>
  );
}

// ─── Step card ───────────────────────────────────────────────
function StepCard({ step, index, status, isActive, onClick, accent }) {
  const Icon = step.icon;
  return (
    <motion.button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-sm border transition-all duration-300 ${
        status === 'done'
          ? 'border-green-500/30 bg-green-500/5'
          : isActive
          ? 'border-cobalt/60 bg-cobalt/10'
          : status === 'pending'
          ? 'border-border/20 bg-card/20 opacity-50 cursor-not-allowed'
          : 'border-border/20 bg-card/30 hover:border-cobalt/30 hover:bg-cobalt/5'
      }`}
      whileHover={status !== 'pending' ? { x: 3 } : {}}
    >
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-sm flex items-center justify-center shrink-0 ${
          status === 'done' ? 'bg-green-500/20' : isActive ? 'bg-cobalt/20' : 'bg-muted/30'
        }`}>
          {status === 'done'
            ? <CheckCircle2 className="w-4 h-4 text-green-400" />
            : <Icon className={`w-4 h-4 ${isActive ? 'text-cobalt' : 'text-muted-foreground'}`} />
          }
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className={`text-sm font-medium ${
              status === 'done' ? 'text-green-400' : isActive ? 'text-bone' : 'text-muted-foreground'
            }`}>{step.title}</span>
            <span className="text-[10px] text-muted-foreground shrink-0">{step.duration}</span>
          </div>
        </div>
        {isActive && (
          <motion.div animate={{ x: [0, 3, 0] }} transition={{ duration: 1, repeat: Infinity }}>
            <ChevronRight className="w-4 h-4 text-cobalt" />
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}

// ─── Main Page ───────────────────────────────────────────────
export default function ProcessPage() {
  const { language, t } = useLanguage();
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [stepLogs, setStepLogs] = useState([]);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const timerRef = useRef(null);

  const scenarioList = scenarios[language] || scenarios.tr;
  const scenario = selectedScenario ? scenarioList.find(s => s.id === selectedScenario) : null;

  const startSimulation = () => {
    if (!scenario) return;
    setCurrentStep(0);
    setCompleted(false);
    setRunning(true);
    setStepLogs([]);
    runStep(0);
  };

  const runStep = (idx) => {
    if (!scenario) return;
    setCurrentStep(idx);
    // auto advance
    const stepDuration = 3500;
    timerRef.current = setTimeout(() => {
      if (idx < scenario.steps.length - 1) {
        runStep(idx + 1);
      } else {
        setRunning(false);
        setCompleted(true);
      }
    }, stepDuration);
  };

  const resetSim = () => {
    clearTimeout(timerRef.current);
    setCurrentStep(0);
    setRunning(false);
    setCompleted(false);
  };

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    resetSim();
  }, [selectedScenario, language]);

  const activeStep = scenario?.steps[currentStep];
  const stepStatus = (idx) => {
    if (!running && !completed && currentStep === 0) return 'idle';
    if (idx < currentStep) return 'done';
    if (idx === currentStep && (running || completed)) return 'active';
    return 'pending';
  };

  return (
    <div className="min-h-screen bg-ink text-foreground">
      <Navbar />

      {/* Header */}
      <section className="pt-36 pb-16 px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden" ref={headerRef}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }}
        />
        <div className="absolute top-20 right-0 w-96 h-96 bg-cobalt/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, x: -20 }} animate={headerInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
          <div className="w-8 h-px bg-cobalt" />
          <span className="text-xs tracking-[0.35em] uppercase text-cobalt font-medium">{t('process.title')}</span>
        </motion.div>

        <motion.h1
          className="font-fraunces text-5xl md:text-7xl font-bold text-bone leading-tight mb-4"
          initial={{ opacity: 0, y: 40 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
          Süreç Simülasyonu
        </motion.h1>
        <motion.p
          className="text-steel text-lg max-w-2xl"
          initial={{ opacity: 0 }} animate={headerInView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}>
          {language === 'tr'
            ? 'Hukuki sürecinizi adım adım simüle edin. Senaryo seçin, sistemi başlatın ve büromuzun nasıl çalıştığını gerçek zamanlı izleyin.'
            : 'Simulate your legal process step by step. Select a scenario, start the system and watch how our firm works in real time.'}
        </motion.p>

        {/* Animated decoration */}
        <div className="mt-8 flex items-center gap-3 flex-wrap">
          {['SİSTEM HAZIR', 'GÜVENLİ BAĞLANTI', 'CANLI SİMÜLASYON'].map((tag, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-2 px-3 py-1.5 border border-cobalt/20 bg-cobalt/5 rounded-sm">
              <motion.div className="w-1.5 h-1.5 rounded-full bg-green-400" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} />
              <span className="text-[10px] text-muted-foreground tracking-widest font-mono">{tag}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Scenario selector */}
      <section className="px-6 lg:px-8 max-w-7xl mx-auto mb-10">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-medium mb-4">
          {language === 'tr' ? '01 — Senaryo Seçin' : '01 — Select Scenario'}
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {scenarioList.map((sc, i) => (
            <motion.button
              key={sc.id}
              onClick={() => setSelectedScenario(sc.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, scale: 1.015 }}
              className={`text-left p-5 rounded-sm border transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group relative overflow-hidden ${
                selectedScenario === sc.id
                  ? 'border-cobalt bg-cobalt/10 shadow-[0_12px_36px_rgba(30,58,138,0.12)]'
                  : 'border-border/20 bg-card/30 hover:border-cobalt/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${sc.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${selectedScenario === sc.id ? 'opacity-100' : ''}`} />
              <div className="relative z-10">
                <div className="text-2xl mb-3">{sc.icon}</div>
                <h3 className="font-fraunces text-base font-bold text-bone mb-1">{sc.label}</h3>
                <p className="text-xs text-muted-foreground">{sc.desc}</p>
                {selectedScenario === sc.id && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-3 right-3 w-5 h-5 rounded-full bg-cobalt flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-bone" />
                  </motion.div>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Simulator */}
      <AnimatePresence>
        {scenario && (
          <motion.section
            key={scenario.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="px-6 lg:px-8 max-w-7xl mx-auto mb-24"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-medium mb-4">
              {language === 'tr' ? '02 — Simülasyonu Başlatın' : '02 — Run the Simulation'}
            </p>

            {/* Status bar */}
            <div className="mb-4">
              <StatusBar
                currentStep={completed ? scenario.steps.length : running ? currentStep + 1 : 0}
                totalSteps={scenario.steps.length}
                running={running}
                scenarioLabel={scenario.label}
              />
            </div>

            <div className="grid lg:grid-cols-5 gap-5">
              {/* Left: step list */}
              <div className="lg:col-span-2 space-y-2">
                {scenario.steps.map((step, idx) => (
                  <StepCard
                    key={step.id}
                    step={step}
                    index={idx}
                    status={stepStatus(idx)}
                    isActive={idx === currentStep && (running || completed)}
                    onClick={() => {}}
                    accent={scenario.accent}
                  />
                ))}

                {/* Controls */}
                <div className="pt-3 flex gap-3">
                  {!running && !completed && (
                    <motion.button
                      onClick={startSimulation}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-cobalt text-bone text-sm font-medium rounded-sm hover:bg-cobalt/90 transition-colors"
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    >
                      <Play className="w-4 h-4" />
                      {language === 'tr' ? 'Simülasyonu Başlat' : 'Start Simulation'}
                    </motion.button>
                  )}
                  {(running || completed) && (
                    <motion.button
                      onClick={resetSim}
                      className="flex-1 flex items-center justify-center gap-2 py-3 border border-border/30 text-muted-foreground text-sm rounded-sm hover:text-bone hover:border-cobalt/40 transition-all"
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    >
                      <RotateCcw className="w-4 h-4" />
                      {language === 'tr' ? 'Sıfırla' : 'Reset'}
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Right: detail panel */}
              <div className="lg:col-span-3 space-y-4">
                <AnimatePresence mode="wait">
                  {(running || completed) && activeStep ? (
                    <motion.div
                      key={`step-${currentStep}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-4"
                    >
                      {/* Step detail */}
                      <div className="border border-cobalt/25 bg-cobalt/5 rounded-sm p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-10 h-10 rounded-sm bg-cobalt/20 flex items-center justify-center shrink-0">
                            {React.createElement(activeStep.icon, { className: 'w-5 h-5 text-cobalt' })}
                          </div>
                          <div>
                            <div className="text-xs text-cobalt font-mono mb-1">ADIM {currentStep + 1}/{scenario.steps.length}</div>
                            <h3 className="font-fraunces text-xl font-bold text-bone">{activeStep.title}</h3>
                            <div className="flex items-center gap-1.5 mt-1">
                              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{activeStep.duration}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-cobalt/30 pl-4">
                          {activeStep.detail}
                        </p>
                      </div>

                      {/* Terminal */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground font-mono">sistem çıktısı</span>
                          <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        </div>
                        <TerminalLog logs={activeStep.log} isRunning={running || completed} stepIdx={currentStep} />
                      </div>

                      {/* Progress dots */}
                      <div className="flex items-center justify-center gap-2 py-2">
                        {scenario.steps.map((_, i) => (
                          <motion.div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              i < currentStep ? 'bg-green-400 w-4' : i === currentStep ? 'bg-cobalt w-6' : 'bg-border/30 w-1.5'
                            }`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  ) : completed ? null : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border border-border/20 rounded-sm p-8 flex flex-col items-center justify-center text-center gap-4 min-h-64 bg-card/20"
                    >
                      <div className="w-16 h-16 rounded-full border border-cobalt/20 flex items-center justify-center">
                        <Play className="w-6 h-6 text-cobalt/50" />
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {language === 'tr' ? 'Simülasyonu başlatmak için butona tıklayın' : 'Click the button to start the simulation'}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Completed banner */}
                <AnimatePresence>
                  {completed && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="border border-green-500/30 bg-green-500/5 rounded-sm p-6 flex items-center gap-4"
                    >
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-green-400 mb-1">
                          {language === 'tr' ? 'Simülasyon Tamamlandı' : 'Simulation Complete'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {language === 'tr'
                            ? 'Tüm adımlar başarıyla tamamlandı. Gerçek süreciniz için bizimle iletişime geçin.'
                            : 'All steps completed successfully. Contact us for your real process.'}
                        </p>
                      </div>
                      <a
                        href="/iletisim"
                        className="flex items-center gap-2 px-4 py-2 bg-cobalt text-bone text-xs font-medium rounded-sm hover:bg-cobalt/90 transition-colors shrink-0"
                      >
                        {t('hero.cta')}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Static overview (when no scenario selected) */}
      {!scenario && (
        <section className="px-6 lg:px-8 max-w-7xl mx-auto pb-28">
          <div className="grid md:grid-cols-5 gap-4">
            {(t('process.steps') || []).map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-5 border border-border/20 rounded-sm bg-card/20 group hover:border-cobalt/30 transition-all"
              >
                {i < 4 && (
                  <div className="hidden md:block absolute top-8 -right-2 z-10">
                    <ChevronRight className="w-4 h-4 text-cobalt/30" />
                  </div>
                )}
                <div className="font-fraunces text-3xl font-bold text-cobalt/20 mb-3">{step.number}</div>
                <h4 className="text-sm font-semibold text-bone mb-2">{step.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                <div className="mt-3 flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-cobalt/50" />
                  <span className="text-[10px] text-muted-foreground">{step.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}