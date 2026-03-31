import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, GraduationCap, Video, FileText, Zap, LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const courses = [
  { id: 1, title: 'أولى إعدادي', level: '1st Prep', color: 'blue', lessons: 12, Icon: GraduationCap },
  { id: 2, title: 'تانية إعدادي', level: '2nd Prep', color: 'indigo', lessons: 15, Icon: BookOpen },
  { id: 3, title: 'تالتة إعدادي', level: '3rd Prep', color: 'purple', lessons: 20, Icon: FileText },
  { id: 4, title: 'أولى ثانوي', level: '1st Secondary', color: 'emerald', lessons: 24, Icon: Video },
  { id: 5, title: 'تانية ثانوي', level: '2nd Secondary', color: 'orange', lessons: 24, Icon: Zap },
  { id: 6, title: 'تالتة ثانوي', level: '3rd Secondary', color: 'red', lessons: 32, Icon: GraduationCap },
];

const CourseSection = () => {
  return (
    <section className="py-32 bg-white" id="courses">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-6"
          >
            اختر مرحلتك الدراسية 🎓
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 max-w-2xl mx-auto font-medium"
          >
            كل مرحلة ليها كورس مخصص بيشمل كل حاجة من أول التأسيس لحد ليلة الامتحان، مش محتاج أي دروس تانية!
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course, idx) => {
            const Icon = course.Icon;
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white rounded-[40px] p-8 border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_-20px_rgba(59,130,246,0.15)] transition-all duration-500"
              >
                <div className={`w-20 h-20 rounded-[28px] bg-blue-50 flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-sm`}>
                  <Icon size={36} />
                </div>
                
                <div className="mb-8">
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-2 block`}>{course.level}</span>
                  <h3 className="text-2xl font-black text-slate-900 mb-4">{course.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    شرح كامل لكل الوحدات (Units) مع تطبيق عملي وحل تدريبات الكتب الخارجية وبنك الأسئلة.
                  </p>
                </div>
                
                <div className="flex items-center gap-6 text-slate-400 text-xs font-bold mb-10 border-t border-slate-50 pt-8">
                  <div className="flex items-center gap-2">
                    <Video size={16} className="text-blue-500" />
                    <span>{course.lessons} درس</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-orange-500" />
                    <span>ملازم PDF</span>
                  </div>
                </div>
                
                <Link
                  to="/courses"
                  className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white py-5 rounded-[24px] font-black group-hover:bg-blue-600 transition-all shadow-xl shadow-slate-100 group-hover:shadow-blue-200"
                >
                  ادخل الكورس
                  <ArrowRight size={20} className="group-hover:translate-x-[-5px] transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CourseSection;