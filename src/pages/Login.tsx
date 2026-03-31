import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(isRegister ? 'أهلاً بك في عائلة مستر حبيب!' : 'نورت المنصة يا بطل!');
    onLogin();
    setTimeout(() => navigate('/dashboard'), 500);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-[#F8FAFC] relative overflow-hidden">
      <motion.div 
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl bg-white rounded-[48px] shadow-xl border border-slate-100 overflow-hidden relative"
      >
        <div className="p-10 md:p-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest mb-6">
              <Sparkles size={14} />
              <span>مستقبلك يبدأ من هنا</span>
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-4">
              {isRegister ? 'انضم لطلابنا 🚀' : 'كمل رحلتك 💪'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {isRegister && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <label className="text-xs font-black text-slate-500 mr-4 uppercase tracking-widest">الاسم بالكامل</label>
                  <div className="relative">
                    <User className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                    <input
                      type="text"
                      required
                      className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-5 pr-14 pl-5 focus:bg-white focus:border-blue-100 outline-none transition-all font-bold text-slate-700"
                      placeholder="أدخل اسمك الثلاثي"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 mr-4 uppercase tracking-widest">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                <input
                  type="email"
                  required
                  className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-5 pr-14 pl-5 focus:bg-white focus:border-blue-100 outline-none transition-all font-bold text-slate-700"
                  placeholder="student@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 mr-4 uppercase tracking-widest">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                <input
                  type="password"
                  required
                  className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-5 pr-14 pl-5 focus:bg-white focus:border-blue-100 outline-none transition-all font-bold text-slate-700"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-6 rounded-[24px] font-black text-xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 mt-6 flex items-center justify-center gap-4"
            >
              {isRegister ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
              <ArrowRight size={24} />
            </button>
          </form>

          <div className="mt-12 pt-10 border-t border-slate-50 text-center">
            <p className="text-slate-400 font-bold text-sm">
              {isRegister ? 'عندك حساب معانا؟' : 'أول مرة هنا؟'}
              <button
                onClick={() => setIsRegister(!isRegister)}
                className="mr-3 font-black text-blue-600 hover:text-blue-700 hover:underline underline-offset-8 transition-all"
              >
                {isRegister ? 'سجل دخولك' : 'اشترك في المنصة'}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;