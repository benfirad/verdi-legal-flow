import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Trash2, Sparkles, Bot, User, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const WELCOME = {
  tr: 'Merhaba! Ben **Verdi Yapay Zekası**. Hukuki sorularınızı yanıtlamak, doğru uzmana yönlendirmek ve süreçler hakkında bilgi vermek için buradayım. Size nasıl yardımcı olabilirim?',
  en: "Hello! I'm **Verdi AI**. I'm here to answer your legal questions, direct you to the right expert, and provide information about processes. How can I help you?",
};

function formatMessage(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
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

    const userMsg = { role: 'user', content: input.trim(), id: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Placeholder — backend will be wired by the user
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: language === 'tr'
            ? 'Mesajınız alındı. Yakında yanıt verilecektir.'
            : 'Your message has been received. A response will be provided shortly.',
          id: Date.now() + 1,
        },
      ]);
      setLoading(false);
    }, 1200);
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