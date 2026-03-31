import React from 'react';
import { motion } from 'framer-motion';
import { Video, FileText, Trophy, Headphones, Smartphone, BarChart3, Star, Zap } from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: 'شرح بالمصري',
      desc: 'بنسهل المعلومة ونشرحها بطريقتك عشان تفهمها من أول مرة.',
      icon: Video,
      color: 'blue'
    },
    {
      title: 'ملازم لكل حصة',
      desc: 'ملزمة منظمة وشاملة لكل اللي اتشرح في الحصة تقدر تحملها PDF.',
      icon: FileText,
      color: 'indigo'
    },
    {
      title: 'امتحانات دورية',
      desc: 'اختبارات قصيرة بعد كل درس وامتحان شامل بعد كل وحدة عشان نضمن مستواك.',
      icon: Zap,
      color: 'orange'
    },
    {
      title: 'متابعة مع ولي الأمر',
      desc: 'نظام متابعة دقيق لدرجات الطالب وحضوره بيوصل لولي الأمر أول بأول.',
      icon: BarChart3,
      color: 'emerald'
    },
    {
      title: 'تطبيق للموبايل',
      desc: 'ذاكر في أي وقت ومن أي مكان من خلال تطبيقنا السلس والسريع.',
      icon: Smartphone,
      color: 'purple'
    },
    {
      title: 'دعم فني سريع',
      desc: 'فريق كامل موجود عشان يرد على استفساراتك ويحل مشاكلك في أسرع وقت.',
      icon: Headphones,
      color: 'pink'
    }
  ];

  return (
    <section className="py-32 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">مميزات هتخليك <br /> <span className="text-blue-600">تعشق الإنجليزي ⚡️</span></h2>
            <p className="text-slate-500 font-medium leading-relaxed">بنوفرلك بيئة تعليمية متكاملة بتساعدك تطور مهاراتك وتجيب الدرجة النهائية في الإنجليزي وأنت مرتاح.</p>
          </div>
          <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex items-center gap-5">
            <div className="bg-yellow-100 p-4 rounded-2xl text-yellow-600">
              <Star size={32} fill="currentColor" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">100%</div>
              <div className="text-xs font-bold text-slate-400">نسبة نجاح طلابنا</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500 group"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform`}>
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium text-sm">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;