import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Trash2, Sparkles, Bot, User, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const WELCOME = {
  tr: 'Merhaba! Ben **Redmono Zirve Asistanı**. Redmono Creative Summit 2026 hakkındaki sorularınızı yanıtlamak, etkinlik programı/konuşmacıları hakkında bilgi vermek ve kayıt sürecinde size yardımcı olmak için buradayım. Size nasıl yardımcı olabilirim?',
  en: "Hello! I'm the **Redmono Summit Assistant**. I'm here to answer your questions about Redmono Creative Summit 2026, share information about the program and speakers, and assist with registration. How can I help you?",
};

const SUGGESTIONS = {
  tr: [
    { text: "Zirve hakkında genel bilgi alabilir miyim?", label: "Zirve Hakkında" },
    { text: "Etkinlik programı ve konuları nelerdir?", label: "Zirve Programı" },
    { text: "Konuşmacılar kimlerden oluşuyor?", label: "Konuşmacılar" },
    { text: "Katılım ve akış süreci nasıl işliyor?", label: "Etkinlik Akışı" },
    { text: "Güncel zirve haberlerini inceleyebilir miyim?", label: "Zirve Haberleri" },
    { text: "Bilet ve kayıt işlemleri hakkında bilgi alabilir miyim?", label: "Kayıt & Bilet" }
  ],
  en: [
    { text: "Can I get general information about the summit?", label: "About Summit" },
    { text: "What is the summit schedule and topics?", label: "Summit Program" },
    { text: "Who are the speakers?", label: "Speakers" },
    { text: "How does the timeline and event flow work?", label: "Event Flow" },
    { text: "Can I review the latest summit news?", label: "Summit News" },
    { text: "How can I register and get tickets?", label: "Registration" }
  ]
};

