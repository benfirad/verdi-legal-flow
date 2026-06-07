import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Trash2, Sparkles, Bot, User, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const WELCOME = {
  tr: 'Merhaba! Ben **Verdi Yapay Zekası**. Hukuki sorularınızı yanıtlamak, doğru uzmanlara yönlendirmek ve büromuz hakkında bilgi vermek için buradayım. Size nasıl yardımcı olabilirim?',
  en: "Hello! I'm **Verdi AI**. I'm here to answer your questions, direct you to the right expert, and provide information about our firm. How can I help you?",
};

const RESPONSES = {
  tr: {
    greeting: "Merhaba! Size nasıl yardımcı olabilirim? Verdi Hukuk Bürosu, uzmanlık alanlarımız, ekibimiz veya bizimle iletişime geçme konularında sorularınızı yanıtlayabilirim.",
    default: "Sorunuzu anlıyorum. Verdi Hukuk Bürosu olarak kurumsal danışmanlık, uyuşmazlık çözümü, bankacılık ve diğer uzmanlık alanlarımızda size en iyi hizmeti sunmak için buradayız. Detaylı hukuki danışmanlık almak ve davanızı değerlendirmemiz için lütfen [İletişim](/iletisim) sayfamızdaki formu doldurun veya doğrudan bizi arayın.",
    contact: "Verdi Hukuk Bürosu İstanbul Levent'te yer almaktadır.\n\n**Adres:** Levent, Büyükdere Cad. No:185, 34394 Şişli / İstanbul\n**Telefon:** +90 212 324 XX XX\n**E-posta:** info@verdihukuk.com.tr\n\nBizimle doğrudan iletişime geçmek için [İletişim Sayfamızı](/iletisim) ziyaret edebilirsiniz.",
    team: "Verdi Hukuk Bürosu, kurucuları ve kıdemli ortakları dahil olmak üzere alanında uzman geniş bir avukat kadrosuna sahiptir. Ekibimizin tamamını, uzmanlık alanlarını ve özgeçmişlerini incelemek için [Ekibimiz Sayfasını](/ekibimiz) ziyaret edebilirsiniz.",
    banking: "Türkiye'de bankacılık hukuku alanında öncü hukuk büroları arasında yer alıyoruz. Proje finansmanı, sendikasyon kredileri, BDDK düzenleyici uyumu ve yapılandırılmış finansman alanlarında derin tecrübeye sahibiz. Detaylı bilgi için [Çalışma Alanlarımız](/calisma-alanlari) sayfasını inceleyebilirsiniz.",
    ma: "Yerli ve yabancı müvekkillerimize birleşme, devralma (M&A) ve şirketler hukuku süreçlerinde tam kapsamlı hukuki danışmanlık sunuyoruz. Durum tespiti (due diligence), hisse devir sözleşmesi (SPA) müzakereleri ve kurumsal yönetim konularında lideriz. Detaylı bilgi için [Çalışma Alanlarımız](/calisma-alanlari) sayfasını inceleyebilirsiniz.",
    dispute: "Müvekkillerimizi geniş bir ticari uyuşmazlık yelpazesinde temsil ediyor; ulusal ve uluslararası tahkim (ISTAC, ICC, UNCITRAL) ve davalarda stratejik destek sağlıyoruz. Detaylı bilgi için [Çalışma Alanlarımız](/calisma-alanlari) sayfasını inceleyebilirsiniz.",
    competition: "Rekabet hukuku alanında birleşme/devralma izin başvuruları, Rekabet Kurulu soruşturmaları, kartel ve hakim durum davalarında ve uyum programlarında müvekkillerimizi en üst düzeyde temsil etmekteyiz. Detaylı bilgi için [Çalışma Alanlarımız](/calisma-alanlari) sayfasını inceleyebilirsiniz.",
    career: "Verdi Hukuk Bürosu bünyesinde kariyer yapmak, stajyer veya avukat olarak ekibimize katılmak isterseniz güncel açık pozisyonlarımızı görmek ve CV'nizi göndermek için [Kariyer Sayfamızı](/kariyer) ziyaret edebilirsiniz.",
    about: "Verdi Hukuk Bürosu, Türkiye'nin önde gelen tam hizmet (full-service) hukuk bürolarından biridir. Sektör bilgisi ile birleştirdiğimiz derin hukuki uzmanlığımızla, yerli ve uluslararası müvekkillerimize en yüksek standartlarda danışmanlık hizmeti sunuyoruz. Kuruluşumuz ve vizyonumuz hakkında daha fazla bilgi edinmek için [Hakkımızda](/hakkimizda) sayfamızı ziyaret edebilirsiniz.",
    publications: "Büromuz avukatlarının güncel hukuki gelişmeleri ve makaleleri ele aldığı yayınlarımızı incelemek için [Yayınlarımız](/yayinlar) sayfamızı ziyaret edebilirsiniz.",
    process: "Müvekkillerimizle yürüttüğümüz şeffaf ve adım adım hukuki süreçlerimizi incelemek ve süreç simülasyonumuzu deneyimlemek için [Süreç Yönetimi](/surec) sayfamızı ziyaret edebilirsiniz.",
  },
  en: {
    greeting: "Hello! How can I help you? I can answer your questions about Verdi Law Firm, our practice areas, our team, or how to contact us.",
    default: "I understand your query. At Verdi Law Firm, we are here to provide you with the best service in corporate advisory, dispute resolution, and our other practice areas. To get detailed legal advice and let us assess your case, please fill out the form on our [Contact](/iletisim) page or call us directly.",
    contact: "Verdi Law Firm is located in Levent, Istanbul.\n\n**Address:** Levent, Buyukdere Cad. No:185, 34394 Sisli / Istanbul\n**Phone:** +90 212 324 XX XX\n**Email:** info@verdilaw.com.tr\n\nYou can visit our [Contact Page](/iletisim) to get in touch with us directly.",
    team: "Verdi Law Firm has a large team of expert lawyers, including founders and senior partners. You can visit our [Team Page](/ekibimiz) to review our entire team, their specialties, and biographies.",
    banking: "We are among the leading law firms in Turkey in the field of banking law. We have deep experience in project finance, syndicated loans, BRSA regulatory compliance, and structured finance. For more information, please check our [Practice Areas](/calisma-alanlari) page.",
    ma: "We offer full-service legal advice to domestic and foreign clients in mergers & acquisitions (M&A) and corporate law processes. We are leaders in due diligence, SPA negotiations, and corporate governance. For more information, please check our [Practice Areas](/calisma-alanlari) page.",
    dispute: "We represent our clients in a wide range of commercial disputes, providing strategic support in domestic and international arbitration (ISTAC, ICC, UNCITRAL) and litigation. For more information, please check our [Practice Areas](/calisma-alanlari) page.",
    competition: "In competition law, we provide high-level representation in merger/acquisition clearance filings, TCA investigations, cartel and dominance cases, and compliance programs. For more information, please check our [Practice Areas](/calisma-alanlari) page.",
    career: "If you would like to build a career at Verdi Law Firm, or join our team as an associate or intern, you can visit our [Career Page](/kariyer) to view open positions and submit your CV.",
    about: "Verdi Law Firm is one of Turkey's leading full-service law firms. With deep legal expertise combined with sector knowledge, we provide advisory services to domestic and international clients at the highest standards. To learn more about our history and vision, please visit our [About Us](/hakkimizda) page.",
    publications: "You can visit our [Publications](/yayinlar) page to review articles and updates on current legal developments authored by our lawyers.",
    process: "You can visit our [Process Management](/surec) page to examine our transparent, step-by-step workflows and experience our process simulator.",
  }
};

