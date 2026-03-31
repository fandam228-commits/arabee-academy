import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles, MinusCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'أهلاً بك! أنا مساعدك الذكي في منصة مستر حبيب. كيف يمكنني مساعدتك اليوم في قواعد اللغة الإنجليزية أو شرح الدروس؟' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Simulation of OpenAI API call
      // In production, you'd call a serverless function that securely uses your API key
      setTimeout(() => {
        let aiResponse = "";
        if (input.includes("grammar") || input.includes("قواعد")) {
          aiResponse = "بالنسبة للقواعد، اللغة الإنجليزية تعتمد بشكل كبير على الأزمنة (Tenses). هل تود شرح زمن المضارع البسيط أم الماضي المستمر؟";
        } else if (input.includes("indirect") || input.includes("مباشر")) {
          aiResponse = "شرح الكلام غير المباشر (Reported Speech) ببساطة هو نقل ما قاله شخص آخر مع تغيير الضمائر والأزمنة. مثلاً: He says 'I am happy' تصبح He says that he is happy.";
        } else {
          aiResponse = "شكراً لسؤالك! أنا هنا لمساعدتك في فهم أي درس أو قاعدة. يمكنك سؤالي عن 'المستقبل البسيط' أو 'حالات IF' مثلاً.";
        }
        
        setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
        setIsLoading(false);
      }, 1500);

    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[60]" dir="rtl">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-blue-700 transition-colors group relative"
          >
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-2 py-1 rounded-full animate-bounce">
              اسأل المدرس 🤖
            </div>
            <MessageSquare className="w-8 h-8 group-hover:scale-110 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            className={`w-[90vw] sm:w-[400px] shadow-3xl bg-white rounded-3xl overflow-hidden border border-gray-100 flex flex-col ${isMinimized ? 'h-auto' : 'h-[550px]'}`}
          >
            {/* Header */}
            <div className="bg-blue-600 p-6 flex items-center justify-between text-white">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                    <Bot className="w-6 h-6" />
                 </div>
                 <div>
                   <h3 className="font-bold text-lg">مساعد مستر حبيب</h3>
                   <div className="flex items-center gap-1.5">
                     <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                     <span className="text-xs text-blue-100">متاح الآن للإجابة</span>
                   </div>
                 </div>
               </div>
               <div className="flex gap-2">
                 <button onClick={() => setIsMinimized(!isMinimized)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <MinusCircle className="w-5 h-5" />
                 </button>
                 <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <X className="w-5 h-5" />
                 </button>
               </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-grow p-6 overflow-y-auto bg-gray-50 flex flex-col gap-4 scrollbar-hide">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-[85%] p-4 rounded-2xl flex flex-col gap-1 shadow-sm ${msg.role === 'assistant' ? 'bg-white text-gray-800 rounded-tr-none border border-gray-100' : 'bg-blue-600 text-white rounded-tl-none'}`}>
                        <div className="flex items-center gap-2 mb-1 opacity-70">
                           {msg.role === 'assistant' ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                           <span className="text-[10px] font-bold">{msg.role === 'assistant' ? 'AI Assistant' : 'You'}</span>
                        </div>
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start animate-pulse">
                      <div className="bg-white p-4 rounded-2xl border border-gray-100 flex gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Footer Input */}
                <CardFooter className="p-4 bg-white border-t border-gray-100">
                  <form onSubmit={handleSendMessage} className="w-full relative">
                    <Input 
                      className="w-full h-12 pr-4 pl-14 rounded-xl border-gray-200 focus:ring-blue-600 focus:border-blue-600" 
                      placeholder="اسألني أي سؤال عن الإنجليزية..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <button 
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                </CardFooter>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIChat;