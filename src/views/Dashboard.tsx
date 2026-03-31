import React from 'react';
import { COURSES } from '../data/mockData';
import { BookOpen, CheckCircle, Clock, Trophy, ChevronLeft, LayoutDashboard, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Dashboard = ({ user }: { user: any }) => {
  if (!user) return <div className="pt-20 text-center">Please login first</div>;

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 mb-8 dir-rtl text-right">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl overflow-hidden border-4 border-blue-50">
              <img src={user.avatar} alt="Avatar" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 mb-1">أهلاً بك، {user.name} 👋</h1>
              <p className="text-gray-500">أنت الآن في رحلة التميز، استمر في التعلم!</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-orange-50 p-4 rounded-2xl text-orange-600 flex flex-col items-center min-w-[100px]">
              <Trophy size={20} />
              <span className="font-bold text-lg">1200</span>
              <span className="text-xs">نقطة</span>
            </div>
            <div className="bg-green-50 p-4 rounded-2xl text-green-600 flex flex-col items-center min-w-[100px]">
              <CheckCircle size={20} />
              <span className="font-bold text-lg">5</span>
              <span className="text-xs">دروس مكتملة</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 dir-rtl text-right">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Section */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BookOpen size={20} className="text-blue-600" />
                تابع تعلمك
              </h2>
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-bold">منهج الصف الأول الإعدادي</h3>
                    <p className="text-sm text-gray-500">الوحدة الثانية: الدرس الثالث</p>
                  </div>
                  <span className="text-blue-600 font-bold">65%</span>
                </div>
                <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden mb-6">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '65%' }}
                    className="bg-blue-600 h-full rounded-full"
                  />
                </div>
                <Link
                  to="/course/1-prep"
                  className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold inline-flex items-center gap-2 hover:bg-blue-600 transition-colors"
                >
                  استمر في المشاهدة
                  <ChevronLeft size={18} />
                </Link>
              </div>
            </section>

            {/* Recommended/Latest Section */}
            <section>
              <h2 className="text-xl font-bold mb-4">حصص جديدة مضافة</h2>
              <div className="grid gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 bg-gray-100 rounded-lg overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold">المراجعة النهائية لشهر أكتوبر</h4>
                        <p className="text-xs text-gray-500">تم الإضافة منذ 3 ساعات • 45 دقيقة</p>
                      </div>
                    </div>
                    <ChevronLeft size={20} className="text-gray-300 group-hover:text-blue-600" />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-4">إحصائيات الأسبوع</h2>
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                {[
                  { label: 'وقت المذاكرة', val: '12 ساعة', icon: <Clock size={18} />, color: 'text-purple-600', bg: 'bg-purple-50' },
                  { label: 'الامتحانات', val: '8/10', icon: <BookOpen size={18} />, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: 'المرتبة', val: 'الخامس', icon: <Trophy size={18} />, color: 'text-yellow-600', bg: 'bg-yellow-50' }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn("p-2 rounded-lg", stat.bg, stat.color)}>
                        {stat.icon}
                      </div>
                      <span className="text-gray-600">{stat.label}</span>
                    </div>
                    <span className="font-bold">{stat.val}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-3xl text-white">
                <h3 className="text-xl font-bold mb-2">انضم لمجموعة الدحيحة!</h3>
                <p className="text-blue-100 text-sm mb-6">قناة التليجرام الخاصة بالطلاب للمناقشات والأسئلة الهامة.</p>
                <button className="w-full bg-white text-blue-700 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                  انضم الآن
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}