function formatMessage(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="underline hover:text-[#c9a87c] font-medium transition-colors">$1</a>')
    .replace(/\n/g, '<br/>');
}

function getBotResponse(input, lang) {
  const query = input.toLowerCase();
  const res = RESPONSES[lang] || RESPONSES.tr;

  if (query.includes('merhaba') || query.includes('selam') || query.includes('hello') || query.includes('hi')) {
    return res.greeting;
  }
  if (query.includes('iletisim') || query.includes('iletişim') || query.includes('adres') || query.includes('telefon') || query.includes('ulaş') || query.includes('ulas') || query.includes('email') || query.includes('e-posta') || query.includes('contact') || query.includes('phone') || query.includes('address') || query.includes('mail')) {
    return res.contact;
  }
  if (query.includes('ekip') || query.includes('avukat') || query.includes('ortak') || query.includes('kurucu') || query.includes('partner') || query.includes('lawyer') || query.includes('attorney') || query.includes('team') || query.includes('biyografi') || query.includes('kimler')) {
    return res.team;
  }
  if (query.includes('banka') || query.includes('finans') || query.includes('kredi') || query.includes('proje') || query.includes('banking') || query.includes('finance') || query.includes('loan')) {
    return res.banking;
  }
  if (query.includes('birleşme') || query.includes('devralma') || query.includes('sirket') || query.includes('şirket') || query.includes('kurumsal') || query.includes('m&a') || query.includes('merger') || query.includes('acquisition') || query.includes('corporate')) {
    return res.ma;
  }
  if (query.includes('uyuşmazlık') || query.includes('uyusmazlik') || query.includes('tahkim') || query.includes('dava') || query.includes('mahkeme') || query.includes('arabulucu') || query.includes('arbitration') || query.includes('dispute') || query.includes('litigation') || query.includes('court') || query.includes('icc') || query.includes('istac')) {
    return res.dispute;
  }
  if (query.includes('rekabet') || query.includes('kartel') || query.includes('soruşturma') || query.includes('sorusturma') || query.includes('kurul') || query.includes('competition') || query.includes('antitrust') || query.includes('tca')) {
    return res.competition;
  }
  if (query.includes('kariyer') || query.includes('staj') || query.includes('iş') || query.includes('is ') || query.includes('başvuru') || query.includes('basvuru') || query.includes('cv') || query.includes('career') || query.includes('job') || query.includes('intern') || query.includes('apply')) {
    return res.career;
  }
  if (query.includes('hakkinda') || query.includes('hakkında') || query.includes('hakkimizda') || query.includes('hakkımızda') || query.includes('hakkınızda') || query.includes('tarihçe') || query.includes('tarih') || query.includes('about') || query.includes('who we are') || query.includes('who is')) {
    return res.about;
  }
  if (query.includes('yayin') || query.includes('yayın') || query.includes('makale') || query.includes('yazı') || query.includes('yazi') || query.includes('dergi') || query.includes('publication') || query.includes('article') || query.includes('newsletter') || query.includes('bulletin')) {
    return res.publications;
  }
  if (query.includes('surec') || query.includes('süreç') || query.includes('adim') || query.includes('adım') || query.includes('simulasyon') || query.includes('simülasyon') || query.includes('isleyis') || query.includes('işleyiş') || query.includes('process') || query.includes('step') || query.includes('workflow') || query.includes('simulator')) {
    return res.process;
  }

  return res.default;
}

