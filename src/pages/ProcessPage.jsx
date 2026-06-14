import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Play, CheckCircle2, Clock, ChevronRight,
  RotateCcw, ArrowRight, Terminal, Lock, FileSearch,
  Users, MessageSquare, BarChart3, Award
} from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// ─── Scenario data ────────────�
const scenarios = {
  tr: [
    {
      id: 'ticket',
      label: 'Kayıt & Bilet',
      icon: '🎟️',
      color: 'from-blue-600/20 to-cobalt/5',
      accent: '#1E3A8A',
      desc: 'Zirveye katılım ve e-bilet onay süreci',
      steps: [
        { id: 1, title: 'Kayıt Formu', icon: MessageSquare, duration: '5 dk', detail: 'İletişim sayfasındaki kayıt formu doldurulur ve sisteme iletilir.', log: ['istek gönderildi...', 'form verileri doğrulanıyor...', 'kayıt talebi alındı', 'e-posta doğrulama bekleniyor'] },
        { id: 2, title: 'Profil Kontrolü', icon: FileSearch, duration: '24 saat', detail: 'Redmono ekibi, katılımcının başvurusunu ve kontenjan durumunu inceler.', log: ['veriler inceleniyor...', 'kontenjan kontrolü yapılıyor...', 'katılımcı profili uygun ✓', 'onay e-postası hazırlandı'] },
        { id: 3, title: 'Bilet Onayı', icon: BarChart3, duration: '1 saat', detail: 'Bilet bedeli ödenir veya davetiye onaylanır. Benzersiz bilet numarası üretilir.', log: ['ödeme ağ geçidi aktif...', 'işlem onaylandı', 'bilet numarası: #RM-2026-9021', 'kayıt başarılı ✓'] },
        { id: 4, title: 'E-Bilet Teslimi', icon: Users, duration: 'Anında', detail: 'QR kodlu dijital bilet ve zirve giriş yönergeleri e-posta ile iletilir.', log: ['PDF bilet oluşturuluyor...', 'QR kod entegrasyonu...', 'e-posta gönderildi', 'bilet alındı ✓'] },
        { id: 5, title: 'Zirve Girişi', icon: Award, duration: 'Zirve Günü', detail: 'Zirve günü kapıda QR kod okutulur, yaka kartı alınır ve giriş yapılır.', log: ['QR okuyucu hazır', 'yaka kartı basıldı', 'hoş geldiniz!', 'giriş yapıldı ✓'] },
      ]
    },
    {
      id: 'workshop',
      label: 'Atölye Seçimi',
      icon: '💻',
      color: 'from-emerald-600/20 to-emerald-900/5',
      accent: '#059669',
      desc: 'Kreatif ve teknik atölyelere ön kayıt süreci',
      steps: [
        { id: 1, title: 'Atölye Seçimi', icon: MessageSquare, duration: '1 gün', detail: 'Programdaki kontenjanlı atölyeler arasından ilgi alanlarına uygun olanlar seçilir.', log: ['atölye listesi çekiliyor...', 'kontenjanlar taranıyor...', 'seçimler: UX/UI ve AI Art', 'onay bekleniyor'] },
        { id: 2, title: 'Ön Rezervasyon', icon: FileSearch, duration: '1-2 gün', detail: 'Seçilen atölyeler için geçici rezervasyon oluşturulur ve çakışma kontrolü yapılır.', log: ['zaman çakışması kontrolü...', 'çakışma yok', 'kontenjan rezerve edildi', 'atölye kaydı onaylandı ✓'] },
        { id: 3, title: 'Araç Kurulumları', icon: Lock, duration: '1-3 gün', detail: 'Atölye için gerekli Figma, Midjourney veya diğer yazılım kurulum yönergeleri takip edilir.', log: ['gereksinim listesi hazırlandı', 'yazılım indirme linkleri iletildi', 'hesap aktivasyonları yapılıyor...', 'kurulumlar tamamlandı ✓'] },
        { id: 4, title: 'Ön Hazırlık', icon: BarChart3, duration: '1 gün', detail: 'Atölye eğitmenlerinin paylaştığı ön hazırlık materyalleri ve brief incelenir.', log: ['brief dosyası indirildi', 'başlangıç kiti yüklendi', 'örnek kaynaklar inceleniyor...', 'hazırlık tamamlandı ✓'] },
        { id: 5, title: 'Atölye Katılımı', icon: Award, duration: 'Atölye Saati', detail: 'Atölye saatinde ilgili salonda yer alınır ve uygulamalı çalışmaya başlanır.', log: ['eğitmen bağlandı', 'uygulamalı çalışma başladı...', 'proje çıktısı alındı', 'katılım belgesi hazırlandı ✓'] },
      ]
    },
    {
      id: 'event_day',
      label: 'Zirve Günü',
      icon: '📢',
      color: 'from-purple-600/20 to-purple-900/5',
      accent: '#7C3AED',
      desc: '15-16 Ekim tarihlerindeki zirve program akışı',
      steps: [
        { id: 1, title: 'Kayıt & Karşılama', icon: FileSearch, duration: '08:30 - 09:30', detail: 'Kapı açılışı, yaka kartı dağıtımı ve Redmono karşılama ikramları.', log: ['kapılar açıldı', 'yaka kartları dağıtılıyor...', 'karşılama kokteyli başladı', 'salona geçiş başladı ✓'] },
        { id: 2, title: 'Açılış & Keynote', icon: Users, duration: '09:30 - 12:30', detail: 'Redmono Creative Agency açılış konuşması ve ana konuşmacı sunumları.', log: ['sahne ışıkları aktif', 'açılış konuşması başladı', '1. oturum: Tasarımın Geleceği', 'oturum tamamlandı ✓'] },
        { id: 3, title: 'Atölyeler & Paneller', icon: Terminal, duration: '13:30 - 17:00', detail: 'Eşzamanlı yürütülen pratik atölyeler ve panel tartışmaları.', log: ['atölye salonları açıldı', 'panel: Yapay Zekalı Sanat', 'canlı soru-cevap seansı', 'oturumlar tamamlandı ✓'] },
        { id: 4, title: 'Networking & Sohbet', icon: BarChart3, duration: '17:00 - 19:30', detail: 'Sektör profesyonelleri, konuşmacılar ve katılımcılar arası serbest networking.', log: ['networking alanı aktif', 'konuşmacı buluşmaları', 'portfolyo inceleme saatleri', 'tanışmalar başladı ✓'] },
        { id: 5, title: 'Kapanış Partisi', icon: Award, duration: '19:30+', detail: 'Zirve kapanış partisi, DJ performansları ve yaratıcı topluluk buluşması.', log: ['DJ kabini hazır', 'müzik başladı', 'kokteyl servisi', 'zirve başarıyla tamamlandı ✓'] },
      ]
    },
  ],
  en: [
    {
      id: 'ticket',
      label: 'Ticket Registration',
      icon: '🎟️',
      color: 'from-blue-600/20 to-cobalt/5',
      accent: '#1E3A8A',
      desc: 'Summit registration and e-ticket approval process',
      steps: [
        { id: 1, title: 'Registration Form', icon: MessageSquare, duration: '5 min', detail: 'The registration form on the contact page is completed and submitted to the system.', log: ['request sent...', 'validating form data...', 'registration request received', 'awaiting email verification'] },
        { id: 2, title: 'Profile Check', icon: FileSearch, duration: '24 hours', detail: 'The Redmono team reviews the applicant\'s details and capacity.', log: ['analyzing data...', 'checking capacity...', 'attendee profile suitable ✓', 'approval email prepared'] },
        { id: 3, title: 'Ticket Approval', icon: BarChart3, duration: '1 hour', detail: 'Ticket fee is paid or invitation is approved. A unique ticket number is generated.', log: ['payment gateway active...', 'transaction approved', 'ticket number: #RM-2026-9021', 'registration successful ✓'] },
        { id: 4, title: 'E-Ticket Delivery', icon: Users, duration: 'Instant', detail: 'Digital ticket with QR code and entry guidelines are sent via email.', log: ['generating PDF ticket...', 'integrating QR code...', 'email sent', 'ticket received ✓'] },
        { id: 5, title: 'Summit Entry', icon: Award, duration: 'Event Day', detail: 'On the event day, the QR code is scanned at the door, name badge is collected and entry is granted.', log: ['QR reader ready', 'printing name badge', 'welcome!', 'entry registered ✓'] },
      ]
    },
    {
      id: 'workspace',
      label: 'Workshop Selection',
      icon: '💻',
      color: 'from-emerald-600/20 to-emerald-900/5',
      accent: '#059669',
      desc: 'Pre-registration process for creative and technical workshops',
      steps: [
        { id: 1, title: 'Workshop Selection', icon: MessageSquare, duration: '1 day', detail: 'Choose workshops of interest with limited capacity from the schedule.', log: ['fetching workshop list...', 'scanning capacity...', 'selections: UX/UI and AI Art', 'awaiting confirmation'] },
        { id: 2, title: 'Pre-booking', icon: FileSearch, duration: '1-2 days', detail: 'Temporary booking is created for selected workshops and overlap check is performed.', log: ['checking schedule overlap...', 'no overlap', 'capacity reserved', 'workshop registration approved ✓'] },
        { id: 3, title: 'Tools Setup', icon: Lock, duration: '1-3 days', detail: 'Follow instructions to install Figma, Midjourney, or other software required for the workshop.', log: ['requirements list prepared', 'software download links sent', 'activating accounts...', 'setup completed ✓'] },
        { id: 4, title: 'Preparation', icon: BarChart3, duration: '1 day', detail: 'Review pre-work materials and creative briefs shared by the workshop instructors.', log: ['downloaded brief file', 'loaded starter kit', 'reviewing sample resources...', 'prep completed ✓'] },
        { id: 5, title: 'Attendance', icon: Award, duration: 'Workshop Time', detail: 'Be present at the respective room at the scheduled workshop time and start hands-on work.', log: ['instructor connected', 'hands-on work started...', 'project output exported', 'certificate of attendance prepared ✓'] },
      ]
    },
    {
      id: 'event_day',
      label: 'Summit Day',
      icon: '📢',
      color: 'from-purple-600/20 to-purple-900/5',
      accent: '#7C3AED',
      desc: 'Zirve schedule and timeline on October 15-16',
      steps: [
        { id: 1, title: 'Registration & Welcome', icon: FileSearch, duration: '08:30 - 09:30', detail: 'Doors open, badge distribution, and Redmono welcome drinks.', log: ['doors opened', 'distributing badges...', 'welcome drinks started', 'seating initiated ✓'] },
        { id: 2, title: 'Opening & Keynotes', icon: Users, duration: '09:30 - 12:30', detail: 'Redmono Creative Agency opening remarks and keynote presentations.', log: ['stage lights active', 'opening speech started', 'session 1: Future of Design', 'session completed ✓'] },
        { id: 3, title: 'Workshops & Panels', icon: Terminal, duration: '13:30 - 17:00', detail: 'Concurrent practical workshops and panel discussions.', log: ['workshop rooms opened', 'panel: Art with AI', 'live Q&A session', 'sessions completed ✓'] },
        { id: 4, title: 'Networking Hours', icon: BarChart3, duration: '17:00 - 19:30', detail: 'Free networking time among industry professionals, speakers, and attendees.', log: ['networking zone active', 'speaker meetups', 'portfolio review sessions', 'connections started ✓'] },
        { id: 5, title: 'After Party', icon: Award, duration: '19:30+', detail: 'Zirve closing party, DJ performances, and creative community mixer.', log: ['DJ booth ready', 'music started', 'drinks served', 'summit completed successfully ✓'] },
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
        <span className="text-muted-foreground/50 ml-2">redmono.com — zirve terminali</span>
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