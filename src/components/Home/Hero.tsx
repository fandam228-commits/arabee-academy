import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, PlayCircle, ShieldCheck, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative pt-12 lg:pt-20 pb-20 overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full text-xs font-black mb-10 shadow-xl shadow-blue-100 uppercase tracking-widest">
              <Sparkles size={14} />
              <span>أفضل نظام تعليمي في مصر 🇪🇬</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.15] tracking-tight">
              اتعلم إنجليزي <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">بسهولة واحتراف 💪</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl leading-relaxed">
              شرح مبسط باللهجة المصرية، امتحانات تفاعلية فورية، وملازم PDF لكل حصة. نوصلك للدرجة النهائية وانت مستمتع.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 mb-16">
              <Link to="/courses" className="bg-blue-600 text-white px-10 py-5 rounded-[24px] text-lg font-black hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 text-center flex items-center justify-center gap-3 group">
                ابدأ التعلم الآن
                <ArrowRight className="group-hover:translate-x-[-5px] transition-transform" />
              </Link>
              <button className="flex items-center justify-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-[24px] text-lg font-black border-2 border-slate-100 hover:border-blue-100 hover:bg-slate-50 transition-all shadow-lg shadow-slate-100">
                <PlayCircle size={24} className="text-blue-600" />
                فيديو الشرح
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-8 p-8 bg-white/50 backdrop-blur-sm rounded-[32px] border border-white/50 shadow-sm">
              {[
                { count: '+50k', label: 'طالب مشترك' },
                { count: '4.9/5', label: 'تقييم المنصة' },
                { count: '+1200', label: 'فيديو شرح' }
              ].map((stat, i) => (
                <div key={i} className="text-center md:text-right">
                  <div className="text-2xl font-black text-slate-900 mb-1">{stat.count}</div>
                  <div className="text-xs font-bold text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600 rounded-[48px] rotate-3 -z-10 opacity-10" />
              <div className="relative rounded-[48px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(59,130,246,0.3)] border-[12px] border-white">
                <img 
                  src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/31fe2809-6ce3-41f1-84b5-2be2c81e13c3/hero-background-52c520f7-1774993937575.webp" 
                  alt="Mr Habib Rahman" 
                  className="w-full h-auto aspect-[4/5] object-cover"
                />
              </div>

              {/* Floating Cards */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-10 -left-10 bg-white p-5 rounded-3xl shadow-2xl border border-slate-50 flex items-center gap-4"
              >
                <div className="bg-green-100 p-3 rounded-2xl text-green-600">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <div className="font-black text-slate-900 leading-tight">محتوى محمي</div>
                  <div className="text-[10px] font-bold text-slate-400 mt-0.5">حقوقك محفوظة بالكامل</div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute -bottom-10 -right-6 bg-white p-5 rounded-3xl shadow-2xl border border-slate-50 flex items-center gap-4"
              >
                <div className="bg-yellow-100 p-3 rounded-2xl text-yellow-600">
                  <Star size={24} fill="currentColor" />
                </div>
                <div>
                  <div className="font-black text-slate-900 leading-tight">أوائل الجمهورية</div>
                  <div className="text-[10px] font-bold text-slate-400 mt-0.5">من طلاب مستر حبيب</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;