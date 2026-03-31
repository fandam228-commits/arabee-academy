import React from 'react';
import { Star, Quote, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      name: "أحمد علي",
      grade: "أولى ثانوي",
      text: "بجد أفضل مستر إنجليزي في مصر، الشرح ممتع جداً والمنصة سهلة وبسيطة والجرامر بقى أسهل حاجة عندي.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed&backgroundColor=b6e3f4"
    },
    {
      name: "سارة محمود",
      grade: "تانية ثانوي",
      text: "الامتحانات بعد كل حصة بتخلي الواحد يثبت المعلومة، والـ PDF منظم جداً وفيه كل التركات اللي المستر بيقولها.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara&backgroundColor=ffdfbf"
    },
    {
      name: "يوسف ابراهيم",
      grade: "تالتة ثانوي",
      text: "المنصة خلتني أحب الإنجليزي بعد ما كنت بخاف منه، والنهاردة بقيت من أوائل الجمهورية بفضل الله ثم مستر حبيب.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Youssef&backgroundColor=c0aede"
    }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-xs font-black mb-6 uppercase tracking-widest">
            <Heart size={14} fill="currentColor" />
            <span>قصص نجاح أبطالنا</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">قالوا إيه عن مستر حبيب؟ ❤️</h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium">فخورين بكل طالب اجتهد معانا ووصل لحلمه. دي مجرد عينة من آلاف الرسايل اللي بتوصلنا كل يوم.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-50/50 p-10 rounded-[48px] relative border border-slate-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500"
            >
              <Quote className="absolute top-8 right-8 text-blue-100 w-16 h-16 -z-0 group-hover:text-blue-200 transition-colors" />
              
              <div className="relative z-10 mb-8">
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden mb-6 mx-auto group-hover:scale-110 transition-transform">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex justify-center text-yellow-400 gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
              </div>

              <p className="text-slate-600 text-lg font-medium leading-relaxed italic mb-8 flex-1">"{t.text}"</p>
              
              <div className="mt-auto">
                <h4 className="font-black text-slate-900 text-xl">{t.name}</h4>
                <span className="text-sm text-blue-600 font-black mt-1 block tracking-wider uppercase">{t.grade}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;