export default function VerdiAIChat() {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: WELCOME[language] ?? WELCOME.tr, id: 0 },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Reset welcome message when language changes
  useEffect(() => {
    setMessages([{ role: 'assistant', content: WELCOME[language] ?? WELCOME.tr, id: Date.now() }]);
  }, [language]);

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: WELCOME[language] ?? WELCOME.tr, id: Date.now() }]);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    const userMsg = { role: 'user', content: userText, id: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const botResponse = getBotResponse(userText, language);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: botResponse,
          id: Date.now() + 1,
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  const placeholder = language === 'tr' ? 'Hukuki sorunuzu yazın…' : 'Ask your legal question…';
  const clearLabel = language === 'tr' ? 'Sohbeti temizle' : 'Clear chat';

  return (
    <>
      {/* FAB Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="fab"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 group flex items-center gap-2.5 pl-4 pr-5 py-3.5 rounded-full bg-cobalt text-bone shadow-[0_8px_32px_rgba(30,58,138,0.45)] hover:shadow-[0_12px_40px_rgba(30,58,138,0.6)] transition-shadow"
          >
            {/* Pulsing ring */}
            <span className="absolute inset-0 rounded-full bg-cobalt animate-ping opacity-20 pointer-events-none" />
            <div className="relative w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-bone" />
            </div>
            <span className="text-sm font-semibold tracking-wide relative z-10">Verdi AI</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-50 flex flex-col rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.7)] border border-border/30
              inset-x-3 bottom-3 top-3
              md:inset-auto md:bottom-6 md:right-6 md:w-[400px] md:top-auto md:h-[560px]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 bg-cobalt shrink-0">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-bone" />
                </div>
                {/* Online dot */}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-cobalt" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-bone font-semibold text-sm leading-tight">Verdi Yapay Zekası</p>
                <p className="text-bone/60 text-[11px]">
                  {language === 'tr' ? 'Hukuki Asistan · Çevrimiçi' : 'Legal Assistant · Online'}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  title={clearLabel}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-bone/60 hover:text-bone hover:bg-white/10 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-bone/60 hover:text-bone hover:bg-white/10 transition-colors"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Disclaimer bar */}
            <div className="bg-cobalt/10 border-b border-border/20 px-4 py-1.5 shrink-0 flex items-center gap-1.5">
              <Bot className="w-3 h-3 text-cobalt shrink-0" />
              <p className="text-[11px] text-muted-foreground leading-tight">
                {language === 'tr'
                  ? 'Bu asistan genel bilgi sağlar; hukuki tavsiye yerine geçmez.'
                  : 'This assistant provides general information; it is not a substitute for legal advice.'}
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 bg-ink space-y-4">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-full bg-cobalt/20 border border-cobalt/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Sparkles className="w-3 h-3 text-cobalt" />
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-cobalt text-bone rounded-tr-sm'
                          : 'bg-card/80 border border-border/20 text-foreground rounded-tl-sm'
                      }`}
                      dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                    />
                    {msg.role === 'user' && (
                      <div className="w-7 h-7 rounded-full bg-muted/50 border border-border/20 flex items-center justify-center shrink-0 mt-0.5">
                        <User className="w-3 h-3 text-muted-foreground" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              <AnimatePresence>
                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-2.5 justify-start"
                  >
                    <div className="w-7 h-7 rounded-full bg-cobalt/20 border border-cobalt/30 flex items-center justify-center shrink-0">
                      <Sparkles className="w-3 h-3 text-cobalt" />
                    </div>
                    <div className="bg-card/80 border border-border/20 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">
                      {[0, 1, 2].map(i => (
                        <motion.span key={i} className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="flex items-end gap-2 px-3 py-3 bg-card/60 border-t border-border/20 shrink-0">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={placeholder}
                className="flex-1 bg-ink/60 border border-border/30 rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-cobalt/50 resize-none"
              />
              <motion.button
                type="submit"
                disabled={!input.trim() || loading}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.93 }}
                className="w-10 h-10 rounded-xl bg-cobalt text-bone flex items-center justify-center shrink-0 disabled:opacity-40 transition-opacity"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}