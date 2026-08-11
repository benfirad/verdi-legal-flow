import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, ChevronDown, Send, Sparkles, Trash2, User } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { BRAND } from '@/lib/brand';

const CONTENT = {
  tr: {
    welcome: 'Merhaba, ben **VERDİ Dijital Asistanı**. Çalışma alanları ve iletişim akışı hakkında genel bilgi verebilirim. Bu deneyim bir marka konseptidir; yanıtlar hukuki görüş değildir.',
    placeholder: 'Sorunuzu yazın…',
    suggestions: ['Çalışma alanlarınız neler?', 'Nasıl çalışıyorsunuz?', 'İletişim bilgileri'],
    generic: 'VERDİ HUKUK; ticaret ve şirketler, birleşme ve devralmalar, uyuşmazlık çözümü, iş, gayrimenkul, rekabet, finans, veri koruma ve fikri mülkiyet alanlarında kurgulanmış bir marka konseptidir. [Çalışma Alanları](/calisma-alanlari) sayfasında ayrıntıları görebilirsiniz.',
    process: 'Çalışma akışı ilk değerlendirme, kapsam ve strateji, uygulama, raporlama ve takip adımlarından oluşur. Ayrıntılar için [Çalışma Sürecimiz](/surec) sayfasını ziyaret edebilirsiniz.',
    contact: `Bu konseptte kullanılan iletişim bilgileri temsilidir.\n\n**E-posta:** ${BRAND.email}\n**Telefon:** ${BRAND.phone}\n\n[İletişim sayfasına gidin](/iletisim).`,
  },
  en: {
    welcome: 'Hello, I am the **VERDİ Digital Assistant**. I can provide general information about practice areas and the contact journey. This is a brand concept and responses are not legal advice.',
    placeholder: 'Type your question…',
    suggestions: ['What are your practice areas?', 'How do you work?', 'Contact details'],
    generic: 'VERDİ LAW is a brand concept covering corporate and commercial, M&A, disputes, employment, real estate, competition, finance, data protection and intellectual property. Visit [Practice Areas](/calisma-alanlari) for details.',
    process: 'The workflow covers initial assessment, scope and strategy, execution, reporting and follow-up. Visit [How We Work](/surec) for more.',
    contact: `Contact details in this concept are illustrative.\n\n**Email:** ${BRAND.email}\n**Phone:** ${BRAND.phone}\n\n[Go to contact page](/iletisim).`,
  },
};

function responseFor(input, language) {
  const content = CONTENT[language] || CONTENT.tr;
  const query = input.toLocaleLowerCase(language === 'tr' ? 'tr' : 'en');
  if (/iletişim|iletisim|telefon|e-posta|email|contact|phone/.test(query)) return content.contact;
  if (/süreç|surec|çalış|calis|yaklaş|yaklas|process|work/.test(query)) return content.process;
  return content.generic;
}

function format(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="underline font-medium">$1</a>')
    .replace(/\n/g, '<br/>');
}

export default function VerdiAIChat() {
  const { language } = useLanguage();
  const content = CONTENT[language] || CONTENT.tr;
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'assistant', content: content.welcome, id: 0 }]);
  const bottomRef = useRef(null);

  useEffect(() => {
    setMessages([{ role: 'assistant', content: content.welcome, id: Date.now() }]);
  }, [content.welcome]);

  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);

  const send = (text) => {
    const value = text.trim();
    if (!value) return;
    setMessages((current) => [...current, { role: 'user', content: value, id: Date.now() }, { role: 'assistant', content: responseFor(value, language), id: Date.now() + 1 }]);
    setInput('');
  };

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={() => setOpen(true)} className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center bg-[#1A2530] text-sm font-semibold text-white shadow-[0_10px_40px_rgba(26,37,48,.4)] sm:bottom-6 sm:right-6 sm:h-auto sm:w-auto sm:gap-3 sm:px-5 sm:py-3.5" aria-label="VERDİ dijital asistanını aç">
            <Sparkles className="h-4 w-4 text-[#B8CCDA]" /><span className="hidden sm:inline">VERDİ Asistan</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.aside initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.96 }} className="fixed inset-x-3 bottom-3 top-3 z-50 flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0e17] shadow-2xl md:inset-auto md:bottom-6 md:right-6 md:h-[560px] md:w-[400px]">
            <header className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5 text-white">
              <div className="flex h-9 w-9 items-center justify-center border border-white/10 bg-white/5"><Sparkles className="h-4 w-4 text-[#B8CCDA]" /></div>
              <div className="flex-1"><p className="text-sm font-semibold">VERDİ Dijital Asistan</p><p className="text-[11px] text-white/50">{BRAND.conceptLabel[language]}</p></div>
              <button onClick={() => setMessages([{ role: 'assistant', content: content.welcome, id: Date.now() }])} className="p-2 text-white/50 hover:text-white" aria-label="Sohbeti temizle"><Trash2 className="h-4 w-4" /></button>
              <button onClick={() => setOpen(false)} className="p-2 text-white/50 hover:text-white" aria-label="Asistanı kapat"><ChevronDown className="h-4 w-4" /></button>
            </header>
            <div className="flex items-center gap-2 border-b border-white/5 bg-white/[.03] px-4 py-2 text-[11px] leading-4 text-white/55"><Bot className="h-3 w-3 shrink-0 text-[#B8CCDA]" />{language === 'tr' ? 'Genel bilgi sağlar; hukuki danışmanlık değildir.' : 'General information only; not legal advice.'}</div>
            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-2.5 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.role === 'assistant' && <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#5A7A8C]/20 bg-[#5A7A8C]/10"><Sparkles className="h-3 w-3 text-[#B8CCDA]" /></div>}
                  <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${message.role === 'user' ? 'rounded-tr-sm bg-[#5A7A8C] text-white' : 'rounded-tl-sm border border-white/5 bg-[#182030] text-white/90'}`} dangerouslySetInnerHTML={{ __html: format(message.content) }} />
                  {message.role === 'user' && <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5"><User className="h-3 w-3 text-white/60" /></div>}
                </div>
              ))}
              {messages.length === 1 && <div className="flex flex-wrap gap-2 pl-9">{content.suggestions.map((item) => <button key={item} onClick={() => send(item)} className="rounded-full border border-[#5A7A8C]/40 px-3 py-2 text-[11px] text-[#B8CCDA]">{item}</button>)}</div>}
              <div ref={bottomRef} />
            </div>
            <form onSubmit={(event) => { event.preventDefault(); send(input); }} className="flex gap-2 border-t border-white/10 p-3">
              <input value={input} onChange={(event) => setInput(event.target.value)} placeholder={content.placeholder} className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#131924] px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#5A7A8C]/60" />
              <button type="submit" disabled={!input.trim()} className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5A7A8C] text-white disabled:opacity-40"><Send className="h-4 w-4" /></button>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