const RESPONSES = {
  tr: {
    greeting: "Merhaba! Size nasıl yardımcı olabilirim? Redmono Creative Summit 2026, etkinlik konularımız, konuşmacılarımız veya bizimle iletişime geçme konularında sorularınızı yanıtlayabilirim.",
    default: "Sorunuzu anlıyorum. Redmono Creative Summit 2026 olarak UX/UI Tasarım, Marka & Kimlik, Yapay Zeka & Sanat ve Web3 & Gelecek Teknolojileri alanlarında size en iyi deneyimi sunmak için buradayız. Detaylı bilgi almak ve kaydolmak için lütfen [Kayıt & İletişim](/iletisim) sayfamızdaki formu doldurun veya doğrudan bizimle iletişime geçin.",
    contact: "Redmono Creative Summit, İstanbul Kadıköy'de gerçekleşecektir.\n\n**Adres:** Caferağa Mah. Moda Cad. No:82, Kadıköy / İstanbul\n**Telefon:** +90 212 900 00 00\n**E-posta:** info@redmono.com\n\nBizimle doğrudan iletişime geçmek veya kayıt yaptırmak için [İletişim Sayfamızı](/iletisim) ziyaret edebilirsiniz.",
    team: "Redmono Creative Summit 2026, alanında öncü tasarımcılar, marka yöneticileri, AI sanatçıları ve teknoloji liderlerinden oluşan geniş bir konuşmacı kadrosuna sahiptir. Konuşmacılarımızın tamamını ve detaylı özgeçmişlerini incelemek için [Konuşmacılar Sayfasını](/ekibimiz) ziyaret edebilirsiniz.",
    banking: "Zirvede UX/UI Tasarımı alanında en yeni trendleri, kullanıcı deneyimi araştırmalarını, kullanılabilirlik ilkelerini ve etkileşimli arayüz tasarımlarını ele alacağız. Detaylı bilgi için [Program ve Konular](/calisma-alanlari) sayfasını inceleyebilirsiniz.",
    ma: "Marka & Kimlik oturumlarımızda yaratıcı marka konumlandırma, görsel kimlik tasarımı, marka hikayesi anlatımı ve modern marka stratejilerini derinlemesine inceleyeceğiz. Detaylı bilgi için [Program ve Konular](/calisma-alanlari) sayfasını inceleyebilirsiniz.",
    dispute: "Yapay Zeka & Sanat alanındaki panellerimizde, üretken yapay zekanın yaratıcı süreçlerdeki rolünü, sanat dünyasındaki dönüşümü ve yapay zeka araçları ile yeni nesil içerik üretimini tartışacağız. Detaylı bilgi için [Program ve Konular](/calisma-alanlari) sayfasını inceleyebilirsiniz.",
    competition: "Web3 & Gelecek Teknolojileri oturumlarımızda merkeziyetsiz tasarım, metaverse deneyimleri, blockchain entegrasyonları ve geleceğin dijital dünyasını şekillendiren teknolojileri ele alacağız. Detaylı bilgi için [Program ve Konular](/calisma-alanlari) sayfasını inceleyebilirsiniz.",
    career: "Redmono Creative Summit 2026'ya katılmak, atölye çalışmalarında yer almak veya sponsorluk/iş ortaklığı fırsatlarını değerlendirmek isterseniz [Kayıt Sayfamızı](/kariyer) ziyaret ederek detayları inceleyebilir ve başvuruda bulunabilirsiniz.",
    about: "Redmono Creative Summit 2026, Türkiye'nin ve dünyanın önde gelen yaratıcı profesyonellerini bir araya getiren prestijli bir tasarım ve teknoloji zirvesidir. Zirve vizyonu hakkında daha fazla bilgi edinmek için [Hakkımızda](/hakkimizda) sayfamızı ziyaret edebilirsiniz.",
    publications: "Etkinlik duyuruları, basın bültenleri, program güncellemeleri ve zirve öncesi hazırlık yazılarını incelemek için [Zirve Haberleri](/yayinlar) sayfamızı ziyaret edebilirsiniz.",
    process: "Katılımcılarımızın zirve günü yaşayacağı şeffaf ve adım adım etkinlik akışını incelemek ve süreç simülasyonumuzu deneyimlemek için [Etkinlik Akışı](/surec) sayfamızı ziyaret edebilirsiniz.",
  },
  en: {
    greeting: "Hello! How can I help you? I can answer your questions about Redmono Creative Summit 2026, our topics, speakers, or how to contact us.",
    default: "I understand your query. At Redmono Creative Summit 2026, we are here to provide you with the best experience in UX/UI Design, Branding & Identity, AI & Art, and Web3 & Future Tech. To get detailed information and register, please fill out the form on our [Contact](/iletisim) page or get in touch with us directly.",
    contact: "Redmono Creative Summit will take place in Kadikoy, Istanbul.\n\n**Address:** Caferaga Mah. Moda Cad. No:82, Kadikoy / Istanbul\n**Phone:** +90 212 900 00 00\n**Email:** info@redmono.com\n\nYou can visit our [Contact Page](/iletisim) to get in touch with us directly.",
    team: "Redmono Creative Summit 2026 features a wide range of speakers, including leading designers, brand managers, AI artists, and tech leaders. You can visit our [Speakers Page](/ekibimiz) to see the full list and details.",
    banking: "At the summit, we will discuss the latest trends in UX/UI Design, user experience research, usability principles, and interactive interface design. For more information, please check our [Schedule](/calisma-alanlari) page.",
    ma: "In our Branding & Identity sessions, we will delve deep into creative brand positioning, visual identity design, brand storytelling, and modern brand strategies. For more information, please check our [Schedule](/calisma-alanlari) page.",
    dispute: "In our AI & Art panels, we will discuss the role of generative AI in creative processes, the transformation of the art world, and next-generation content creation using AI tools. For more information, please check our [Schedule](/calisma-alanlari) page.",
    competition: "In our Web3 & Future Tech sessions, we will explore decentralized design, metaverse experiences, blockchain integrations, and technologies shaping the future digital world. For more information, please check our [Schedule](/calisma-alanlari) page.",
    career: "If you would like to participate in Redmono Creative Summit 2026, join workshop sessions, or explore sponsorship/partnership opportunities, you can visit our [Registration Page](/kariyer) to view details and apply.",
    about: "Redmono Creative Summit 2026 is a prestigious design and technology summit that gathers leading creative professionals from Turkey and around the world. To learn more about our goals and vision, please visit our [About Us](/hakkimizda) page.",
    publications: "You can visit our [News](/yayinlar) page to review event news, press releases, schedule updates, and pre-summit preparation articles.",
    process: "You can visit our [Timeline](/surec) page to examine our transparent, step-by-step event schedule and experience our process simulator.",
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
  if (query.includes('ekip') || query.includes('konuşmacı') || query.includes('konusmaci') || query.includes('ortak') || query.includes('kurucu') || query.includes('partner') || query.includes('speaker') || query.includes('attorney') || query.includes('team') || query.includes('biyografi') || query.includes('kimler')) {
    return res.team;
  }
  if (query.includes('ux') || query.includes('ui') || query.includes('tasarım') || query.includes('tasarim') || query.includes('kullanıcı') || query.includes('deneyim') || query.includes('design') || query.includes('user')) {
    return res.banking;
  }
  if (query.includes('marka') || query.includes('kimlik') || query.includes('branding') || query.includes('logo') || query.includes('hikaye') || query.includes('identity')) {
    return res.ma;
  }
  if (query.includes('yapay') || query.includes('zeka') || query.includes('sanat') || query.includes('ai') || query.includes('art') || query.includes('üretken') || query.includes('midjourney') || query.includes('stable')) {
    return res.dispute;
  }
  if (query.includes('web3') || query.includes('blockchain') || query.includes('metaverse') || query.includes('teknoloji') || query.includes('gelecek') || query.includes('future') || query.includes('tech')) {
    return res.competition;
  }
  if (query.includes('kayıt') || query.includes('kayit') || query.includes('katıl') || query.includes('katil') || query.includes('bilet') || query.includes('sponsor') || query.includes('başvuru') || query.includes('basvuru') || query.includes('register') || query.includes('ticket')) {
    return res.career;
  }
  if (query.includes('hakkinda') || query.includes('hakkında') || query.includes('hakkimizda') || query.includes('hakkımızda') || query.includes('tarihçe') || query.includes('about') || query.includes('who we are') || query.includes('who is')) {
    return res.about;
  }
  if (query.includes('yayin') || query.includes('yayın') || query.includes('makale') || query.includes('yazı') || query.includes('yazi') || query.includes('haber') || query.includes('duyuru') || query.includes('publication') || query.includes('article') || query.includes('news') || query.includes('announcement')) {
    return res.publications;
  }
  if (query.includes('surec') || query.includes('süreç') || query.includes('adim') || query.includes('adım') || query.includes('simulasyon') || query.includes('simülasyon') || query.includes('akış') || query.includes('akis') || query.includes('takvim') || query.includes('program') || query.includes('schedule') || query.includes('process') || query.includes('step') || query.includes('workflow')) {
    return res.process;
  }

  return res.default;
}

export default function WerdyAIChat() {
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

  const submitMessage = (text) => {
    if (!text.trim() || loading) return;

    const userMsg = { role: 'user', content: text, id: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    setTimeout(() => {
      const botResponse = getBotResponse(text, language);
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

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    submitMessage(input);
    setInput('');
  };

  const placeholder = language === 'tr' ? 'Zirve hakkında sorunuzu yazın…' : 'Ask about the summit…';
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
            className="fixed bottom-6 right-6 z-50 group flex items-center gap-2.5 pl-4 pr-5 py-3.5 bg-[#1A2530] text-white shadow-[0_8px_32px_rgba(26,37,48,0.35)] hover:shadow-[0_12px_40px_rgba(26,37,48,0.5)] transition-shadow"
          >
            {/* Pulsing ring */}
            <span className="absolute inset-0 bg-[#1A2530] animate-ping opacity-20 pointer-events-none" />
            <div className="relative w-7 h-7 bg-white/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold tracking-wide relative z-10">Redmono AI</span>
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
            className="fixed z-50 flex flex-col rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.75)] border border-white/10 bg-[#0a0e17]
              inset-x-3 bottom-3 top-3
              md:inset-auto md:bottom-6 md:right-6 md:w-[400px] md:top-auto md:h-[560px]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 bg-[#0a0e17] border-b border-white/10 shrink-0">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Sparkles className="w-4 h-4 text-[#B8CCDA]" />
                </div>
                {/* Online dot */}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#0a0e17]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm leading-tight">
                  {language === 'tr' ? 'Redmono Zirve Asistanı' : 'Redmono Summit Assistant'}
                </p>
                <p className="text-white/50 text-[11px]">
                  {language === 'tr' ? 'Zirve Asistanı · Çevrimiçi' : 'Summit Assistant · Online'}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  title={clearLabel}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Disclaimer bar */}
            <div className="bg-[#161f30]/40 border-b border-white/5 px-4 py-1.5 shrink-0 flex items-center gap-1.5">
              <Bot className="w-3 h-3 text-[#B8CCDA] shrink-0" />
              <p className="text-[11px] text-white/60 leading-tight">
                {language === 'tr'
                  ? 'Bu asistan genel bilgi sağlar; resmi etkinlik duyurularını takip edin.'
                  : 'This assistant provides general info; follow official announcements for event details.'}
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 bg-[#0a0e17] space-y-4">
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
                      <div className="w-7 h-7 rounded-full bg-[#5A7A8C]/10 border border-[#5A7A8C]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Sparkles className="w-3 h-3 text-[#B8CCDA]" />
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#5A7A8C] text-white rounded-tr-sm'
                          : 'bg-[#182030] border border-white/5 text-white/90 rounded-tl-sm'
                      }`}
                      dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                    />
                    {msg.role === 'user' && (
                      <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                        <User className="w-3 h-3 text-white/60" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Suggestion Chips */}
              {messages.length === 1 && !loading && (
                <div className="flex flex-wrap gap-2 pt-2 pl-9 pb-2">
                  {(SUGGESTIONS[language] ?? SUGGESTIONS.tr).map((sug, idx) => (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + idx * 0.05 }}
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(139, 111, 61, 0.2)', borderColor: '#5A7A8C' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => submitMessage(sug.text)}
                      className="text-[11px] font-medium px-3 py-2 rounded-full border border-[#5A7A8C]/40 bg-[#5A7A8C]/5 text-[#B8CCDA] hover:text-white transition-colors text-left shrink-0"
                    >
                      {sug.label}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Typing indicator */}
              <AnimatePresence>
                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-2.5 justify-start"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#5A7A8C]/10 border border-[#5A7A8C]/20 flex items-center justify-center shrink-0">
                      <Sparkles className="w-3 h-3 text-[#B8CCDA]" />
                    </div>
                    <div className="bg-[#182030] border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">
                      {[0, 1, 2].map(i => (
                        <motion.span key={i} className="w-1.5 h-1.5 rounded-full bg-white/40"
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
            <form onSubmit={sendMessage} className="flex items-end gap-2 px-3 py-3 bg-[#0a0e17] border-t border-white/10 shrink-0">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={placeholder}
                className="flex-1 bg-[#131924] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#5A7A8C]/50 resize-none"
              />
              <motion.button
                type="submit"
                disabled={!input.trim() || loading}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.93 }}
                className="w-10 h-10 rounded-xl bg-[#5A7A8C] text-white flex items-center justify-center shrink-0 disabled:opacity-40 transition-opacity"
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