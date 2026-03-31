import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'أهلاً بك يا بطل! أنا مساعدك الذكي في منصة مستر حبيب. كيف أساعدك اليوم؟' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');

    // Simple Mock AI Logic
    setTimeout(() => {
      let response = "سؤال رائع! دعني أشرح لك ذلك ببساطة...";
      if (userMsg.includes('قواعد') || userMsg.includes('grammar')) {
        response = "القواعد في الإنجليزية ممتعة جداً! هل تريد شرحاً للـ Present Simple أم Past Simple؟";
      } else if (userMsg.includes('مستر حبيب')) {
        response = "مستر حبيب هو أفضل مدرس إنجليزي، يمكنك متابعة حصصه في قسم الكورسات.";
      } else if (userMsg.includes('سلام') || userMsg.includes('أهلا')) {
        response = "أهلاً بك يا بطل! كيف يمكنني مساعدتك في رحلتك لتعلم الإنجليزية اليوم؟";
      }
      
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] dir-rtl">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full overflow-hidden">
                  <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/31fe2809-6ce3-41f1-84b5-2be2c81e13c3/ai-assistant-avatar-a2616e9e-1774994265670.webp" alt="AI Avatar" className="w-8 h-8 object-cover" />
                </div>
                <div>
                  <h3 className="font-bold">اسأل المدرس الذكي</h3>
                  <p className="text-xs text-blue-100">متاح 24/7 لمساعدتك</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded">
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg, i) => (
                <div key={i} className={cn(
                  "flex",
                  msg.role === 'user' ? "justify-start" : "justify-end"
                )}>
                  <div className={cn(
                    "max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed",
                    msg.role === 'user' 
                      ? "bg-blue-600 text-white rounded-tr-none" 
                      : "bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow-sm"
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="اسأل عن أي قاعدة أو كلمة..."
                className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button 
                onClick={handleSend}
                className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-xl shadow-blue-200 flex items-center gap-2 group"
      >
        <div className="hidden sm:inline-flex items-center gap-2 font-bold px-2">
           <Sparkles size={16} />
           <span>اسأل المدرس</span>
        </div>
        <MessageCircle size={24} />
      </motion.button>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}